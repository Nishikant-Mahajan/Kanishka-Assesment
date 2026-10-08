import { useProducts } from '../hooks/useProducts';
import { ProductGrid } from '../components/product/ProductGrid';
import { SearchBar } from '../components/product/SearchBar';
import { FilterBar } from '../components/product/FilterBar';
import { Toast, useToast } from '../components/ui/Toast';

export function ShopPage() {
  const {
    products,
    filters,
    isLoading,
    error,
    updateFilter,
    resetFilters,
    activeFilterCount,
    totalCount,
  } = useProducts();

  const { toast, show, dismiss } = useToast();

  const handleAddToCart = (name: string) => {
    show(`"${name}" added to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Hero section */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
          The Shop
        </h1>
        <p className="text-text-secondary text-base">
          {totalCount} carefully curated products across {7} categories.
        </p>
      </div>

      {/* Search */}
      <SearchBar
        value={filters.search}
        onChange={(v) => updateFilter('search', v)}
        className="max-w-xl"
      />

      {/* Filters */}
      <FilterBar
        filters={filters}
        onUpdate={updateFilter}
        onReset={resetFilters}
        resultCount={products.length}
        activeFilterCount={activeFilterCount}
      />

      {/* Grid */}
      <ProductGrid
        products={products}
        isLoading={isLoading}
        error={error}
        onAddToCart={handleAddToCart}
        onReset={activeFilterCount > 0 ? resetFilters : undefined}
        hasActiveFilters={activeFilterCount > 0}
      />

      <Toast message={toast.message} visible={toast.visible} onDismiss={dismiss} />
    </div>
  );
}
