import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}

const BorderBeam = ({
  className,
  size = 200,
  duration = 8,
  delay = 0,
  colorFrom = "hsl(270, 100%, 65%)",
  colorTo = "hsl(335, 100%, 60%)",
}: BorderBeamProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:1px_solid_transparent]",
        className
      )}
    >
      <div
        className="absolute aspect-square animate-border-beam"
        style={{
          width: size,
          offsetPath: "rect(0 auto auto 0 round var(--radius, 14px))",
          background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />
    </div>
  );
};

export default BorderBeam;
