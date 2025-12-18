import { useRef, useState } from 'react';
import { Layout } from '@/components/Layout';
import { useScrollReveal, useScrollRevealMultiple } from '@/hooks/useScrollReveal';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { GLSLHills } from '@/components/ui/glsl-hills';

const eventCategories = [
  'Workshops',
  'Seminars',
  'Technical Lectures',
  'Conferences',
  'Student Activities',
];

const upcomingEvents = [
  {
    title: 'Advanced Machine Learning Workshop',
    date: 'March 15, 2024',
    description: 'Hands-on workshop covering deep learning fundamentals and practical applications in engineering.',
    location: 'Main Auditorium',
  },
  {
    title: 'Sustainable Engineering Seminar',
    date: 'March 22, 2024',
    description: 'Exploring green technologies and sustainable practices in modern engineering projects.',
    location: 'Conference Hall',
  },
  {
    title: 'Industry-Academia Connect',
    date: 'April 5, 2024',
    description: 'Networking event bringing together industry leaders and academic professionals.',
    location: 'Engineering Block',
  },
];

const pastEvents = [
  { name: 'Tech Innovation Summit 2023', location: 'New Delhi', year: '2023' },
  { name: 'Robotics Competition', location: 'Mumbai', year: '2023' },
  { name: 'AI & ML Conference', location: 'Bangalore', year: '2023' },
  { name: 'Engineering Excellence Awards', location: 'Chennai', year: '2022' },
  { name: 'Startup Showcase', location: 'Hyderabad', year: '2022' },
  { name: 'Women in Engineering Meet', location: 'Pune', year: '2022' },
  { name: 'Research Symposium', location: 'Kolkata', year: '2021' },
  { name: 'Industry Workshop Series', location: 'Ahmedabad', year: '2021' },
  { name: 'Student Technical Fest', location: 'Jaipur', year: '2020' },
];

const timelineEvents = [
  { year: '2023', title: 'Major Expansion', description: 'Launched new chapters across 5 states' },
  { year: '2022', title: 'Digital Transformation', description: 'Introduced online learning platform' },
  { year: '2021', title: 'Research Initiative', description: 'Established research grants program' },
  { year: '2020', title: 'Foundation Year', description: 'Inaugurated new headquarters' },
];

export default function EventsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { ref: eventsRef, isVisible: eventsVisible } = useScrollReveal();
  const { setRef: setEventRef, visibleItems: eventVisible } = useScrollRevealMultiple(3);
  const { setRef: setGalleryRef, visibleItems: galleryVisible } = useScrollRevealMultiple(9);
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollReveal();

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

      {/* Event Categories Filter */}
      <section className="py-12 bg-background border-y border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedCategory('All')}
              className={cn(
                'px-6 py-2 text-sm font-medium border border-border bg-background transition-all duration-300',
                selectedCategory === 'All'
                  ? 'bg-foreground text-background'
                  : 'hover:bg-secondary link-underline'
              )}
            >
              All
            </button>
            {eventCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'px-6 py-2 text-sm font-medium border border-border bg-background transition-all duration-300',
                  selectedCategory === category
                    ? 'bg-foreground text-background'
                    : 'hover:bg-secondary link-underline'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">
            Upcoming Events
          </h2>
          <div
            ref={eventsRef}
            className={cn(
              'grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700',
              eventsVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            )}
          >
            {upcomingEvents.map((event, index) => (
              <div
                key={event.title}
                ref={setEventRef(index)}
                className={cn(
                  'card-mono group transition-all duration-500',
                  eventVisible[index]
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                  <Calendar size={16} strokeWidth={1} />
                  <span>{event.date}</span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight mb-3">
                  {event.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {event.description}
                </p>
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-6">
                  <MapPin size={14} strokeWidth={1} />
                  <span>{event.location}</span>
                </div>
                <button className="text-foreground font-medium text-sm link-underline group-hover:underline">
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events Gallery */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">
            Past Events Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <div
                key={`${event.name}-${index}`}
                ref={setGalleryRef(index)}
                className={cn(
                  'bg-card border border-border p-6 transition-all duration-500',
                  galleryVisible[index]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="aspect-video bg-muted mb-4 flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Event Image</span>
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-2">
                  {event.name}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <MapPin size={14} strokeWidth={1} />
                  <span>{event.location}</span>
                </div>
                <div className="text-muted-foreground text-sm">
                  {event.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">
            Our Journey
          </h2>
          <div
            ref={timelineRef}
            className={cn(
              'relative transition-all duration-700',
              timelineVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            )}
          >
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-border transform md:-translate-x-1/2" />
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div
                  key={event.year}
                  className={cn(
                    'relative flex items-start gap-6',
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  )}
                >
                  {/* Circle */}
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-foreground border-4 border-background" />
                  </div>
                  
                  {/* Content */}
                  <div className={cn(
                    'flex-1 pb-12',
                    index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                  )}>
                    <div className="text-2xl font-bold mb-2">{event.year}</div>
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground text-sm">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

