import { cn } from '@/lib/utils';

export interface ProfileCardProps {
  name: string;
  role: string;
  description?: string;
  tags?: string[];
  imageUrl?: string;
  imageAlt?: string;
  className?: string;
}

export function ProfileCard({
  name,
  role,
  description,
  tags = [],
  imageUrl,
  imageAlt,
  className,
}: ProfileCardProps) {
  // Generate gradient based on name initials for consistent placeholder
  const getGradientColors = (name: string) => {
    const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
    const hue = Math.abs(hash % 360);
    return {
      from: `hsl(${hue}, 30%, 20%)`,
      to: `hsl(${hue}, 25%, 15%)`,
    };
  };

  const gradient = getGradientColors(name);

  return (
    <div
      className={cn(
        'group relative flex flex-col h-full min-h-[500px]',
        'bg-card border border-border/50 rounded-lg',
        'overflow-hidden',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20',
        'hover:border-primary/50',
        'backdrop-blur-sm',
        className
      )}
    >
      {/* Top Image Section */}
      <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={imageAlt || name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div
            className="w-full h-full relative"
            style={{
              background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
            }}
          >
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
            {/* Initials in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-white/20">
                {name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)}
              </span>
            </div>
          </div>
        )}
        {/* Subtle gradient overlay at bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-6 space-y-4">
        {/* Name - Bold, White Text */}
        <h3 className="text-xl font-bold text-foreground leading-tight font-inter">
          {name}
        </h3>

        {/* Role/Position - Accent Color, Smaller Text */}
        <p className="text-sm font-medium text-primary/90 font-poppins">
          {role}
        </p>

        {/* Description Paragraph */}
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed flex-1 font-montserrat">
            {description}
          </p>
        )}

        {/* Tag/Skill Badges at Bottom */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={cn(
                  'inline-flex items-center px-3 py-1 rounded-full',
                  'text-xs font-medium',
                  'border border-border/50',
                  'bg-secondary/30',
                  'text-muted-foreground',
                  'transition-all duration-200',
                  'group-hover:border-primary/30',
                  'group-hover:text-foreground/80',
                  'group-hover:bg-primary/5',
                  'backdrop-blur-sm'
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div
        className={cn(
          'absolute inset-0 rounded-lg',
          'opacity-0 group-hover:opacity-100',
          'transition-opacity duration-300',
          'pointer-events-none',
          'bg-gradient-to-br from-primary/5 via-transparent to-transparent'
        )}
      />
    </div>
  );
}
