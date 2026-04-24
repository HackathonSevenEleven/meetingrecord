import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, Pause, Play, Square, Loader2, ArrowLeft, AlertCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { useFreeTrial, FREE_TRIAL_LIMIT, FREE_TRIAL_MAX_DURATION } from "@/hooks/useFreeTrial";
import { formatDuration } from "@/lib/format";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

const RecordMeetingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);

  const trial = useFreeTrial();
  const recorder = useAudioRecorder({ maxDurationSeconds: FREE_TRIAL_MAX_DURATION });

  const handleSave = async () => {
    if (!user || !recorder.audioBlob) return;
    if (!title.trim()) {
      toast({
        title: "Add a title",
        description: "Give your meeting a short name before saving.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const mime = recorder.audioBlob.type || "audio/webm";
      const ext = mime.includes("mp4")
        ? "mp4"
        : mime.includes("ogg")
          ? "ogg"
          : "webm";
      const filename = `${user.id}/${crypto.randomUUID()}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from("meeting-recordings")
        .upload(filename, recorder.audioBlob, {
          contentType: mime,
          upsert: false,
        });
      if (upErr) throw upErr;

      const { data: meeting, error: insErr } = await supabase
        .from("meetings")
        .insert({
          user_id: user.id,
          title: title.trim(),
          duration_seconds: Math.min(recorder.durationSeconds, FREE_TRIAL_MAX_DURATION),
          audio_path: filename,
          status: "pending",
        })
        .select()
        .single();
      if (insErr) throw insErr;

      const { error: fnErr } = await supabase.functions.invoke(
        "transcribe-meeting",
        { body: { meeting_id: meeting.id } }
      );
      if (fnErr) {
        console.error("transcribe-meeting invoke failed", fnErr);
        toast({
          title: "Transcription couldn't start",
          description:
            "Your recording is saved. We'll surface details on the meeting page.",
          variant: "destructive",
        });
      }

      // Refresh trial usage and meetings list
      queryClient.invalidateQueries({ queryKey: ["free-trial", user.id] });
      queryClient.invalidateQueries({ queryKey: ["meetings", user.id] });

      toast({
        title: "Meeting saved",
        description: "Transcription has started.",
      });
      navigate(`/meetings/${meeting.id}`, { replace: true });
    } catch (e) {
      console.error("Save meeting failed", e);
      const raw = e instanceof Error ? e.message : "Unknown error";
      const friendly = raw.includes("Free tier")
        ? raw.replace(/^.*Free tier:\s*/i, "Free tier: ")
        : "Something went wrong saving your meeting. Please try again.";
      toast({
        title: "Could not save meeting",
        description: friendly,
        variant: "destructive",
      });
      // Refresh trial counter in case the trigger blocked us
      queryClient.invalidateQueries({ queryKey: ["free-trial", user.id] });
    } finally {
      setSaving(false);
    }
  };

  const isRecording = recorder.state === "recording";
  const isPaused = recorder.state === "paused";
  const hasRecording = recorder.state === "stopped" && recorder.audioBlob;

  const remainingSeconds = Math.max(0, FREE_TRIAL_MAX_DURATION - recorder.durationSeconds);
  const lowTime = isRecording && remainingSeconds <= 5;

  const limitReached = trial.limitReached;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/dashboard")}
        className="gap-1.5 -ml-3 mb-6 text-muted-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-1">
            New meeting
          </h1>
          <p className="text-sm text-muted-foreground">
            Record from your microphone. We'll transcribe and generate notes when you're done.
          </p>
        </div>
        {!trial.isLoading && (
          <span className="shrink-0 text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
            Free trial: {trial.used}/{FREE_TRIAL_LIMIT} used
          </span>
        )}
      </div>

      {limitReached && (
        <Card className="p-6 mb-6 border-destructive/30 bg-destructive/5">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Free limit reached</p>
              <p className="text-sm text-muted-foreground mt-1">
                You've used all {FREE_TRIAL_LIMIT} free recordings. Upgrade to continue.
              </p>
              <Button className="mt-4" size="sm">Upgrade plan</Button>
            </div>
          </div>
        </Card>
      )}

      <Card className={cn("p-8 mb-6", limitReached && "opacity-60 pointer-events-none")}>
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div
              className={`absolute inset-0 rounded-full transition-all ${
                isRecording ? "animate-ping bg-destructive/20" : ""
              }`}
              style={{
                transform: `scale(${1 + recorder.audioLevel * 0.4})`,
              }}
            />
            <div
              className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-colors ${
                isRecording
                  ? "bg-destructive text-destructive-foreground"
                  : isPaused
                    ? "bg-amber-500 text-white"
                    : hasRecording
                      ? "bg-emerald-500 text-white"
                      : "bg-foreground text-background"
              }`}
            >
              <Mic className="w-10 h-10" />
            </div>
          </div>

          <div className={cn(
            "font-mono text-3xl tabular-nums mb-1 transition-colors",
            lowTime ? "text-destructive" : "text-foreground"
          )}>
            {formatDuration(recorder.durationSeconds)}
          </div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
            {recorder.state === "idle" && "Ready"}
            {isRecording && "Recording"}
            {isPaused && "Paused"}
            {hasRecording && "Recording complete"}
          </div>

          {(isRecording || isPaused) && (
            <div className={cn(
              "text-sm mb-4 font-medium",
              lowTime ? "text-destructive" : "text-muted-foreground"
            )}>
              {remainingSeconds}s remaining (max {FREE_TRIAL_MAX_DURATION}s)
              {lowTime && " — wrapping up soon"}
            </div>
          )}

          {recorder.state === "idle" && !limitReached && (
            <div className="text-sm text-muted-foreground mb-4">
              Free trial: up to {FREE_TRIAL_MAX_DURATION}s per recording · {trial.remaining} {trial.remaining === 1 ? "attempt" : "attempts"} left
            </div>
          )}

          {recorder.error && (
            <div className="flex items-start gap-2 text-sm text-destructive bg-destructive/5 border border-destructive/20 rounded-md p-3 mb-4 w-full">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="text-left">{recorder.error}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            {recorder.state === "idle" && (
              <Button
                onClick={recorder.start}
                size="lg"
                className="gap-2"
                disabled={limitReached}
              >
                <Mic className="w-4 h-4" />
                {limitReached ? "Free limit reached. Upgrade to continue." : "Start recording"}
              </Button>
            )}
            {isRecording && (
              <>
                <Button onClick={recorder.pause} size="lg" variant="outline" className="gap-2">
                  <Pause className="w-4 h-4" />
                  Pause
                </Button>
                <Button onClick={recorder.stop} size="lg" variant="destructive" className="gap-2">
                  <Square className="w-4 h-4" />
                  Stop
                </Button>
              </>
            )}
            {isPaused && (
              <>
                <Button onClick={recorder.resume} size="lg" className="gap-2">
                  <Play className="w-4 h-4" />
                  Resume
                </Button>
                <Button onClick={recorder.stop} size="lg" variant="destructive" className="gap-2">
                  <Square className="w-4 h-4" />
                  Stop
                </Button>
              </>
            )}
            {hasRecording && (
              <Button onClick={recorder.reset} size="lg" variant="outline">
                Record again
              </Button>
            )}
          </div>
        </div>

        {hasRecording && recorder.audioUrl && (
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
              Preview
            </p>
            <audio
              src={recorder.audioUrl}
              controls
              className="w-full"
            />
          </div>
        )}
      </Card>

      {hasRecording && !limitReached && (
        <Card className="p-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Meeting title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Weekly product sync"
            disabled={saving}
            className="mb-4"
            autoFocus
          />
          <Button
            onClick={handleSave}
            disabled={saving || !title.trim()}
            className="w-full gap-2"
            size="lg"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading…
              </>
            ) : (
              "Save & transcribe"
            )}
          </Button>
        </Card>
      )}
    </div>
  );
};

export default RecordMeetingPage;
