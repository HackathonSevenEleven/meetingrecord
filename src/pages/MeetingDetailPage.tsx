import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, AlertCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMeeting } from "@/hooks/useMeeting";
import TranscriptViewer from "@/components/meetingrecord/TranscriptViewer";
import NotesPanel from "@/components/meetingrecord/NotesPanel";
import { formatDuration, formatRelativeDate } from "@/lib/format";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const MeetingDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [deleting, setDeleting] = useState(false);
  const { data, isLoading, isError, error } = useMeeting(id);

  const handleDelete = async () => {
    if (!data?.meeting) return;
    setDeleting(true);
    try {
      if (data.meeting.audio_path) {
        await supabase.storage
          .from("meeting-recordings")
          .remove([data.meeting.audio_path]);
      }
      const { error: delErr } = await supabase
        .from("meetings")
        .delete()
        .eq("id", data.meeting.id);
      if (delErr) throw delErr;
      queryClient.invalidateQueries({ queryKey: ["meetings"] });
      toast({ title: "Meeting deleted" });
      navigate("/dashboard", { replace: true });
    } catch (e) {
      console.error("Delete meeting failed", e);
      toast({
        title: "Could not delete meeting",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !data) {
    if (isError) console.error("Meeting load failed", error);
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-3" />
        <p className="text-sm text-muted-foreground mb-4">
          We couldn't load this meeting.
        </p>
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          Back to dashboard
        </Button>
      </div>
    );
  }

  const { meeting, notes, audioUrl } = data;
  const isProcessing =
    meeting.status === "pending" ||
    meeting.status === "transcribing" ||
    meeting.status === "generating_notes";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/dashboard")}
        className="gap-1.5 -ml-3 mb-6 text-muted-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {meeting.title}
          </h1>
          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
            <span>{formatRelativeDate(meeting.recorded_at)}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span>{formatDuration(meeting.duration_seconds)}</span>
            {meeting.status === "completed" && notes?.language && (
              <>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <span className="uppercase">{notes.language}</span>
              </>
            )}
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this meeting?</AlertDialogTitle>
              <AlertDialogDescription>
                The audio, transcript, and notes will be permanently removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={deleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleting ? "Deleting…" : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Audio player */}
      <Card className="p-4 mb-4">
        {audioUrl ? (
          <audio src={audioUrl} controls className="w-full" />
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            Audio unavailable
          </p>
        )}
      </Card>

      {/* Status banner */}
      {isProcessing && (
        <Card className="p-4 mb-4 bg-secondary/50 border-dashed">
          <div className="flex items-center gap-3">
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {meeting.status === "transcribing"
                ? "Transcribing your audio with Whisper…"
                : meeting.status === "generating_notes"
                  ? "Generating structured notes…"
                  : "Queued for processing…"}
            </p>
          </div>
        </Card>
      )}

      {meeting.status === "failed" && (
        <Card className="p-4 mb-4 bg-destructive/5 border-destructive/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-destructive">Processing failed</p>
              <p className="text-muted-foreground mt-1">
                We couldn't process this recording. Please try uploading it again.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Tabs: Notes / Transcript */}
      <Tabs defaultValue="notes" className="w-full">
        <TabsList className="grid w-full max-w-xs grid-cols-2">
          <TabsTrigger value="notes">AI Notes</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
        </TabsList>

        <TabsContent value="notes" className="mt-4">
          <Card className="p-6">
            <NotesPanel notes={notes} />
          </Card>
        </TabsContent>

        <TabsContent value="transcript" className="mt-4">
          <Card className="p-6">
            <TranscriptViewer
              segments={notes?.segments ?? null}
              fallbackText={notes?.transcript ?? null}
            />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MeetingDetailPage;
