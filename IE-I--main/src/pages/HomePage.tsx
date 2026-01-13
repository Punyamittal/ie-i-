import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useScrollReveal, useScrollRevealMultiple } from '@/hooks/useScrollReveal';
import { ArrowDown, Calendar, Users, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeroAsciiOne = lazy(() => import('@/components/ui/hero-ascii-one'));

const highlightCards = [
  {
    title: 'Upcoming Events',
    description: 'Workshops, seminars, and competitions to enhance your skills',
    icon: Calendar,
    link: '/events',
  },
  {
    title: 'Membership',
    description: 'Join our community and unlock exclusive benefits',
    icon: Users,
    link: '/membership',
  },
  {
    title: 'Resource Hub',
    description: 'Study materials, papers, and project ideas at your fingertips',
    icon: BookOpen,
    link: '/resources',
  },
];

export default function HomePage() {
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollReveal();
  const { setRef: setCardRef, visibleItems: cardVisible } = useScrollRevealMultiple(3);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <Suspense fallback={
        <main className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>
        </main>
      }>
        <HeroAsciiOne />
      </Suspense>

      {/* Marquee Section */}
      <section className="py-6 bg-background border-y border-border overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="animate-marquee flex gap-8 text-2xl md:text-4xl font-bold tracking-widest text-foreground uppercase">
            <span>Innovation</span>
            <span>•</span>
            <span>Engineering</span>
            <span>•</span>
            <span>Technology</span>
            <span>•</span>
            <span>Innovation</span>
            <span>•</span>
            <span>Engineering</span>
            <span>•</span>
            <span>Technology</span>
            <span>•</span>
          </div>
          <div className="animate-marquee flex gap-8 text-2xl md:text-4xl font-bold tracking-widest text-foreground uppercase">
            <span>Innovation</span>
            <span>•</span>
            <span>Engineering</span>
            <span>•</span>
            <span>Technology</span>
            <span>•</span>
            <span>Innovation</span>
            <span>•</span>
            <span>Engineering</span>
            <span>•</span>
            <span>Technology</span>
            <span>•</span>
          </div>
        </div>
      </section>

      {/* Highlight Cards Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlightCards.map((card, index) => (
              <Link
                key={card.title}
                to={card.link}
                ref={setCardRef(index)}
                className={cn(
                  'card-mono group transition-all duration-500',
                  cardVisible[index]
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <card.icon
                  size={32}
                  strokeWidth={1}
                  className="text-foreground mb-6 group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="text-xl font-semibold tracking-tight mb-3">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {card.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div
            ref={aboutRef}
            className={cn(
              'flex flex-col md:flex-row items-center gap-12 transition-all duration-700',
              aboutVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            )}
          >
            {/* Vertical Line */}
            <div className="hidden md:block animated-line h-48" />

            {/* Content */}
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Who We Are
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                The Institution of Engineers (India) – IE(I) is a premier professional body dedicated to
                fostering innovation, collaboration, and professional growth among engineers.
                We bridge the gap between academic learning and industry practices
                through workshops, competitions, and networking opportunities.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-foreground font-medium link-underline"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}