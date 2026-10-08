import { cn } from '../../utils/cn';

type BadgeVariant = 'brand' | 'emerald' | 'amber' | 'rose' | 'muted';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  brand:   'bg-brand/15 text-brand-light border border-brand/20',
  emerald: 'bg-accent-emerald/15 text-accent-emerald border border-accent-emerald/20',
  amber:   'bg-accent-amber/15 text-accent-amber border border-accent-amber/20',
  rose:    'bg-accent-rose/15 text-accent-rose border border-accent-rose/20',
  muted:   'bg-bg-elevated text-text-secondary border border-border',
};

export function Badge({
  children,
  variant = 'muted',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
