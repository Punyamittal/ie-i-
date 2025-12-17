import { useEffect, useRef, useState, useCallback } from 'react';
import './hero-ascii.css';
import { loadUnicornStudioScript } from '@/lib/unicornStudioLoader';

export default function HeroAscii() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const styleId = 'hero-ascii-styles';
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
    const projectDiv = document.querySelector('[data-us-project="whwOGlfJ5Rz2rHaEUgHl"]');
    if (!projectDiv) return;

    // Only query specific branding elements
    const brandingElements = projectDiv.querySelectorAll(
      'a[href*="unicorn"], button[title*="unicorn"], div[title*="Made with"], [class*="brand"], [class*="credit"], [class*="watermark"]'
    );
    
    brandingElements.forEach((el) => {
      if (el.parentNode) {
        el.remove();
      }
    });
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
        [data-us-project="whwOGlfJ5Rz2rHaEUgHl"] {
          position: relative !important;
          overflow: hidden !important;
        }
        
        [data-us-project="whwOGlfJ5Rz2rHaEUgHl"] canvas {
          clip-path: inset(0 0 10% 0) !important;
        }
        
        [data-us-project="whwOGlfJ5Rz2rHaEUgHl"] * {
          pointer-events: none !important;
        }
        
        [data-us-project="whwOGlfJ5Rz2rHaEUgHl"] a[href*="unicorn"],
        [data-us-project="whwOGlfJ5Rz2rHaEUgHl"] button[title*="unicorn"],
        [data-us-project="whwOGlfJ5Rz2rHaEUgHl"] div[title*="Made with"],
        [data-us-project="whwOGlfJ5Rz2rHaEUgHl"] .unicorn-brand,
        [data-us-project="whwOGlfJ5Rz2rHaEUgHl"] [class*="brand"],
        [data-us-project="whwOGlfJ5Rz2rHaEUgHl"] [class*="credit"],
        [data-us-project="whwOGlfJ5Rz2rHaEUgHl"] [class*="watermark"] {
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
      {/* Vitruvian man animation - hidden on mobile */}
      <div 
        ref={containerRef}
        className="absolute inset-0 w-full h-full hidden lg:block"
      >
        {isVisible && (
          <div 
            data-us-project="whwOGlfJ5Rz2rHaEUgHl" 
            style={{ width: '100%', height: '100%', minHeight: '100vh' }}
          />
        )}
        {isLoading && isVisible && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>
          </div>
        )}
      </div>

      {/* Mobile stars background */}
      <div className="absolute inset-0 w-full h-full lg:hidden stars-bg"></div>

      {/* Corner Frame Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 border-white/30 z-20"></div>
      <div className="absolute top-0 right-0 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 border-white/30 z-20"></div>
      <div className="absolute left-0 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 border-white/30 z-20" style={{ bottom: '5vh' }}></div>
      <div className="absolute right-0 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 border-white/30 z-20" style={{ bottom: '5vh' }}></div>

      <div className="relative z-10 flex min-h-screen items-center pt-16 lg:pt-0" style={{ marginTop: '5vh' }}>
        <div className="container mx-auto px-6 lg:px-16 lg:ml-[10%]">
          <div className="max-w-lg relative">
            {/* Top decorative line */}
            <div className="flex items-center gap-2 mb-3 opacity-60">
              <div className="w-8 h-px bg-white"></div>
              <span className="text-white text-[10px] font-mono tracking-wider">001</span>
              <div className="flex-1 h-px bg-white"></div>
            </div>

            {/* Title with dithered accent */}
            <div className="relative">
              <div className="hidden lg:block absolute -left-3 top-0 bottom-0 w-1 dither-pattern opacity-40"></div>
              <h1 className="text-2xl lg:text-5xl font-bold text-white mb-3 lg:mb-4 leading-tight font-mono tracking-wider" style={{ letterSpacing: '0.1em' }}>
                PERFECT
                <span className="block text-white mt-1 lg:mt-2 opacity-90">
                  PROPORTIONS
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
                Where geometry meets humanity — Da Vinci's vision of ideal form
              </p>
              
              {/* Technical corner accent - desktop only */}
              <div className="hidden lg:block absolute -right-4 top-1/2 w-3 h-3 border border-white opacity-30" style={{ transform: 'translateY(-50%)' }}>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white" style={{ transform: 'translate(-50%, -50%)' }}></div>
              </div>
            </div>

            {/* Buttons with technical accents */}
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
              <button className="relative px-5 lg:px-6 py-2 lg:py-2.5 bg-transparent text-white font-mono text-xs lg:text-sm border border-white hover:bg-white hover:text-black transition-all duration-200 group">
                <span className="hidden lg:block absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="hidden lg:block absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                GET STARTED
              </button>
              
              <button className="relative px-5 lg:px-6 py-2 lg:py-2.5 bg-transparent border border-white text-white font-mono text-xs lg:text-sm hover:bg-white hover:text-black transition-all duration-200" style={{ borderWidth: '1px' }}>
                LEARN MORE
              </button>
            </div>

            {/* Bottom technical notation - desktop only */}
            <div className="hidden lg:flex items-center gap-2 mt-6 opacity-40">
              <span className="text-white text-[9px] font-mono">∞</span>
              <div className="flex-1 h-px bg-white"></div>
              <span className="text-white text-[9px] font-mono">VITRUVIAN</span>
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

