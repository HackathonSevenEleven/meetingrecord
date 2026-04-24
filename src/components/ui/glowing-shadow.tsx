"use client";

import { type ReactNode } from "react";

interface GlowingShadowProps {
  children: ReactNode;
  className?: string;
}

export function GlowingShadow({ children, className }: GlowingShadowProps) {
  return (
    <>
      <style>{`
        @property --rotate {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --bg-y {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --bg-x {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-translate-y {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --bg-size {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-opacity {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-blur {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-scale {
          syntax: "<number>";
          inherits: true;
          initial-value: 2;
        }
        @property --glow-radius {
          syntax: "<number>";
          inherits: true;
          initial-value: 2;
        }
        @property --white-shadow {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }

        .glow-container {
          --card-color: hsl(260deg 100% 3%);
          --text-color: hsl(260deg 10% 55%);
          --card-radius: 24px;
          --card-width: 320px;
          --border-width: 3px;
          --bg-size: 1;
          --rotate: 0;
          --animation-speed: 4s;
          --interaction-speed: 0.55s;
          --glow-scale: 1.5;
          --scale-factor: 1;
          --glow-blur: 6;
          --glow-opacity: 1;
          --glow-radius: 100;
          --glow-rotate-unit: 1deg;

          width: var(--card-width);
          aspect-ratio: 1/1;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          border-radius: var(--card-radius);
          cursor: pointer;
        }

        .glow-container:before,
        .glow-container:after {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: var(--card-radius);
        }

        .glow-content {
          position: absolute;
          width: calc(100% - var(--border-width) * 2);
          height: calc(100% - var(--border-width) * 2);
          background: var(--card-color);
          border-radius: calc(var(--card-radius) * 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .glow-content:before {
          content: "";
          display: block;
          position: absolute;
          width: calc(100% + var(--border-width));
          height: calc(100% + var(--border-width));
          border-radius: calc(var(--card-radius) * 0.9);
          box-shadow: 0 0 20px black;
          mix-blend-mode: color-burn;
          z-index: -1;
          background: hsl(0deg 0% 10%) radial-gradient(
            35% 35% at calc(var(--bg-x) * 1%) calc(var(--bg-y) * 1%),
            rgba(130, 188, 255, 0.9) 0%,
            rgba(36, 131, 255, 0.8) 20%,
            rgba(255, 102, 244, 0.7) 45%,
            rgba(255, 48, 41, 0.6) 70%,
            rgba(254, 123, 2, 0.4) 90%,
            transparent 100%
          );
          animation: rotate-bg var(--animation-speed) linear infinite;
          transition: --bg-size var(--interaction-speed) ease;
        }

        .glow {
          --glow-translate-y: 0;
          display: block;
          position: absolute;
          width: 64px;
          height: 64px;
          animation: rotate var(--animation-speed) linear infinite, glow-color-shift calc(var(--animation-speed) * 1.5) ease-in-out infinite;
          transform: rotateZ(calc(var(--rotate) * var(--glow-rotate-unit)));
          transform-origin: center;
          border-radius: calc(var(--glow-radius) * 10vw);
        }

        .glow:after {
          content: "";
          display: block;
          z-index: -2;
          filter: blur(calc(var(--glow-blur) * 10px));
          width: 130%;
          height: 130%;
          left: -15%;
          top: -15%;
          background: linear-gradient(
            135deg,
            rgba(130, 188, 255, 0.8) 0%,
            rgba(36, 131, 255, 0.9) 24%,
            rgba(255, 102, 244, 1) 52%,
            rgba(255, 48, 41, 1) 78%,
            rgba(254, 123, 2, 1) 99%
          );
          position: relative;
          border-radius: calc(var(--glow-radius) * 10vw);
          animation: glow-color-shift calc(var(--animation-speed) * 1.5) ease-in-out infinite;
          transform: scaleY(calc(var(--glow-scale) * var(--scale-factor) / 1.1))
                     scaleX(calc(var(--glow-scale) * var(--scale-factor) * 1.2))
                     translateY(calc(var(--glow-translate-y) * 1%));
          opacity: var(--glow-opacity);
        }

        .glow-container:hover .glow-content {
          mix-blend-mode: darken;
          --text-color: white;
          box-shadow: 0 0 calc(var(--white-shadow) * 1vw) calc(var(--white-shadow) * 0.15vw) rgb(255 255 255 / 20%);
          animation: shadow-pulse calc(var(--animation-speed) * 2) linear infinite;
        }

        .glow-container:hover .glow-content:before {
          --bg-size: 15;
          animation-play-state: paused;
          transition: --bg-size var(--interaction-speed) ease;
        }

        .glow-container:hover .glow {
          --glow-blur: 1.5;
          --glow-opacity: 0.7;
          --glow-scale: 2.5;
          --glow-radius: 0;
          --rotate: 900;
          --glow-rotate-unit: 0;
          --scale-factor: 1.25;
          animation-play-state: paused;
        }

        .glow-container:hover .glow:after {
          --glow-translate-y: 0;
          animation-play-state: paused;
          transition: --glow-translate-y 0s ease, --glow-blur 0.05s ease,
                      --glow-opacity 0.05s ease, --glow-scale 0.05s ease,
                      --glow-radius 0.05s ease;
        }

        @keyframes shadow-pulse {
          0%, 24%, 46%, 73%, 96% {
            --white-shadow: 0.5;
          }
          12%, 28%, 41%, 63%, 75%, 82%, 98% {
            --white-shadow: 2.5;
          }
          6%, 32%, 57% {
            --white-shadow: 1.3;
          }
          18%, 52%, 88% {
            --white-shadow: 3.5;
          }
        }

        @keyframes rotate-bg {
          0% {
            --bg-x: 0;
            --bg-y: 0;
          }
          25% {
            --bg-x: 100;
            --bg-y: 0;
          }
          50% {
            --bg-x: 100;
            --bg-y: 100;
          }
          75% {
            --bg-x: 0;
            --bg-y: 100;
          }
          100% {
            --bg-x: 0;
            --bg-y: 0;
          }
        }

        @keyframes rotate {
          from {
            --rotate: -70;
            --glow-translate-y: -65;
          }
          25% {
            --glow-translate-y: -65;
          }
          50% {
            --glow-translate-y: -65;
          }
          60%, 75% {
            --glow-translate-y: -65;
          }
          85% {
            --glow-translate-y: -65;
          }
          to {
            --rotate: calc(360 - 70);
            --glow-translate-y: -65;
          }
        }

        @keyframes glow-color-shift {
          0%, 100% {
            filter: blur(calc(var(--glow-blur) * 10px)) hue-rotate(0deg);
          }
          50% {
            filter: blur(calc(var(--glow-blur) * 10px)) hue-rotate(15deg);
          }
        }
      `}</style>

      <div className={`glow-container ${className || ""}`}>
        <div className="glow"></div>
        <div className="glow-content">{children}</div>
      </div>
    </>
  );
}
