import { Layout } from '@/components/Layout';
import { ProfileCard } from '@/components/ProfileCard';
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

// Organizational Structure Data - Flattened and Reordered
interface TeamMember {
  name: string;
  role: string;
  department?: string;
  description?: string;
  tags?: string[];
  imageUrl?: string;
}

// All team members in a single array, ordered as requested:
// 1. Faculty Coordinators first
// 2. Then Chairperson, Vice Chairperson
// 3. Then Secretary
// 4. Then the rest
const allTeamMembers: TeamMember[] = [
  // Faculty Coordinators (First)
  { 
    name: 'S. Vigneshwari', 
    role: 'Faculty Coordinator', 
    department: 'Faculty',
    description: 'Facilitating communication between students and faculty.',
    tags: ['Faculty Relations', 'Mentorship', 'Guidance'],
  },
  { 
    name: 'P. Sandhya', 
    role: 'Faculty Coordinator', 
    department: 'Faculty',
    description: 'Supporting academic initiatives and student development.',
    tags: ['Academic Support', 'Mentorship', 'Development'],
  },
  // Chairperson and Vice Chairperson
  { 
    name: 'Ayush Upadhya', 
    role: 'Chairperson',
    description: 'Leading the organization with vision and strategic direction.',
    tags: ['Leadership', 'Strategy', 'Management'],
  },
  { 
    name: 'Amritesh S. M.', 
    role: 'Vice Chairperson',
    description: 'Supporting organizational goals and coordinating key initiatives.',
    tags: ['Coordination', 'Leadership'],
  },
  // Secretary
  { 
    name: 'Punya Mittal', 
    role: 'Secretary',
    description: 'Managing documentation and administrative operations.',
    tags: ['Administration', 'Documentation'],
  },
  { 
    name: 'Mainak M.', 
    role: 'Secretary',
    description: 'Overseeing organizational communications and records.',
    tags: ['Communication', 'Records'],
  },
  { 
    name: 'Aastha Gupta', 
    role: 'Secretary',
    description: 'Coordinating meetings and maintaining organizational records.',
    tags: ['Coordination', 'Records'],
  },
  // Rest of the team
  { 
    name: 'Giri V. D.', 
    role: 'Treasurer',
    description: 'Managing finances and budget allocation for club activities.',
    tags: ['Finance', 'Budget', 'Management'],
  },
  { 
    name: 'Sahil Poply', 
    role: 'Technical Head', 
    department: 'Technical',
    description: 'Leading technical initiatives and innovation projects.',
    tags: ['Technology', 'Innovation', 'Development'],
  },
  { 
    name: 'Shreyas Kumar', 
    role: 'Technical Head', 
    department: 'Technical',
    description: 'Driving technical excellence and knowledge sharing.',
    tags: ['Technology', 'Engineering', 'Mentorship'],
  },
  { 
    name: 'Garv Bansal', 
    role: 'Event Coordination Head', 
    department: 'Events',
    description: 'Planning and executing major club events and competitions.',
    tags: ['Event Planning', 'Management', 'Coordination'],
  },
  { 
    name: 'Vaibhav Dwivedi', 
    role: 'Event Coordination Head', 
    department: 'Events',
    description: 'Organizing workshops, seminars, and networking events.',
    tags: ['Events', 'Workshops', 'Networking'],
  },
  { 
    name: 'Ananya Sani', 
    role: 'Media & Creative', 
    department: 'Media & Creative',
    description: 'Creating engaging content and managing digital presence.',
    tags: ['Content Creation', 'Design', 'Social Media'],
  },
  { 
    name: 'Pushkar Singhani', 
    role: 'Media & Creative', 
    department: 'Media & Creative',
    description: 'Designing visual assets and creative campaigns.',
    tags: ['Graphic Design', 'Creative', 'Branding'],
  },
  { 
    name: 'Utsav Gautam', 
    role: 'Logistics and Publicity', 
    department: 'Logistics',
    description: 'Managing event logistics and resource allocation.',
    tags: ['Logistics', 'Operations', 'Planning'],
  },
  { 
    name: 'Vismit Bhat', 
    role: 'Logistics and Publicity', 
    department: 'Logistics',
    description: 'Handling publicity campaigns and outreach efforts.',
    tags: ['Publicity', 'Marketing', 'Outreach'],
  },
  { 
    name: 'Aryaman Kumar Singh', 
    role: 'Documentation', 
    department: 'Documentation',
    description: 'Maintaining comprehensive records and documentation.',
    tags: ['Documentation', 'Records', 'Archiving'],
  },
  { 
    name: 'Kamakshi Vashistha', 
    role: 'Documentation', 
    department: 'Documentation',
    description: 'Creating and managing organizational documentation.',
    tags: ['Writing', 'Documentation', 'Content'],
  },
  { 
    name: 'Vaibhav Raj', 
    role: 'Outreach', 
    department: 'Outreach',
    description: 'Building partnerships and expanding club network.',
    tags: ['Partnerships', 'Networking', 'Outreach'],
  },
  { 
    name: 'Sharanya Ahire', 
    role: 'Outreach', 
    department: 'Outreach',
    description: 'Connecting with industry professionals and alumni.',
    tags: ['Industry Relations', 'Networking', 'Alumni'],
  },
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
  const { setRef: setTeamRef, visibleItems: teamVisible } = useScrollRevealMultiple(allTeamMembers.length);
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

      {/* Organizational Structure Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16 text-white">
            Organizational Structure
          </h2>
          
          {/* All Profile Cards in Single Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allTeamMembers.map((member, index) => (
              <div
                key={`${member.name}-${index}`}
                ref={setTeamRef(index)}
                className={cn(
                  'transition-all duration-500',
                  teamVisible[index] 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-8 scale-95'
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <ProfileCard
                  name={member.name}
                  role={member.role}
                  description={member.description}
                  tags={member.tags}
                  imageUrl={member.imageUrl}
                  imageAlt={`${member.name} - ${member.role}`}
                />
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