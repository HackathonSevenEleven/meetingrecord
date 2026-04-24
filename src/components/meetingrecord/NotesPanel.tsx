import { CheckCircle2, ListChecks, Lightbulb, Gavel } from "lucide-react";
import type { MeetingNotes } from "@/hooks/useMeeting";

interface NotesPanelProps {
  notes: MeetingNotes | null;
}

const Section = ({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof CheckCircle2;
  title: string;
  items: string[];
}) => {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <div className="flex items-center gap-2 mb-2.5">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <h4 className="text-sm font-medium text-foreground">{title}</h4>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-sm text-foreground/90 leading-relaxed pl-6 relative"
          >
            <span className="absolute left-2 top-2 w-1 h-1 rounded-full bg-muted-foreground" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const NotesPanel = ({ notes }: NotesPanelProps) => {
  if (!notes || (!notes.summary && (notes.key_points?.length ?? 0) === 0)) {
    return (
      <p className="text-sm text-muted-foreground italic">
        Notes will appear here once generated.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {notes.summary && (
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Summary</h4>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {notes.summary}
          </p>
        </div>
      )}
      <Section
        icon={Lightbulb}
        title="Key points"
        items={notes.key_points ?? []}
      />
      <Section
        icon={ListChecks}
        title="Action items"
        items={notes.action_items ?? []}
      />
      <Section
        icon={Gavel}
        title="Decisions"
        items={notes.decisions ?? []}
      />
    </div>
  );
};

export default NotesPanel;
