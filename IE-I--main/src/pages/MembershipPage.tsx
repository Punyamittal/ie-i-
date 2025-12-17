import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useScrollReveal, useScrollRevealMultiple } from '@/hooks/useScrollReveal';
import { 
  Award, 
  Users, 
  BookOpen, 
  Network, 
  FileText, 
  TrendingUp,
  GraduationCap,
  Building2,
  Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import MinimalHero from '@/components/ui/hero-minimalism';

const membershipCategories = [
  {
    title: 'Student Member (SMIE)',
    description: 'For engineering students pursuing their degree. Access to student resources, workshops, and competitions.',
    icon: GraduationCap,
  },
  {
    title: 'Associate Member (AMIE)',
    description: 'For engineering graduates. Professional recognition, networking opportunities, and technical resources.',
    icon: Briefcase,
  },
  {
    title: 'Corporate Member (MIE/FIE)',
    description: 'For established professionals and organizations. Premium benefits, certifications, and industry connections.',
    icon: Building2,
  },
];

const benefits = [
  { title: 'Professional Recognition', icon: Award },
  { title: 'Access to Events', icon: Users },
  { title: 'Technical Resources', icon: BookOpen },
  { title: 'Networking', icon: Network },
  { title: 'Certifications', icon: FileText },
  { title: 'Career Growth', icon: TrendingUp },
];

export default function MembershipPage() {
  const { ref: categoriesRef, isVisible: categoriesVisible } = useScrollReveal();
  const { setRef: setBenefitRef, visibleItems: benefitVisible } = useScrollRevealMultiple(6);
  const { ref: formRef, isVisible: formVisible } = useScrollReveal();

  const [formData, setFormData] = useState({
    fullName: '',
    department: '',
    email: '',
    phone: '',
    category: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, category: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <MinimalHero />

      {/* Membership Categories */}
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
            {membershipCategories.map((category, index) => (
              <div
                key={category.title}
                className="card-mono group cursor-pointer"
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

      {/* Benefits Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">
            Membership Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                ref={setBenefitRef(index)}
                className={cn(
                  'flex items-start gap-4 p-6 border border-border bg-card transition-all duration-500',
                  benefitVisible[index]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <benefit.icon
                  size={24}
                  strokeWidth={1}
                  className="text-foreground flex-shrink-0 mt-1"
                />
                <h3 className="text-lg font-medium tracking-tight">
                  {benefit.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Form */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-2xl">
          <div
            ref={formRef}
            className={cn(
              'transition-all duration-700',
              formVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            )}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center">
              Apply for Membership
            </h2>
            <div className="w-24 h-[1px] bg-border mx-auto mb-12" />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="border-border focus:border-foreground transition-colors"
                />
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium mb-2">
                  Department / Discipline
                </label>
                <Input
                  id="department"
                  name="department"
                  type="text"
                  required
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Science, Mechanical Engineering"
                  className="border-border focus:border-foreground transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-border focus:border-foreground transition-colors"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="border-border focus:border-foreground transition-colors"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">
                  Membership Category
                </label>
                <Select value={formData.category} onValueChange={handleSelectChange}>
                  <SelectTrigger className="border-border focus:border-foreground transition-colors">
                    <SelectValue placeholder="Select membership category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smie">Student Member (SMIE)</SelectItem>
                    <SelectItem value="amie">Associate Member (AMIE)</SelectItem>
                    <SelectItem value="mie">Corporate Member (MIE/FIE)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full mt-8 transition-transform duration-300 hover:scale-[1.02]"
              >
                Apply for Membership
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

