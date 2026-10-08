import { MagnifyingGlass, FunnelSimple, ShoppingCart } from '@phosphor-icons/react';
import { cn } from '../../utils/cn';

type EmptyStateVariant = 'search' | 'filter' | 'cart';

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const iconMap = {
  search: MagnifyingGlass,
  filter: FunnelSimple,
  cart:   ShoppingCart,
};

export function EmptyState({
  variant = 'search',
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  const Icon = iconMap[variant];

  const defaults = {
    search: {
      title: 'No products found',
      description: 'We couldn\'t find anything matching your search. Try different keywords.',
    },
    filter: {
      title: 'Nothing here',
      description: 'No products match the current filters. Try adjusting or clearing them.',
    },
    cart: {
      title: 'Your cart is empty',
      description: 'Looks like you haven\'t added anything yet. Go explore the shop.',
    },
  };

  const t = title ?? defaults[variant].title;
  const d = description ?? defaults[variant].description;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-20 px-6 text-center',
        className
      )}
    >
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-bg-elevated flex items-center justify-center border border-border">
          <Icon size={36} weight="duotone" className="text-text-muted" />
        </div>
        {/* decorative ring */}
        <div className="absolute -inset-2 rounded-[1.6rem] border border-dashed border-border-light opacity-40" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">{t}</h3>
      <p className="text-sm text-text-secondary max-w-xs">{d}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
