import { Layout } from '@/components/Layout';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { Component as Hero2 } from '@/components/ui/hero-2';

export default function GalleryPage() {
  const { ref: comingSoonRef, isVisible: comingSoonVisible } = useScrollReveal();

  return (
    <Layout>
      {/* Hero Section */}
      <Hero2 />

      {/* Coming Soon Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
              <div
            ref={comingSoonRef}
                className={cn(
              'flex items-center justify-center min-h-[60vh] transition-all duration-700',
              comingSoonVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                )}
              >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center text-foreground">
              Coming Soon..
            </h2>
          </div>
        </div>
      </section>
    </Layout>
  );
}

