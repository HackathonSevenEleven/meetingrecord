import useWindowSize from "@/hooks/use-window-size";
import { useMemo } from "react";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

type Breakpoint = keyof typeof breakpoints;

const useBreakpoint = (breakpoint: Breakpoint | number) => {
  if (typeof breakpoint === "number" && breakpoint < 0) {
    throw new Error("Breakpoint value must be positive");
  }

  const windowSize = useWindowSize();

  const breakpointValue = useMemo(
    () =>
      typeof breakpoint === "number" ? breakpoint : breakpoints[breakpoint],
    [breakpoint],
  );
  const isLessThanBreakpoint = useMemo(
    () => windowSize.width !== undefined && windowSize.width < breakpointValue,
    [windowSize.width, breakpointValue],
  );

  // Note that this is the opposite of what Tailwind does, because we're using the desktop as default
  return isLessThanBreakpoint;
};
export default useBreakpoint;
