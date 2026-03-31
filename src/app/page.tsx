"use client";

import { useEffect, useRef, useState } from "react";

function ScrollReveal({ 
  children, 
  delay = 0, 
  className = "",
  as: Component = "div" 
}: { 
  children: React.ReactNode, 
  delay?: number, 
  className?: string,
  as?: any
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? "blur(0px)" : "blur(4px)",
        transform: isVisible ? "translateY(0)" : "translateY(25px)",
        transition: `opacity 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, filter 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
      }}
    >
      {children}
    </Component>
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
    "writers"
  ];

  return (
    <div className="flex flex-col min-h-screen justify-between p-8 md:p-16 lg:p-24 w-full max-w-[1400px] mx-auto overflow-hidden">
      <header className="flex z-10 fade-in" style={{ animationDelay: "0.1s" }}>
        <p className="text-xs md:text-sm tracking-[0.2em] uppercase font-sans text-neutral-500 font-medium">
          Powered by <a href="https://pedxo.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors hover:border-black border-b border-transparent pb-[2px]">pedxo</a>
        </p>
      </header>

      <main className="flex-grow flex items-center justify-center py-32 w-full z-0">
        <div className="collective-text flex flex-col items-center text-center">
          <ScrollReveal delay={0.3} className="mb-12">
            <p>
              Flourish is a design and<br />
              creative collective of
            </p>
          </ScrollReveal>
          
          <div className="mb-12 flex flex-col items-center gap-5 leading-snug">
            {disciplines.map((discipline, i) => (
              <ScrollReveal 
                key={discipline} 
                delay={i < 5 ? 0.3 + (i * 0.1) : 0} 
              >
                <span className="bg-black text-white rounded-full px-8 py-2.5 inline-block shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:bg-neutral-800 hover:shadow-[0_12px_24px_rgba(0,0,0,0.18)] hover:-translate-y-1 transition-all duration-300 cursor-default font-sans text-[0.65em] font-medium tracking-wide">
                  {discipline}
                </span>
              </ScrollReveal>
            ))}
          </div>
          
        </div>
      </main>

      <footer className="fade-in flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-sm md:text-base border-t border-neutral-200 pt-8 mt-12 w-full z-10" style={{ animationDelay: "0.8s" }}>
        <div>
          <a href="mailto:career@pedxo.com" className="text-black hover:opacity-60 transition-opacity flex items-center group">
            <span className="border-b border-transparent group-hover:border-current pb-0.5">career@pedxo.com</span>
            <span className="ml-2 opacity-50 text-xs sm:text-sm italic">(apply to be a creative talent)</span>
          </a>
        </div>
        
        <div className="flex items-center gap-4">
          <a href="mailto:victor@pedxo.com" className="text-black w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300" aria-label="Email victor@pedxo.com" title="Email victor@pedxo.com">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
