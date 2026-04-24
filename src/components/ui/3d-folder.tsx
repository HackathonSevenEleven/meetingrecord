"use client"

import { useState, useRef, useEffect, useLayoutEffect, useCallback, forwardRef } from "react"
import { cn } from "@/lib/utils"
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"

interface Project {
  id: string
  image: string
  title: string
}

interface AnimatedFolderProps {
  title: string
  projects: Project[]
  className?: string
}

export function AnimatedFolder({ title, projects, className }: AnimatedFolderProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null)
  const [hiddenCardId, setHiddenCardId] = useState<string | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleProjectClick = (project: Project, index: number) => {
    const cardEl = cardRefs.current[index]
    if (cardEl) {
      setSourceRect(cardEl.getBoundingClientRect())
    }
    setSelectedIndex(index)
    setHiddenCardId(project.id)
  }

  const handleCloseLightbox = () => {
    setSelectedIndex(null)
    setSourceRect(null)
  }

  const handleCloseComplete = () => {
    setHiddenCardId(null)
  }

  const handleNavigate = (newIndex: number) => {
    setSelectedIndex(newIndex)
    setHiddenCardId(projects[newIndex]?.id || null)
  }

  return (
    <>
      <div
        className={cn(
          "group relative w-64 cursor-pointer transition-all duration-500 ease-out",
          "hover:scale-[1.02]",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Subtle background glow on hover - Lovable gradient */}
        <div
          className={cn(
            "absolute -inset-4 rounded-3xl transition-all duration-500",
            "opacity-0 group-hover:opacity-100",
            "blur-xl"
          )}
          style={{
            background: "linear-gradient(135deg, rgba(130, 188, 255, 0.15) 0%, rgba(255, 102, 244, 0.15) 50%, rgba(254, 123, 2, 0.15) 100%)"
          }}
        />

        <div className="relative h-48">
          {/* Folder back layer - z-index 10 */}
          <div
            className={cn(
              "absolute inset-0 rounded-2xl transition-all duration-500 ease-out",
              "bg-gradient-to-br from-[hsl(var(--brand-sapphire-primary))] to-[hsl(var(--brand-twilight-primary))]",
              "shadow-lg"
            )}
            style={{
              transform: isHovered ? "translateY(-8px) rotateX(10deg)" : "translateY(0) rotateX(0)",
              transformOrigin: "bottom center",
            }}
          />

          {/* Folder tab - z-index 10 */}
          <div
            className={cn(
              "absolute -top-3 left-4 h-6 w-20 rounded-t-lg transition-all duration-500 ease-out",
              "bg-gradient-to-r from-[hsl(var(--brand-sapphire-primary))] to-[hsl(var(--brand-twilight-primary))]"
            )}
            style={{
              transform: isHovered ? "translateY(-8px)" : "translateY(0)",
            }}
          />

          {/* Project cards - z-index 20, between back and front */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard
                key={project.id}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                image={project.image}
                title={project.title}
                delay={index * 80}
                isVisible={isHovered}
                index={index}
                onClick={() => handleProjectClick(project, index)}
                isSelected={hiddenCardId === project.id}
              />
            ))}
          </div>

          {/* Folder front layer - z-index 30 */}
          <div
            className={cn(
              "absolute inset-0 z-30 rounded-2xl transition-all duration-500 ease-out",
              "bg-gradient-to-br from-[hsl(var(--brand-ocean-primary))] via-[hsl(var(--brand-bubblegum-primary))] to-[hsl(var(--brand-tiger-primary))]",
              "shadow-xl"
            )}
            style={{
              clipPath: "polygon(0 15%, 100% 15%, 100% 100%, 0 100%)",
              transform: isHovered ? "translateY(12px) rotateX(-15deg)" : "translateY(0) rotateX(0)",
              transformOrigin: "bottom center",
            }}
          />

          {/* Folder shine effect - z-index 31 */}
          <div
            className={cn(
              "absolute inset-0 z-[31] rounded-2xl transition-all duration-500 ease-out",
              "bg-gradient-to-br from-white/30 via-transparent to-transparent",
              "pointer-events-none"
            )}
            style={{
              clipPath: "polygon(0 15%, 100% 15%, 100% 100%, 0 100%)",
              transform: isHovered ? "translateY(12px) rotateX(-15deg)" : "translateY(0) rotateX(0)",
              transformOrigin: "bottom center",
            }}
          />
        </div>

        {/* Folder title */}
        <h3
          className={cn(
            "mt-4 text-lg font-semibold text-foreground transition-colors duration-300",
            "group-hover:text-foreground"
          )}
        >
          {title}
        </h3>

        {/* Project count */}
        <p
          className={cn(
            "text-sm text-muted-foreground transition-colors duration-300",
            "group-hover:text-muted-foreground"
          )}
        >
          {projects.length} projects
        </p>

        {/* Hover hint */}
        <p
          className={cn(
            "mt-1 text-xs italic transition-all duration-300",
            "text-muted-foreground/60",
            "opacity-0 group-hover:opacity-100"
          )}
        >
          Hover to explore
        </p>
      </div>

      <ImageLightbox
        projects={projects}
        currentIndex={selectedIndex ?? 0}
        isOpen={selectedIndex !== null}
        onClose={handleCloseLightbox}
        sourceRect={sourceRect}
        onCloseComplete={handleCloseComplete}
        onNavigate={handleNavigate}
      />
    </>
  )
}

