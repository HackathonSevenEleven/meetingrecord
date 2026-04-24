import { Link } from "react-router-dom";
import { CheckCircle2, Loader2, AlertCircle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDuration, formatRelativeDate } from "@/lib/format";
import type { Meeting } from "@/hooks/useMeetings";

interface MeetingCardProps {
  meeting: Meeting;
}

const statusConfig: Record<
  Meeting["status"],
  { label: string; className: string; icon: typeof CheckCircle2 }
> = {
  pending: {
    label: "Pending",
    className: "bg-muted text-muted-foreground",
    icon: Clock,
  },
  transcribing: {
    label: "Transcribing…",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    icon: Loader2,
  },
  generating_notes: {
    label: "Generating notes…",
    className: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
    icon: Loader2,
  },
  completed: {
    label: "Ready",
    className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    icon: CheckCircle2,
  },
  failed: {
    label: "Failed",
    className: "bg-destructive/10 text-destructive",
    icon: AlertCircle,
  },
};

const MeetingCard = ({ meeting }: MeetingCardProps) => {
  const cfg = statusConfig[meeting.status];
  const Icon = cfg.icon;
  const isProcessing =
    meeting.status === "transcribing" ||
    meeting.status === "generating_notes" ||
    meeting.status === "pending";

  return (
    <Link to={`/meetings/${meeting.id}`} className="block group">
      <Card className="p-4 hover:border-foreground/20 transition-colors">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
              {meeting.title}
            </h3>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
              <span>{formatRelativeDate(meeting.recorded_at)}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span>{formatDuration(meeting.duration_seconds)}</span>
            </div>
          </div>
          <Badge
            variant="secondary"
            className={`shrink-0 gap-1.5 font-normal ${cfg.className}`}
          >
            <Icon
              className={`w-3 h-3 ${isProcessing && meeting.status !== "pending" ? "animate-spin" : ""}`}
            />
            {cfg.label}
          </Badge>
        </div>
      </Card>
    </Link>
  );
};

export default MeetingCard;
