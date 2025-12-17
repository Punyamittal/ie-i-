import { Layout } from '@/components/Layout';
import { useScrollReveal, useScrollRevealMultiple } from '@/hooks/useScrollReveal';
import { Target, Eye, Award, Lightbulb, Users, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import RotatingEarth from '@/components/ui/wireframe-dotted-globe';

const objectives = [
  'Promote technical excellence and innovation among students',
  'Organize workshops, seminars, and industrial visits',
  'Facilitate networking between students and industry professionals',
  'Encourage participation in competitions and hackathons',
  'Support research and project development initiatives',
];

const teamMembers = [
  { role: 'President', name: 'John Doe', department: 'Mechanical Engineering' },
  { role: 'Vice President', name: 'Jane Smith', department: 'Electrical Engineering' },
  { role: 'Secretary', name: 'Alex Johnson', department: 'Computer Science' },
  { role: 'Faculty Coordinator', name: 'Dr. Sarah Wilson', department: 'Engineering' },
];

const whyWeExist = [
  { icon: Lightbulb, title: 'Innovation', description: 'Fostering creative thinking and problem-solving' },
  { icon: Users, title: 'Community', description: 'Building a network of future engineers' },
  { icon: Rocket, title: 'Growth', description: 'Accelerating professional development' },
];

export default function AboutPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: missionRef, isVisible: missionVisible } = useScrollReveal();
  const { ref: visionRef, isVisible: visionVisible } = useScrollReveal();
  const { setRef: setObjectiveRef, visibleItems: objectiveVisible } = useScrollRevealMultiple(objectives.length);
  const { setRef: setTeamRef, visibleItems: teamVisible } = useScrollRevealMultiple(teamMembers.length);
  const { setRef: setWhyRef, visibleItems: whyVisible } = useScrollRevealMultiple(whyWeExist.length);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div
              ref={heroRef}
              className={cn(
                'transition-all duration-700',
                heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              )}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
                About Us
              </h1>
              <p className="text-white/80 text-lg leading-relaxed">
                The Institution of Engineers (India) – IE(I) is a premier professional body dedicated to
                fostering innovation, collaboration, and professional growth among engineers.
                We bridge the gap between academic learning and industry practices.
              </p>
            </div>
            
            {/* Globe Component */}
            <div
              className={cn(
                'transition-all duration-700',
                heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              )}
              style={{ transitionDelay: '200ms' }}
            >
              <RotatingEarth width={600} height={500} className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Mission */}
            <div
              ref={missionRef}
              className={cn(
                'transition-all duration-700',
                missionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              )}
            >
              <div className="flex items-center gap-4 mb-6">
                <Target size={32} strokeWidth={1} className="text-foreground" />
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To empower engineering students with the knowledge, skills, and opportunities
                needed to excel in their academic and professional careers. We strive to create
                an environment that encourages innovation, collaboration, and continuous learning.
              </p>
            </div>

            {/* Vision */}
            <div
              ref={visionRef}
              className={cn(
                'transition-all duration-700',
                visionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              )}
            >
              <div className="flex items-center gap-4 mb-6">
                <Eye size={32} strokeWidth={1} className="text-foreground" />
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Our Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading student organization that bridges the gap between academic
                education and industry requirements, producing engineers who are not just
                technically proficient but also innovative leaders ready to shape the future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16">
            Our Objectives
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {objectives.map((objective, index) => (
              <div
                key={index}
                ref={setObjectiveRef(index)}
                className={cn(
                  'flex items-center gap-6 py-4 border-b border-border transition-all duration-500',
                  objectiveVisible[index] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className="text-sm text-muted-foreground font-mono">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-foreground">{objective}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16">
            Organizational Structure
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.role}
                ref={setTeamRef(index)}
                className={cn(
                  'card-mono text-center transition-all duration-500',
                  teamVisible[index] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-20 h-20 bg-secondary rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-foreground">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.department}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Exist Section */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16 text-primary-foreground">
            Why We Exist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {whyWeExist.map((item, index) => (
              <div
                key={item.title}
                ref={setWhyRef(index)}
                className={cn(
                  'text-center transition-all duration-500',
                  whyVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 border border-primary-foreground/30 rounded-sm mx-auto mb-6 flex items-center justify-center">
                  <item.icon size={32} strokeWidth={1} className="text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-primary-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-primary-foreground/70 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}