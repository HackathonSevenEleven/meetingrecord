import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      // Multiple approaches to ensure scroll works
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });

      // Direct manipulation as fallback
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Force scroll on the window object
      if (window.pageYOffset !== 0) {
        window.scrollTo(0, 0);
      }
    };

    // Immediate scroll
    scrollToTop();

    // Also scroll after a short delay to handle any async content loading
    const timeoutId = setTimeout(() => {
      scrollToTop();
    }, 100);

    // And use requestAnimationFrame for the next render cycle
    const rafId = requestAnimationFrame(() => {
      scrollToTop();
    });

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
