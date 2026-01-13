import { lazy, Suspense } from 'react';
import { Layout } from '@/components/Layout';
import { useScrollReveal, useScrollRevealMultiple } from '@/hooks/useScrollReveal';

const HeroAscii = lazy(() => import('@/components/ui/hero-ascii'));
import { 
  FileText, 
  BookOpen, 
  ExternalLink,
  GraduationCap,
  Code,
  Wrench,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';

const downloadables = [
  { 
    title: 'Examination Rules & Syllabus (Sections A & B)', 
    description: 'Official syllabus and rules PDF for the AMIE examinations (Section A and Section B). Includes subject structure and exam regulations.',
    type: 'PDF', 
    url: 'https://www.ieindia.org/WebUI/ajax/Downloads/WebUI_PDF/Academics_Pdf/Rules_Syllabi.pdf'
  },
  { 
    title: 'Study Material Request Form (Section B)', 
    description: 'Official form for procuring Section B study materials.',
    type: 'PDF', 
    url: 'https://www.ieindia.org/webui/ajax/Downloads/WebUI_PDF/STUDY_MATERIAL_Section_B.pdf?V20210224.1'
  },
  { 
    title: 'Section B Registration Application Form', 
    description: 'Form required to register for Section B examination.',
    type: 'PDF', 
    url: 'https://www.ieindia.org/webui/ajax/Downloads/WebUI_PDF/Section_B_Registration_Application_Form.pdf?v20210419.1'
  },
  { 
    title: 'Re-Registration Form (Sections A & B)', 
    description: 'Form for candidates who need to re-register for the AMIE exam.',
    type: 'PDF', 
    url: 'https://www.ieindia.org/webui/ajax/Downloads/WebUI_PDF/Re_registration_Section_A_B_Examination.pdf?V20210224.1'
  },
  { 
    title: 'Change Branch / Optional Subjects Form (Section B)', 
    description: 'Form for changing optional subjects or branch in Section B.',
    type: 'PDF', 
    url: 'https://www.ieindia.org/webui/ajax/Downloads/WebUI_PDF/CHANGE_BRANCH_Subject_Section_B.pdf?V20210224.1'
  },
  { 
    title: 'List of Laboratory Experiments', 
    description: 'Official list of prescribed lab experiments for AMIE.',
    type: 'PDF', 
    url: 'https://www.ieindia.org/webui/ajax/Downloads/WebUI_PDF/Lab_Experiments_List.pdf'
  },
  { 
    title: 'Inspection of Answer Scripts', 
    description: 'Form to request inspection of answer scripts for Sections A & B.',
    type: 'PDF', 
    url: 'https://www.ieindia.org/webui/ajax/Downloads/WebUI_PDF/Inspection_AnswerScripts_Section_A_B_Examination.PDF'
  },
];

const externalLinks = [
  { 
    title: 'NPTEL', 
    subtitle: 'National Programme on Technology Enhanced Learning',
    description: 'Official platform for engineering and STEM courses created by IITs & IISc. Provides high-quality online courses, lecture videos, and certification options.',
    url: 'https://nptel.ac.in/',
    icon: GraduationCap
  },
  { 
    title: 'Coursera', 
    subtitle: 'Engineering & Computer Science Courses',
    description: 'Online courses from top universities and industry partners. Offers courses in software engineering, AI, robotics, machine learning, and more.',
    url: 'https://www.coursera.org/browse/engineering',
    icon: BookOpen
  },
  { 
    title: 'GitHub Student Developer Pack', 
    subtitle: 'Free Developer Tools & Learning Resources',
    description: 'Free developer tools and learning resources for students. Includes access to professional software, cloud credits, coding tools, and more.',
    url: 'https://education.github.com/pack',
    icon: Code
  },
  { 
    title: 'Arduino Documentation', 
    subtitle: 'Official Arduino Boards & Embedded Learning',
    description: 'Official documentation for Arduino boards and embedded learning. Great resource for electronics, embedded systems, and IoT projects.',
    url: 'https://www.arduino.cc/en/Guide/HomePage',
    icon: Wrench
  },
  { 
    title: 'SWAYAM', 
    subtitle: 'Government Online Learning Platform',
    description: 'Indian government MOOC portal covering engineering and more. Offers free online courses across technical, academic, and skill sectors.',
    url: 'https://swayam.gov.in',
    icon: Globe
  },
];

export default function ResourcesPage() {
  const { setRef: setDownloadRef, visibleItems: downloadVisible } = useScrollRevealMultiple(downloadables.length);
  const { setRef: setLinkRef, visibleItems: linkVisible } = useScrollRevealMultiple(externalLinks.length);

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

      {/* Downloadables Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">
            Downloadable Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloadables.map((item, index) => (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                ref={setDownloadRef(index)}
                className={cn(
                  'card-mono group transition-all duration-500 cursor-pointer hover:shadow-lg',
                  downloadVisible[index]
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <FileText size={24} strokeWidth={1} className="text-foreground flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold tracking-tight mb-2 group-hover:underline transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="px-2 py-1 bg-secondary border border-border rounded">
                        {item.type}
                      </span>
                      <ExternalLink size={14} strokeWidth={1} className="text-foreground opacity-60" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* External Learning Resources Section */}
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
                  'card-mono group transition-all duration-500 cursor-pointer hover:shadow-lg',
                  linkVisible[index]
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <link.icon size={24} strokeWidth={1} className="text-foreground flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold tracking-tight mb-1 group-hover:underline transition-all duration-300">
                      {link.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 font-medium">
                      {link.subtitle}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {link.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ExternalLink size={14} strokeWidth={1} className="text-foreground opacity-60" />
                      <span className="opacity-60">Visit Resource</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
}