interface ImageLightboxProps {
  projects: Project[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  sourceRect: DOMRect | null
  onCloseComplete?: () => void
  onNavigate: (index: number) => void
}

function ImageLightbox({
  projects,
  currentIndex,
  isOpen,
  onClose,
  sourceRect,
  onCloseComplete,
  onNavigate,
}: ImageLightboxProps) {
  const [animationPhase, setAnimationPhase] = useState<"initial" | "animating" | "complete">("initial")
  const [isClosing, setIsClosing] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [internalIndex, setInternalIndex] = useState(currentIndex)
  const [prevIndex, setPrevIndex] = useState(currentIndex)
  const [isSliding, setIsSliding] = useState(false)
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right")
  const containerRef = useRef<HTMLDivElement>(null)

  const totalProjects = projects.length
  const hasNext = internalIndex < totalProjects - 1
  const hasPrev = internalIndex > 0

  const currentProject = projects[internalIndex]
  const previousProject = projects[prevIndex]

  useEffect(() => {
    if (isOpen && currentIndex !== internalIndex && !isSliding) {
      const direction = currentIndex > internalIndex ? "left" : "right"
      setSlideDirection(direction)
      setPrevIndex(internalIndex)
      setIsSliding(true)

      const timer = setTimeout(() => {
        setInternalIndex(currentIndex)
        setIsSliding(false)
      }, 400)

      return () => clearTimeout(timer)
    }
  }, [currentIndex, isOpen, internalIndex, isSliding])

  useEffect(() => {
    if (isOpen) {
      setInternalIndex(currentIndex)
      setPrevIndex(currentIndex)
      setIsSliding(false)
    }
  }, [isOpen, currentIndex])

  const navigateNext = useCallback(() => {
    if (internalIndex >= totalProjects - 1 || isSliding) return
    onNavigate(internalIndex + 1)
  }, [internalIndex, totalProjects, isSliding, onNavigate])

  const navigatePrev = useCallback(() => {
    if (internalIndex <= 0 || isSliding) return
    onNavigate(internalIndex - 1)
  }, [internalIndex, isSliding, onNavigate])

  const handleClose = useCallback(() => {
    setIsClosing(true)
    onClose()
    setTimeout(() => {
      setIsClosing(false)
      setShouldRender(false)
      setAnimationPhase("initial")
      onCloseComplete?.()
    }, 400)
  }, [onClose, onCloseComplete])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === "Escape") handleClose()
      if (e.key === "ArrowRight") navigateNext()
      if (e.key === "ArrowLeft") navigatePrev()
    }

    window.addEventListener("keydown", handleKeyDown)
    if (isOpen) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, handleClose, navigateNext, navigatePrev])

  useLayoutEffect(() => {
    if (isOpen && sourceRect) {
      setShouldRender(true)
      setAnimationPhase("initial")
      setIsClosing(false)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimationPhase("animating")
        })
      })
      const timer = setTimeout(() => {
        setAnimationPhase("complete")
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isOpen, sourceRect])

  const handleDotClick = (idx: number) => {
    if (isSliding || idx === internalIndex) return
    onNavigate(idx)
  }

  if (!shouldRender || !currentProject) return null

  const getInitialStyles = (): React.CSSProperties => {
    if (!sourceRect) return {}

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const targetWidth = Math.min(768, viewportWidth - 64)
    const targetHeight = Math.min(viewportHeight * 0.85, 600)

    const targetX = (viewportWidth - targetWidth) / 2
    const targetY = (viewportHeight - targetHeight) / 2

    const scaleX = sourceRect.width / targetWidth
    const scaleY = sourceRect.height / targetHeight
    const scale = Math.max(scaleX, scaleY)

    const translateX = sourceRect.left + sourceRect.width / 2 - (targetX + targetWidth / 2)
    const translateY = sourceRect.top + sourceRect.height / 2 - (targetY + targetHeight / 2)

    return {
      transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
      opacity: 1,
    }
  }

  const getFinalStyles = (): React.CSSProperties => {
    return {
      transform: "translate(0, 0) scale(1)",
      opacity: 1,
    }
  }

  const currentStyles = animationPhase === "initial" && !isClosing ? getInitialStyles() : getFinalStyles()

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "transition-opacity duration-400",
        animationPhase === "initial" && !isClosing ? "opacity-0" : "opacity-100",
        isClosing && "opacity-0"
      )}
      onClick={handleClose}
    >
      <div
        className={cn(
          "absolute inset-0 bg-background/80 backdrop-blur-md",
          "transition-opacity duration-400"
        )}
      />

      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleClose()
        }}
        className={cn(
          "absolute top-5 right-5 z-50",
          "w-10 h-10 flex items-center justify-center",
          "rounded-full bg-muted/50 backdrop-blur-md",
          "border border-border",
          "text-muted-foreground hover:text-foreground hover:bg-muted",
          "transition-all duration-300 ease-out hover:scale-105 active:scale-95",
        )}
        style={{
          opacity: animationPhase === "complete" && !isClosing ? 1 : 0,
          transform: animationPhase === "complete" && !isClosing ? "translateY(0)" : "translateY(-10px)",
          transition: "opacity 300ms ease-out, transform 300ms ease-out",
        }}
      >
        <X className="w-5 h-5" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          navigatePrev()
        }}
        disabled={!hasPrev || isSliding}
        className={cn(
          "absolute left-4 md:left-8 z-50",
          "w-12 h-12 flex items-center justify-center",
          "rounded-full bg-muted/50 backdrop-blur-md",
          "border border-border",
          "text-muted-foreground hover:text-foreground hover:bg-muted",
          "transition-all duration-300 ease-out hover:scale-110 active:scale-95",
          "disabled:opacity-0 disabled:pointer-events-none",
        )}
        style={{
          opacity: animationPhase === "complete" && !isClosing && hasPrev ? 1 : 0,
          transform: animationPhase === "complete" && !isClosing ? "translateX(0)" : "translateX(-20px)",
          transition: "opacity 300ms ease-out 150ms, transform 300ms ease-out 150ms",
        }}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          navigateNext()
        }}
        disabled={!hasNext || isSliding}
        className={cn(
          "absolute right-4 md:right-8 z-50",
          "w-12 h-12 flex items-center justify-center",
          "rounded-full bg-muted/50 backdrop-blur-md",
          "border border-border",
          "text-muted-foreground hover:text-foreground hover:bg-muted",
          "transition-all duration-300 ease-out hover:scale-110 active:scale-95",
          "disabled:opacity-0 disabled:pointer-events-none",
        )}
        style={{
          opacity: animationPhase === "complete" && !isClosing && hasNext ? 1 : 0,
          transform: animationPhase === "complete" && !isClosing ? "translateX(0)" : "translateX(20px)",
          transition: "opacity 300ms ease-out 150ms, transform 300ms ease-out 150ms",
        }}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div
        ref={containerRef}
        className={cn(
          "relative z-10 w-full max-w-3xl mx-4",
          "bg-card rounded-2xl overflow-hidden shadow-2xl",
          "border border-border"
        )}
        onClick={(e) => e.stopPropagation()}
        style={{
          ...currentStyles,
          transform: isClosing ? "translate(0, 0) scale(0.95)" : currentStyles.transform,
          transition:
            animationPhase === "initial" && !isClosing
              ? "none"
              : "transform 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease-out",
          transformOrigin: "center center",
        }}
      >
        <div className="relative aspect-video overflow-hidden bg-muted">
          <div className="absolute inset-0">
            {projects.map((project, idx) => (
              <img
                key={project.id}
                src={project.image}
                alt={project.title}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover",
                  "transition-opacity duration-400",
                  idx === internalIndex ? "opacity-100" : "opacity-0"
                )}
              />
            ))}
          </div>

          {/* Subtle vignette effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {currentProject?.title}
              </h2>

              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                    ←
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                    →
                  </span>{" "}
                  to navigate
                </div>

                <div className="flex items-center gap-1.5">
                  {projects.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDotClick(idx)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        idx === internalIndex
                          ? "bg-foreground scale-110"
                          : "bg-muted-foreground/40 hover:bg-muted-foreground/60",
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-200">
              View
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ProjectCardProps {
  image: string
  title: string
  delay: number
  isVisible: boolean
  index: number
  onClick: () => void
  isSelected: boolean
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ image, title, delay, isVisible, index, onClick, isSelected }, ref) => {
    const rotations = [-12, 0, 12]
    const translations = [-55, 0, 55]

    return (
      <div
        ref={ref}
        className={cn(
          "absolute w-28 h-20 rounded-lg overflow-hidden shadow-lg",
          "transition-all ease-out cursor-pointer",
          "hover:scale-105 hover:shadow-xl hover:z-10",
          "border-2 border-white/20",
          isSelected && "opacity-0"
        )}
        style={{
          transform: isVisible
            ? `translateX(${translations[index]}px) translateY(-30px) rotate(${rotations[index]}deg)`
            : "translateY(20px) rotate(0deg)",
          opacity: isVisible && !isSelected ? 1 : 0,
          transitionDuration: "500ms",
          transitionDelay: isVisible ? `${delay}ms` : "0ms",
        }}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
      >
        <img src={image} alt={title} className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <p className="absolute bottom-1 left-2 right-2 text-[10px] font-medium text-white truncate">
          {title}
        </p>
      </div>
    )
  },
)

ProjectCard.displayName = "ProjectCard"
