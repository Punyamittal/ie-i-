import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import GooeyNav from '@/components/ui/GooeyNav';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Membership', path: '/membership' },
  { name: 'Events', path: '/events' },
  { name: 'Resources', path: '/resources' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Track scroll direction using wheel events for more reliable detection
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        // Scrolling down - hide immediately
        setIsHidden(true);
        setIsScrolled(true);
      } else if (e.deltaY < 0) {
        // Scrolling up - show immediately
        setIsHidden(false);
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      // Also check scroll position for when normal scrolling works
      if (currentScrollY > lastScrollY && currentScrollY > 5) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHidden(false);
      }
      
      if (currentScrollY <= 5) {
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Listen to both wheel and scroll events
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Fade in on mount
    setTimeout(() => setIsVisible(true), 100);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-transform duration-200 ease-in-out border-b border-white/20',
        'bg-transparent',
        isVisible ? 'opacity-100' : 'opacity-0',
        isHidden ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between md:justify-evenly w-full relative">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80 flex-shrink-0"
          >
            <img 
              src="/image.png" 
              alt="IE(I) Logo" 
              className="h-16 w-auto object-contain"
            />
            <span className="text-xl font-semibold tracking-tight text-white hidden sm:block">
              IE(I)
            </span>
          </Link>

          {/* Desktop Navigation - GooeyNav */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <GooeyNav
              items={navItems.map(item => ({ label: item.name, href: item.path }))}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              initialActiveIndex={navItems.findIndex(item => {
                if (item.path === '/' && location.pathname === '/') return true;
                if (item.path !== '/' && location.pathname.startsWith(item.path)) return true;
                return false;
              }) || 0}
              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white transition-opacity hover:opacity-70 flex-shrink-0"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          )}
        >
          <ul className="flex flex-col gap-4 py-4 border-t border-white/20">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <li
                  key={item.name}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  className={cn(
                    'transition-all duration-300',
                    isMobileMenuOpen
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-4'
                  )}
                >
                  <Link
                    to={item.path}
                    className={cn(
                      'block text-sm font-medium tracking-wide uppercase transition-colors relative pl-4 py-2',
                      isActive
                        ? 'text-white'
                        : 'text-white/70 hover:text-white'
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-white" />
                    )}
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}