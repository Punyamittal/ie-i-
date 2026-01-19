import { Layout } from '@/components/Layout';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Calendar, MapPin, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GLSLHills } from '@/components/ui/glsl-hills';

export default function EventsPage() {
  const { ref: eventRef, isVisible: eventVisible } = useScrollReveal();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-primary">
        <GLSLHills width="100%" height="100%" cameraZ={125} />
        <div className="space-y-6 pointer-events-none z-10 text-center absolute">
          <h1 className="font-semibold text-4xl md:text-5xl lg:text-7xl whitespace-pre-wrap">
            <span className="italic text-3xl md:text-4xl lg:text-6xl font-thin text-primary-foreground">IE(I) Events & Activities</span>
            <br />
            <span className="text-primary-foreground">
              {'Connecting Engineers, Building '.split('').map((char, index) => (
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
                {'Futures'.split('').map((char, index) => {
                  const baseIndex = 'Connecting Engineers, Building '.length;
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
            </span>
          </h1>
          <p className="text-sm md:text-base text-primary-foreground/60">
            Workshops, Seminars, Conventions, Technical Sessions
            <br />
            Join us for innovative learning experiences
          </p>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">
            Upcoming Events
          </h2>
          
          {/* Inauguration Ceremony Event Card */}
          <div
            ref={eventRef}
            className={cn(
              'max-w-5xl mx-auto transition-all duration-700',
              eventVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            )}
          >
            <div className="card-mono overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Event Details */}
                <div className="flex flex-col space-y-6">
                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                    Inauguration Ceremony
                </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    Join us for the official inauguration of IE(I) at VIT Chennai, marking the beginning of a collaborative platform focused on innovation, learning, and leadership.
                  </p>

                  {/* Session Insights */}
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-3">
                      The session will feature insights on:
                </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-foreground mt-1">•</span>
                        <span>Industry expectations from students</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-foreground mt-1">•</span>
                        <span>Building real-world skills alongside academics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-foreground mt-1">•</span>
                        <span>Opportunities through the student chapter</span>
                      </li>
                    </ul>
                  </div>

                  {/* Date, Time, Venue */}
                  <div className="space-y-4 pt-4 border-t border-border">
                    <div className="flex items-start gap-3">
                      <Calendar size={20} strokeWidth={1} className="text-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                        <p className="text-foreground font-semibold">23 January 2026</p>
                </div>
              </div>

                    <div className="flex items-start gap-3">
                      <Clock size={20} strokeWidth={1} className="text-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Time</p>
                        <p className="text-foreground font-semibold">10:30 AM – 01:30 PM</p>
          </div>
        </div>

                    <div className="flex items-start gap-3">
                      <MapPin size={20} strokeWidth={1} className="text-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Venue</p>
                        <p className="text-foreground font-semibold">Mini Conference Hall, AB-1</p>
                        <p className="text-foreground font-semibold">VIT Chennai – 600127</p>
                      </div>
                </div>
                </div>

                  {/* Chief Guest */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-start gap-3">
                      <User size={20} strokeWidth={1} className="text-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Chief Guest & Speaker</p>
                        <p className="text-lg font-bold text-foreground mb-2">Dr. Karthikeyan S.</p>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>Chairman IE(I), KLC</p>
                          <p>National Council Member</p>
                          <p>Member R&D Committee, Member</p>
                          <p>All India Students Committee, IE(I)</p>
                          <p>Kolkata</p>
                </div>
              </div>
          </div>
        </div>

                  {/* Audience */}
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-semibold text-foreground">
                      Open to all VIT Chennai Students
                    </p>
                  </div>
                  </div>
                  
                {/* Right: Speaker Image */}
                <div className="flex items-center justify-center lg:justify-end">
                  <div className="w-full lg:w-auto max-w-md">
                    <div className="relative rounded-lg overflow-hidden border border-border bg-secondary">
                      <img
                        src="/Inauguration Ceremony (1).png"
                        alt="Inauguration Ceremony - IE(I) VIT Chennai"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

