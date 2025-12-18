import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './hero-ascii-one.css';
import { loadUnicornStudioScript } from '@/lib/unicornStudioLoader';

export default function HeroAsciiOne() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const styleId = 'hero-ascii-one-styles';
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hideBrandingTimeoutRef = useRef<number[]>([]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { rootMargin: '50px' }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      if (observerRef.current && containerRef.current) {
        observerRef.current.unobserve(containerRef.current);
      }
    };
  }, []);

  // Optimized branding hide function
  const hideBranding = useCallback(() => {
    const projectDiv = document.querySelector('[data-us-project="OMzqyUv6M3kSnv0JeAtC"]');
    if (!projectDiv) return;

    // Only query once per call
    const brandingElements = projectDiv.querySelectorAll(
      'a[href*="unicorn"], button[title*="unicorn"], div[title*="Made with"], [class*="brand"], [class*="credit"], [class*="watermark"]'
    );
    
    brandingElements.forEach((el) => {
      if (el.parentNode) {
        el.remove();
      }
    });

    const canvas = projectDiv.querySelector('canvas');
    if (canvas) {
      canvas.style.filter = 'brightness(0.8) contrast(1.5) saturate(1)';
      canvas.style.background = 'black';
      canvas.style.opacity = '1';
    }
  }, []);

  // Load script and setup when visible
  useEffect(() => {
    if (!isVisible) return;

    let mounted = true;

    // Add styles only once
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        [data-us-project="OMzqyUv6M3kSnv0JeAtC"] {
          position: relative !important;
          overflow: hidden !important;
          background: black !important;
        }
        
        [data-us-project="OMzqyUv6M3kSnv0JeAtC"] canvas {
          clip-path: inset(0 0 10% 0) !important;
          background: black !important;
          filter: brightness(0.8) contrast(1.5) saturate(1) !important;
          opacity: 1 !important;
          image-rendering: auto !important;
        }
        
        [data-us-project="OMzqyUv6M3kSnv0JeAtC"] * {
          pointer-events: none !important;
        }
        
        [data-us-project="OMzqyUv6M3kSnv0JeAtC"] a[href*="unicorn"],
        [data-us-project="OMzqyUv6M3kSnv0JeAtC"] button[title*="unicorn"],
        [data-us-project="OMzqyUv6M3kSnv0JeAtC"] div[title*="Made with"],
        [data-us-project="OMzqyUv6M3kSnv0JeAtC"] .unicorn-brand,
        [data-us-project="OMzqyUv6M3kSnv0JeAtC"] [class*="brand"],
        [data-us-project="OMzqyUv6M3kSnv0JeAtC"] [class*="credit"],
        [data-us-project="OMzqyUv6M3kSnv0JeAtC"] [class*="watermark"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Load script
    loadUnicornStudioScript()
      .then(() => {
        if (!mounted) return;
        setIsLoading(false);
        
        // Hide branding with optimized timing
        hideBranding();
        const timeout1 = window.setTimeout(hideBranding, 500);
        const timeout2 = window.setTimeout(hideBranding, 1500);
        const timeout3 = window.setTimeout(hideBranding, 3000);
        
        hideBrandingTimeoutRef.current = [timeout1, timeout2, timeout3];
      })
      .catch((error) => {
        console.error('Failed to load UnicornStudio:', error);
        if (mounted) {
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
      hideBrandingTimeoutRef.current.forEach((timeout) => {
        clearTimeout(timeout);
      });
      hideBrandingTimeoutRef.current = [];
    };
  }, [isVisible, hideBranding]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Background GIF - positioned to the left */}
      <div 
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: 'url(/astro.gif)',
          backgroundSize: '50%',
          backgroundPosition: 'left center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.3
        }}
      />

      {/* Corner Frame Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 border-white/30 z-20"></div>
      <div className="absolute top-0 right-0 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 border-white/30 z-20"></div>
      <div className="absolute left-0 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 border-white/30 z-20" style={{ bottom: '5vh' }}></div>
      <div className="absolute right-0 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 border-white/30 z-20" style={{ bottom: '5vh' }}></div>

      {/* CTA Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-end pt-16 lg:pt-0" style={{ marginTop: '5vh' }}>
        <div className="w-full lg:w-1/2 px-6 lg:px-16 lg:pr-[10%]">
          <div className="max-w-lg relative lg:ml-auto">
            {/* Top decorative line */}
            <div className="flex items-center gap-2 mb-3 opacity-60">
              <div className="w-8 h-px bg-white"></div>
              <span className="text-white text-[10px] font-mono tracking-wider">∞</span>
              <div className="flex-1 h-px bg-white"></div>
            </div>

            {/* Title with dithered accent */}
            <div className="relative">
              <div className="hidden lg:block absolute -right-3 top-0 bottom-0 w-1 dither-pattern opacity-40"></div>
              <h1 className="text-2xl lg:text-5xl font-bold text-white mb-3 lg:mb-4 leading-tight font-mono tracking-wider lg:-ml-[5%]" style={{ letterSpacing: '0.1em' }}>
                {'INSTITUTION OF ENGINEERS '.split('').map((char, index) => (
                  <span
                    key={index}
                    className="animate-text-reveal inline-block"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
                <span className="inline-block whitespace-nowrap">
                  {'(INDIA)'.split('').map((char, index) => {
                    const baseIndex = 'INSTITUTION OF ENGINEERS '.length;
                    return (
                      <span
                        key={baseIndex + index}
                        className="animate-text-reveal inline-block"
                        style={{
                          animationDelay: `${(baseIndex + index) * 0.05}s`,
                          animationFillMode: 'both'
                        }}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              </h1>
            </div>

            {/* Decorative dots pattern - desktop only */}
            <div className="hidden lg:flex gap-1 mb-3 opacity-40">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="w-0.5 h-0.5 bg-white rounded-full"></div>
              ))}
            </div>

            {/* Description with subtle grid pattern */}
            <div className="relative">
              <p className="text-xs lg:text-base text-gray-300 mb-5 lg:mb-6 leading-relaxed font-mono opacity-80">
                Empowering engineering students with knowledge, skills, and opportunities to excel. We bridge the gap between academic learning and industry practices, fostering innovation and continuous growth.
              </p>
              
              {/* Technical corner accent - desktop only */}
              <div className="hidden lg:block absolute -left-4 top-1/2 w-3 h-3 border border-white opacity-30" style={{ transform: 'translateY(-50%)' }}>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white" style={{ transform: 'translate(-50%, -50%)' }}></div>
              </div>
            </div>

            {/* Buttons with technical accents */}
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
              <Link 
                to="/membership"
                className="relative px-5 lg:px-6 py-2 lg:py-2.5 bg-transparent text-white font-mono text-xs lg:text-sm border border-white hover:bg-white hover:text-black transition-all duration-200 group text-center"
              >
                <span className="hidden lg:block absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="hidden lg:block absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                JOIN US
              </Link>
              
              <Link 
                to="/events"
                className="relative px-5 lg:px-6 py-2 lg:py-2.5 bg-transparent border border-white text-white font-mono text-xs lg:text-sm hover:bg-white hover:text-black transition-all duration-200 text-center" 
                style={{ borderWidth: '1px' }}
              >
                EXPLORE EVENTS
              </Link>
            </div>

            {/* Bottom technical notation - desktop only */}
            <div className="hidden lg:flex items-center gap-2 mt-6 opacity-40">
              <span className="text-white text-[9px] font-mono">∞</span>
              <div className="flex-1 h-px bg-white"></div>
              <span className="text-white text-[9px] font-mono">IE(I).PROTOCOL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="absolute left-0 right-0 z-20 border-t border-white/20 bg-black/40 backdrop-blur-sm" style={{ bottom: '5vh' }}>
        <div className="container mx-auto px-4 lg:px-8 py-2 lg:py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 lg:gap-6 text-[8px] lg:text-[9px] font-mono text-white/50">
            <span className="hidden lg:inline">SYSTEM.ACTIVE</span>
            <span className="lg:hidden">SYS.ACT</span>
            <div className="hidden lg:flex gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-1 h-3 bg-white/30" style={{ height: `${Math.random() * 12 + 4}px` }}></div>
              ))}
            </div>
            <span>V1.0.0</span>
          </div>
          
          <div className="flex items-center gap-2 lg:gap-4 text-[8px] lg:text-[9px] font-mono text-white/50">
            <span className="hidden lg:inline">◐ RENDERING</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="hidden lg:inline">FRAME: ∞</span>
          </div>
        </div>
      </div>
    </main>
  );
}

