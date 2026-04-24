import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDuration } from "@/lib/format";
import type { TranscriptSegment } from "@/hooks/useMeeting";

interface TranscriptViewerProps {
  segments: TranscriptSegment[] | null;
  fallbackText: string | null;
}

const TranscriptViewer = ({ segments, fallbackText }: TranscriptViewerProps) => {
  if (!segments || segments.length === 0) {
    if (!fallbackText) {
      return (
        <p className="text-sm text-muted-foreground italic">
          No transcript available.
        </p>
      );
    }
    return (
      <ScrollArea className="h-[420px] pr-4">
        <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
          {fallbackText}
        </p>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="h-[420px] pr-4">
      <div className="space-y-3">
        {segments.map((seg, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-xs font-mono text-muted-foreground tabular-nums shrink-0 w-12 pt-0.5">
              {formatDuration(seg.start)}
            </span>
            <p className="text-sm text-foreground leading-relaxed flex-1">
              {seg.text.trim()}
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default TranscriptViewer;
