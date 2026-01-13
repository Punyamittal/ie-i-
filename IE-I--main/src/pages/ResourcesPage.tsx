import { lazy, Suspense } from 'react';
import { Layout } from '@/components/Layout';
import { useScrollReveal, useScrollRevealMultiple } from '@/hooks/useScrollReveal';

const HeroAscii = lazy(() => import('@/components/ui/hero-ascii'));
import { 
  FileText, 
  BookOpen, 
  Download, 
  ExternalLink,
  Lightbulb,
  GraduationCap,
  FileCheck,
  Book
} from 'lucide-react';
import { cn } from '@/lib/utils';

const resourceCategories = [
  {
    title: 'Study Materials',
    description: 'Access comprehensive PDFs, lecture notes, and study guides for various engineering disciplines.',
    icon: BookOpen,
  },
  {
    title: 'Examination Resources',
    description: 'Find syllabi, previous year papers, circulars, and examination guidelines for AMIE and other certifications.',
    icon: FileCheck,
  },
  {
    title: 'Technical Journals & Publications',
    description: 'Browse through research papers, technical journals, and publications from leading engineering institutions.',
    icon: Book,
  },
];

const downloadables = [
  { title: 'Previous Year Papers', type: 'PDF', size: '2.4 MB' },
  { title: 'AMIE Syllabus PDFs', type: 'PDF', size: '1.8 MB' },
  { title: 'IE(I) Circulars', type: 'PDF', size: '950 KB' },
  { title: 'Technical Guidelines', type: 'PDF', size: '3.2 MB' },
  { title: 'Code of Ethics', type: 'PDF', size: '1.1 MB' },
  { title: 'Membership Application Form', type: 'PDF', size: '520 KB' },
];

const externalLinks = [
  { title: 'NPTEL', description: 'National Programme on Technology Enhanced Learning', url: 'https://nptel.ac.in' },
  { title: 'Coursera Engineering', description: 'Online courses from top universities', url: 'https://www.coursera.org' },
  { title: 'GitHub Student Resources', description: 'Open source projects and learning materials', url: 'https://education.github.com' },
  { title: 'Arduino Documentation', description: 'Electronics and embedded systems resources', url: 'https://www.arduino.cc' },
  { title: 'Government Engineering Portals', description: 'Official engineering resources and updates', url: '#' },
];

const projectIdeas = [
  {
    title: 'IoT-Based Smart Home System',
    description: 'Design and implement a comprehensive home automation system using IoT sensors and microcontrollers.',
  },
  {
    title: 'Renewable Energy Monitoring Dashboard',
    description: 'Real-time monitoring system for solar and wind energy generation with data visualization.',
  },
  {
    title: 'Automated Waste Management System',
    description: 'AI-powered waste sorting and recycling system using computer vision and robotics.',
  },
  {
    title: 'Blockchain-Based Academic Credential Verification',
    description: 'Secure and tamper-proof system for verifying academic certificates using blockchain technology.',
  },
  {
    title: 'Smart Traffic Management System',
    description: 'Intelligent traffic control using machine learning and real-time data analysis.',
  },
  {
    title: 'Water Quality Monitoring System',
    description: 'IoT-based solution for continuous monitoring of water quality parameters in real-time.',
  },
];

export default function ResourcesPage() {
  const { ref: categoriesRef, isVisible: categoriesVisible } = useScrollReveal();
  const { setRef: setCategoryRef, visibleItems: categoryVisible } = useScrollRevealMultiple(3);
  const { ref: downloadsRef, isVisible: downloadsVisible } = useScrollReveal();
  const { setRef: setLinkRef, visibleItems: linkVisible } = useScrollRevealMultiple(5);
  const { setRef: setProjectRef, visibleItems: projectVisible } = useScrollRevealMultiple(6);

  return (
    <Layout>
      {/* Hero Section */}
      <Suspense fallback={
        <main className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>
        </main>
      }>
        <HeroAscii />
      </Suspense>

      {/* Resource Categories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div
            ref={categoriesRef}
            className={cn(
              'grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700',
              categoriesVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            )}
          >
            {resourceCategories.map((category, index) => (
              <div
                key={category.title}
                ref={setCategoryRef(index)}
                className={cn(
                  'card-mono group transition-all duration-500',
                  categoryVisible[index]
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <category.icon
                  size={32}
                  strokeWidth={1}
                  className="text-foreground mb-6 group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="text-xl font-semibold tracking-tight mb-3">
                  {category.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadables Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">
            Downloadable Resources
          </h2>
          <div
            ref={downloadsRef}
            className={cn(
              'space-y-0 border border-border bg-card transition-all duration-700',
              downloadsVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            )}
          >
            {downloadables.map((item, index) => (
              <div
                key={item.title}
                className={cn(
                  'flex items-center justify-between p-6 border-b border-border last:border-b-0 group hover:bg-secondary transition-colors duration-300',
                  index === 0 && 'border-t-0'
                )}
              >
                <div className="flex items-center gap-4 flex-1">
                  <FileText size={20} strokeWidth={1} className="text-foreground flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium tracking-tight mb-1 group-hover:underline transition-all duration-300">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{item.type}</span>
                      <span>•</span>
                      <span>{item.size}</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-foreground hover:underline transition-all duration-300">
                  <Download size={18} strokeWidth={1} />
                  <span className="text-sm font-medium">Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* External Links Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">
            External Learning Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {externalLinks.map((link, index) => (
              <a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                ref={setLinkRef(index)}
                className={cn(
                  'card-mono group transition-all duration-500',
                  linkVisible[index]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <ExternalLink size={24} strokeWidth={1} className="text-foreground group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-2 group-hover:underline transition-all duration-300">
                  {link.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {link.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Project Ideas Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">
            Project Ideas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectIdeas.map((project, index) => (
              <div
                key={project.title}
                ref={setProjectRef(index)}
                className={cn(
                  'card-mono group transition-all duration-500',
                  projectVisible[index]
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <Lightbulb size={24} strokeWidth={1} className="text-foreground flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold tracking-tight mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

