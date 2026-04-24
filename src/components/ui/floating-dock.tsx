import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface DockItem {
  icon: React.ReactNode
  label: string
  onClick?: () => void
}

interface FloatingDockProps {
  className?: string
  items: DockItem[]
}

interface DockIconButtonProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  className?: string
}

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
}

const DockIconButton = React.forwardRef<HTMLButtonElement, DockIconButtonProps>(
  ({ icon, label, onClick, className }, ref) => {
    return (
      <motion.button
        ref={ref}
        onClick={onClick}
        className={cn(
          "group relative flex h-12 w-12 items-center justify-center rounded-[9.6px]",
          "bg-moon-100 border border-moon-300",
          "text-foreground transition-all duration-300",
          "hover:bg-[#D4E0F9] hover:border-sapphire-400",
          "hover:shadow-[0_0_20px_rgba(89,120,255,0.3)]",
          className
        )}
        whileHover={{ scale: 1.15, y: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-foreground">{icon}</span>
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-foreground text-background px-2 py-1 rounded-md text-xs whitespace-nowrap font-medium">
          {label}
        </span>
      </motion.button>
    )
  }
)
DockIconButton.displayName = "DockIconButton"

const FloatingDock = React.forwardRef<HTMLDivElement, FloatingDockProps>(
  ({ items, className }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn("flex justify-center", className)}
        initial="initial"
        animate="animate"
        variants={floatingAnimation}
      >
        <motion.div
          className={cn(
            "flex items-center gap-3 rounded-3xl p-3",
            "bg-moon-50/90 backdrop-blur-xl",
            "border border-moon-200",
            "shadow-[0_8px_32px_rgba(0,0,0,0.08),0_0_0_1px_rgba(255,255,255,0.1)]"
          )}
        >
          <div className="flex items-center gap-2">
            {items.map((item, index) => (
              <DockIconButton
                key={index}
                icon={item.icon}
                label={item.label}
                onClick={item.onClick}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    )
  }
)
FloatingDock.displayName = "FloatingDock"

export { FloatingDock }
