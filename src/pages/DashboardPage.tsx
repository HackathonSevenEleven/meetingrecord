import { useState } from "react";
import { Link } from "react-router-dom";
import { Mic, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMeetings } from "@/hooks/useMeetings";
import MeetingCard from "@/components/meetingrecord/MeetingCard";
import { useDebounce } from "@/hooks/useDebounce";

const DashboardPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 300);
  const { data: meetings, isLoading, isError, error } = useMeetings(debouncedSearch);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Your meetings
          </h1>
          <p className="text-muted-foreground mt-1.5 text-sm">
            Record, transcribe, and get AI notes — all in one place.
          </p>
        </div>
        <Button asChild size="lg" className="gap-2 shrink-0">
          <Link to="/meetings/new">
            <Mic className="w-4 h-4" />
            Start meeting
          </Link>
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by title…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="pl-9"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      ) : isError ? (
        <div className="text-sm text-destructive py-8 text-center">
          Failed to load meetings: {(error as Error)?.message}
        </div>
      ) : !meetings || meetings.length === 0 ? (
        <EmptyState hasSearch={!!debouncedSearch} />
      ) : (
        <div className="space-y-2">
          {meetings.map((m) => (
            <MeetingCard key={m.id} meeting={m} />
          ))}
        </div>
      )}
    </div>
  );
};

const EmptyState = ({ hasSearch }: { hasSearch: boolean }) => (
  <div className="text-center py-16 px-4 border border-dashed border-border rounded-xl">
    <div className="w-12 h-12 rounded-full bg-secondary mx-auto flex items-center justify-center mb-4">
      <Mic className="w-5 h-5 text-muted-foreground" />
    </div>
    <h3 className="font-medium text-foreground mb-1">
      {hasSearch ? "No meetings match your search" : "No meetings yet"}
    </h3>
    <p className="text-sm text-muted-foreground mb-5 max-w-sm mx-auto">
      {hasSearch
        ? "Try a different keyword."
        : "Record your first meeting to see structured notes appear here."}
    </p>
    {!hasSearch && (
      <Button asChild size="sm" className="gap-2">
        <Link to="/meetings/new">
          <Mic className="w-4 h-4" />
          Start your first meeting
        </Link>
      </Button>
    )}
  </div>
);

export default DashboardPage;
