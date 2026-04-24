"use client";

import useBreakpoint from "@/hooks/use-breakpoint";
import { cn } from "@/lib/utils";

const BackgroundImage = ({
  src,
  className,
}: {
  src: string;
  className?: string;
}) => {
  const isSmallerThanMd = useBreakpoint("md");
  const isSmallerThanSm = useBreakpoint("sm");
  return (
    <div
      className={cn(
        `absolute left-1/2 aspect-square w-[350%] -translate-x-1/2 overflow-hidden md:w-[190%] lg:w-[190%] xl:w-[190%] 2xl:mx-auto`,
        className,
      )}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: isSmallerThanSm
          ? `275% auto`
          : isSmallerThanMd
            ? `150% auto`
            : `cover`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: `center top`,
        WebkitMask: `linear-gradient(to bottom, transparent 0%, black 5%, black 70%, transparent 100%)`,
        mask: `linear-gradient(to bottom, transparent 0%, black 5%, black 70%, transparent 100%)`,
        WebkitBackfaceVisibility: `hidden`,
        backfaceVisibility: `hidden`,
        WebkitPerspective: `1000px`,
        perspective: `1000px`,
        willChange: `transform`,
      }}
    />
  );
};

export const BackgroundGradient = () => {

  return (
    <div className="absolute inset-0 w-full overflow-hidden">
        <div className=" absolute inset-0 mt-0  blur-[10px]">
          <BackgroundImage src={"/images/gradient-optimized.png"} />
        </div>
    </div>
  );
};
