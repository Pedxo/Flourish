"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ── Reveal-on-scroll (same mechanism as before, respects reduced motion) */
function ScrollReveal({
  children,
  delay = 0,
  className = "",
  as: Component = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: any;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      className={className}
      style={
        reduceMotion
          ? {}
          : {
              opacity: isVisible ? 1 : 0,
              filter: isVisible ? "blur(0px)" : "blur(4px)",
              transform: isVisible ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, filter 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
            }
      }
    >
      {children}
    </Component>
  );
}

/* ── Signature element ───────────────────────────────────────────────────
   A single hand-drawn stroke that "signs itself in" once scrolled into
   view — literalizing the word "flourish" as the calligraphic mark
   its own name refers to, rather than a plant/growth cliché. ────────── */
function FlourishStroke({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 600 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 24C46 6 92 4 138 16C172 25 196 32 226 24C266 13 292 5 330 12C372 20 392 34 432 27C468 21 486 8 524 10C548 11 566 18 598 15"
        stroke="#7A2E2E"
        strokeWidth="2.5"
        strokeLinecap="round"
        pathLength={1}
        style={
          reduceMotion
            ? {}
            : {
                strokeDasharray: 1,
                strokeDashoffset: drawn ? 0 : 1,
                transition: "stroke-dashoffset 1.6s cubic-bezier(0.65,0,0.35,1)",
              }
        }
      />
    </svg>
  );
}

export default function Home() {
  const disciplines = [
    "architects",
    "artists",
    "engineers",
    "filmmakers",
    "graphic designers",
    "industrial designers",
    "interaction designers",
    "motion designers",
    "musicians",
    "sound designers",
    "type designers",
    "writers",
  ];

  return (
    <div className="flourish-page min-h-screen w-full flex flex-col justify-between overflow-hidden">
      {/*
        Fonts are loaded via next/font/google in app/layout.tsx (see the
        --font-fraunces / --font-inter / --font-plex-mono variables it
        sets on <html>) rather than an @import here, so there's no
        render-blocking font request and no risk of this file being
        mistaken for the app's root layout.
      */}
      <style>{`
        .flourish-page {
          --paper: #EEF0EC;
          --ink: #14171A;
          --ink-soft: #55594F;
          --accent: #7A2E2E;
          --line: rgba(20, 23, 26, 0.14);
          background: var(--paper);
          color: var(--ink);
          font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
        }
        .font-display {
          font-family: var(--font-fraunces), ui-serif, Georgia, serif;
        }
        .font-mono {
          font-family: var(--font-plex-mono), ui-monospace, SFMono-Regular, monospace;
        }

        .discipline-row-wrap + .discipline-row-wrap {
          border-top: 1px solid var(--line);
        }

        .discipline-row {
          position: relative;
          display: flex;
          justify-content: center;
          cursor: default;
        }
        .discipline-row::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 0%;
          height: 2px;
          background: var(--accent);
          transform: translateX(-50%);
          transition: width 0.45s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .discipline-row:hover::after,
        .discipline-row:focus-visible::after {
          width: 100%;
        }

        a:focus-visible,
        .discipline-row:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          .discipline-row::after {
            transition: none;
          }
        }
      `}</style>

      <div className="flex flex-col min-h-screen justify-between p-6 sm:p-8 md:p-16 lg:p-24 w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Flourish logo"
              width={36}
              height={36}
              className="object-contain"
              priority
            />
            <span className="font-display text-lg font-medium tracking-tight">
              Flourish
            </span>
          </div>
          <p
            className="font-mono text-[11px] md:text-xs tracking-[0.2em] uppercase"
            style={{ color: "var(--ink-soft)" }}
          >
            Powered by{" "}
            <a
              href="https://pedxo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors border-b border-transparent hover:border-current pb-[2px]"
              style={{ color: "inherit" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-soft)")}
            >
              pedxo
            </a>
          </p>
        </header>

        {/* Hero / disciplines — fills the space between header and footer,
            so the page reads as one full screen instead of a short
            centered block with empty margins above and below it. */}
        <main className="flex-1 flex flex-col justify-center w-full py-10 sm:py-12">
          <ScrollReveal delay={0.1} className="text-center shrink-0">
            <p className="font-display text-2xl sm:text-3xl md:text-5xl leading-[1.15] font-light">
              Flourish is a design and
              <br />
              creative collective of
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3} className="mt-6 mb-6 sm:mb-8 flex justify-center shrink-0">
            <FlourishStroke className="w-32 sm:w-40 md:w-56 h-6" />
          </ScrollReveal>

          {/* Vertical, evenly-distributed list — each row shares the
              remaining height equally, so twelve disciplines stretch to
              fill the screen on any viewport instead of clustering in
              the middle. */}
          <div className="flex-2 flex flex-col">
            {disciplines.map((d, i) => (
              <ScrollReveal
                key={d}
                delay={0.4 + i * 0.04}
                className="discipline-row-wrap flex-1 flex items-center justify-center min-h-[2.75rem] sm:min-h-[3.25rem]"
              >
                <span
                  tabIndex={0}
                  className="discipline-row font-display text-xl sm:text-2xl md:text-4xl font-medium px-2 py-2 w-full text-center"
                  style={{ color: "var(--ink)" }}
                >
                  {d}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 text-sm md:text-base pt-6 sm:pt-8 mt-8 sm:mt-12 w-full z-10 shrink-0"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          <div>
            <a
              href="mailto:career@pedxo.com"
              className="flex flex-wrap items-center group"
              style={{ color: "var(--ink)" }}
            >
              <span className="border-b border-transparent group-hover:border-current pb-0.5 transition-colors">
                career@pedxo.com
              </span>
              <span
                className="ml-2 text-xs sm:text-sm italic font-display"
                style={{ color: "var(--ink-soft)" }}
              >
                (apply as a creative talent)
              </span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:victor@pedxo.com"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 shrink-0"
              style={{ border: "1px solid var(--line)", color: "var(--ink)" }}
              aria-label="Email victor@pedxo.com"
              title="Email victor@pedxo.com"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--ink)";
                e.currentTarget.style.color = "var(--paper)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--ink)";
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
              >
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}