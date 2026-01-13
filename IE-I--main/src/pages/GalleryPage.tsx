import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { useScrollReveal, useScrollRevealMultiple } from '@/hooks/useScrollReveal';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Component as Hero2 } from '@/components/ui/hero-2';

const galleryCategories = [
  'All',
  'Workshops',
  'Seminars',
  'Conventions',
  'Industrial Visits',
  'Student Activities',
];

const galleryImages = [
  { id: 1, category: 'Workshops', name: 'Machine Learning Workshop', location: 'New Delhi', year: '2024', image: '/placeholder.svg' },
  { id: 2, category: 'Seminars', name: 'Sustainable Engineering Seminar', location: 'Mumbai', year: '2024', image: '/placeholder.svg' },
  { id: 3, category: 'Conventions', name: 'Annual Engineering Convention', location: 'Bangalore', year: '2023', image: '/placeholder.svg' },
  { id: 4, category: 'Industrial Visits', name: 'Tech Industry Tour', location: 'Hyderabad', year: '2023', image: '/placeholder.svg' },
  { id: 5, category: 'Student Activities', name: 'Robotics Competition', location: 'Chennai', year: '2023', image: '/placeholder.svg' },
  { id: 6, category: 'Workshops', name: 'IoT Development Workshop', location: 'Pune', year: '2023', image: '/placeholder.svg' },
  { id: 7, category: 'Seminars', name: 'AI in Engineering Seminar', location: 'Kolkata', year: '2023', image: '/placeholder.svg' },
  { id: 8, category: 'Conventions', name: 'Engineering Excellence Summit', location: 'Ahmedabad', year: '2022', image: '/placeholder.svg' },
  { id: 9, category: 'Industrial Visits', name: 'Manufacturing Plant Visit', location: 'Jaipur', year: '2022', image: '/placeholder.svg' },
  { id: 10, category: 'Student Activities', name: 'Hackathon 2022', location: 'Delhi', year: '2022', image: '/placeholder.svg' },
  { id: 11, category: 'Workshops', name: 'Embedded Systems Workshop', location: 'Bangalore', year: '2022', image: '/placeholder.svg' },
  { id: 12, category: 'Seminars', name: 'Future of Engineering', location: 'Mumbai', year: '2022', image: '/placeholder.svg' },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const { setRef: setImageRef, visibleItems: imageVisible } = useScrollRevealMultiple(galleryImages.length);

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const currentImageIndex = selectedImage !== null 
    ? filteredImages.findIndex(img => img.id === selectedImage)
    : -1;

  const handleImageClick = (imageId: number) => {
    setSelectedImage(imageId);
    setIsLightboxOpen(true);
  };

  const handlePrevious = () => {
    if (currentImageIndex > 0) {
      setSelectedImage(filteredImages[currentImageIndex - 1].id);
    } else {
      setSelectedImage(filteredImages[filteredImages.length - 1].id);
    }
  };

  const handleNext = () => {
    if (currentImageIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentImageIndex + 1].id);
    } else {
      setSelectedImage(filteredImages[0].id);
    }
  };

  const currentImage = filteredImages.find(img => img.id === selectedImage);

  // Keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen || selectedImage === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentImageIndex > 0) {
          setSelectedImage(filteredImages[currentImageIndex - 1].id);
        } else {
          setSelectedImage(filteredImages[filteredImages.length - 1].id);
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (currentImageIndex < filteredImages.length - 1) {
          setSelectedImage(filteredImages[currentImageIndex + 1].id);
        } else {
          setSelectedImage(filteredImages[0].id);
        }
      } else if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, selectedImage, currentImageIndex, filteredImages]);

  return (
    <Layout>
      {/* Hero Section */}
      <Hero2 />

      {/* Category Filter */}
      <section className="py-12 bg-background border-y border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {galleryCategories.map((category) => (
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

      {/* Gallery Grid */}
      <section id="gallery-grid" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                ref={setImageRef(index)}
                className={cn(
                  'group cursor-pointer transition-all duration-500',
                  imageVisible[index]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
                onClick={() => handleImageClick(image.id)}
              >
                <div className="relative overflow-hidden bg-muted aspect-[4/3] mb-4 group-hover:scale-[1.02] transition-transform duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-300">Event Image</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {image.name}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <span>{image.location}</span>
                    <span>•</span>
                    <span>{image.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-6xl w-full p-0 bg-background border border-border [&>button]:hidden">
          {currentImage && (
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center bg-background hover:bg-secondary border border-border transition-colors duration-300"
                aria-label="Close"
              >
                <X size={20} strokeWidth={1} className="text-foreground" />
              </button>

              {/* Image Container */}
              <div className="relative aspect-video bg-muted flex items-center justify-center">
                <div className="text-muted-foreground">Large Image View</div>
              </div>

              {/* Navigation Arrows */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center bg-background/80 hover:bg-background border border-border transition-colors duration-300"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} strokeWidth={1} className="text-foreground" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center bg-background/80 hover:bg-background border border-border transition-colors duration-300"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} strokeWidth={1} className="text-foreground" />
                  </button>
                </>
              )}

              {/* Image Info */}
              <div className="p-6 border-t border-border">
                <h3 className="text-2xl font-semibold tracking-tight mb-2">
                  {currentImage.name}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>{currentImage.location}</span>
                  <span>•</span>
                  <span>{currentImage.year}</span>
                  <span>•</span>
                  <span>{currentImage.category}</span>
                </div>
                {filteredImages.length > 1 && (
                  <div className="mt-4 text-sm text-muted-foreground">
                    {currentImageIndex + 1} of {filteredImages.length}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}

