import { useState, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Mail, Linkedin, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import RainingLetters from '@/components/ui/modern-animated-hero-section';
import supabase from '@/lib/supabase';

const contactInfo = [
  { 
    icon: Mail, 
    label: 'Email', 
    value: 'iei.vitcc@gmail.com',
    link: 'mailto:iei.vitcc@gmail.com'
  },
  { 
    icon: Linkedin, 
    label: 'LinkedIn', 
    value: 'Institution of Engineers (India) | VIT Chennai',
    link: 'https://www.linkedin.com/company/institution-of-engineers-india-vit-chennai/'
  },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rippleStyle, setRippleStyle] = useState<{ left: number; top: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { ref: formRef, isVisible: formVisible } = useScrollReveal();
  const { ref: infoRef, isVisible: infoVisible } = useScrollReveal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          message: formData.message
        });

      if (error) {
        throw error;
      }

      toast({
        title: 'Message Sent',
        description: 'Thank you for reaching out. We will get back to you soon.',
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: 'Message Not Sent',
        description: error.message || 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setRippleStyle({
        left: e.clientX - rect.left,
        top: e.clientY - rect.top,
      });
      setTimeout(() => setRippleStyle(null), 600);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative">
        <RainingLetters />
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div
              ref={formRef}
              className={cn(
                'transition-all duration-700',
                formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              )}
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
                Get in Touch
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-background border border-border focus:border-foreground focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-background border border-border focus:border-foreground focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-background border border-border focus:border-foreground focus:outline-none transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  ref={buttonRef}
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleRipple}
                  className="relative overflow-hidden w-full md:w-auto px-8 py-3 bg-primary text-primary-foreground font-medium tracking-wide flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
                >
                  {rippleStyle && (
                    <span
                      className="absolute w-4 h-4 bg-primary-foreground/30 rounded-full animate-ripple"
                      style={{ left: rippleStyle.left, top: rippleStyle.top }}
                    />
                  )}
                  <Send size={18} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div
              ref={infoRef}
              className={cn(
                'transition-all duration-700',
                infoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              )}
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
                Contact Information
              </h2>
              <div className="space-y-6 mb-12">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 border border-border flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} strokeWidth={1} className="text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground font-medium hover:text-primary transition-colors underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Faculty Coordinators */}
              <div className="card-mono space-y-4">
                <h3 className="text-lg font-semibold mb-4">Faculty Coordinators</h3>
                <div>
                  <p className="text-foreground font-medium">S. Vigneshwari</p>
                  <a
                    href="mailto:s.vigneshwari@vit.ac.in"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors underline"
                  >
                    s.vigneshwari@vit.ac.in
                  </a>
                </div>
                <div>
                  <p className="text-foreground font-medium">P. Sandhya</p>
                  <a
                    href="mailto:sandhya.p@vit.ac.in"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors underline"
                  >
                    sandhya.p@vit.ac.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}