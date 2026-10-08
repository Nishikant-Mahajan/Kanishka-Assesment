import { Star } from '@phosphor-icons/react';
import { cn } from '../../utils/cn';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md';
  showCount?: boolean;
}

export function StarRating({
  rating,
  reviewCount,
  size = 'sm',
  showCount = true,
}: StarRatingProps) {
  const starSize = size === 'sm' ? 13 : 16;
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fill = Math.min(1, Math.max(0, rating - i));
    return fill;
  });

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {stars.map((fill, i) => (
          <span key={i} className="relative inline-block" style={{ width: starSize, height: starSize }}>
            {/* Background star */}
            <Star
              size={starSize}
              weight="fill"
              className="text-bg-elevated absolute inset-0"
            />
            {/* Filled star with clip */}
            {fill > 0 && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star
                  size={starSize}
                  weight="fill"
                  className="text-accent-amber absolute inset-0"
                />
              </span>
            )}
          </span>
        ))}
      </div>
      <span
        className={cn(
          'font-semibold text-text-primary',
          size === 'sm' ? 'text-xs' : 'text-sm'
        )}
      >
        {rating.toFixed(1)}
      </span>
      {showCount && reviewCount !== undefined && (
        <span className={cn('text-text-muted', size === 'sm' ? 'text-xs' : 'text-sm')}>
          ({reviewCount >= 1000 ? `${(reviewCount / 1000).toFixed(1)}k` : reviewCount})
        </span>
      )}
    </div>
  );
}
