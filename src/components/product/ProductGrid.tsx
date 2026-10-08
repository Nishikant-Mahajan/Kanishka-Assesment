import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from '../ui/Skeleton';
import { EmptyState } from '../ui/EmptyState';
import { ErrorState } from '../ui/ErrorState';
import type { Product } from '../../types';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  onAddToCart?: (name: string) => void;
  onReset?: () => void;
  hasActiveFilters?: boolean;
}

export function ProductGrid({
  products,
  isLoading,
  error,
  onAddToCart,
  onReset,
  hasActiveFilters,
}: ProductGridProps) {
  if (error) {
    return <ErrorState message={error} />;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        variant={hasActiveFilters ? 'filter' : 'search'}
        action={
          onReset ? (
            <button onClick={onReset} className="btn-primary">
              Clear filters
            </button>
          ) : undefined
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
