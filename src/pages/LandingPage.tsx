import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Mic, FileText, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const LandingPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const ctaTo = user ? "/dashboard" : "/login";
  const [heroKey, setHeroKey] = useState(0);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setHeroKey((k) => k + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-[1.03] hover:opacity-90 active:scale-95"
          >
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
              <Mic className="w-4 h-4" />
            </div>
            <span className="font-semibold tracking-tight text-foreground">
              MeetingRecord
            </span>
          </Link>
          <Button asChild variant="ghost" size="lg" className="text-base">
            <Link to={ctaTo}>{user ? "Dashboard" : "Sign in"}</Link>
          </Button>
        </div>
      </header>

      <section className="flex-1 flex items-center">
        <div
          key={heroKey}
          className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center animate-fade-in"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs text-muted-foreground mb-6">
            <Sparkles className="w-3 h-3" />
            AI-powered meeting notes
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground mb-5 leading-[1.15]">
            Record meetings.<br />
            Get structured notes.
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Hit record, speak naturally, and get a clean summary, key points,
            action items, and decisions — automatically.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link to={ctaTo}>
              <Mic className="w-4 h-4" />
              {user ? "Go to dashboard" : "Get started"}
            </Link>
          </Button>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 grid sm:grid-cols-3 gap-8">
          <Feature icon={Mic} title="One-click recording" description="Capture audio straight from your browser — no installs, no setup." />
          <Feature icon={FileText} title="Accurate transcripts" description="Powered by ElevenLabs Scribe with speaker diarization and 99+ languages." />
          <Feature icon={Sparkles} title="Structured AI notes" description="Summary, key points, action items, and decisions, every time." />
        </div>
      </section>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} MeetingRecord
      </footer>
    </div>
  );
};

const Feature = ({ icon: Icon, title, description }: { icon: typeof Mic; title: string; description: string }) => (
  <div>
    <div className="flex items-center gap-2.5 mb-1.5">
      <div className="w-8 h-8 rounded-[10px] bg-muted flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-foreground" />
      </div>
      <h3 className="font-medium text-foreground">{title}</h3>
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
