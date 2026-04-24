import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { cn } from "@/lib/utils";
import { Variants } from "framer-motion";

const transitionVariants: { item: Variants } = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export interface CustomerLogo {
  src: string;
  alt: string;
  height?: number;
}

interface CustomersSectionProps {
  customers: CustomerLogo[];
  className?: string;
  title?: string;
  linkText?: string;
  linkHref?: string;
}

export function CustomersSection({
  customers = [],
  className,
  title = "Meet Our Customers",
  linkText,
  linkHref = "/",
}: CustomersSectionProps) {
  return (
    <section className={cn("bg-background py-12 md:py-16", className)}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center gap-8">
          {linkText ? (
            <Link
              to={linkHref}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {title}
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <span className="text-sm text-muted-foreground">{title}</span>
          )}

          <AnimatedGroup
            variants={transitionVariants}
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8"
          >
            {customers.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  height={logo.height || 24}
                  className="h-6 w-auto max-w-[120px] object-contain dark:invert"
                />
              </div>
            ))}
          </AnimatedGroup>
        </div>
      </div>
    </section>
  );
}
