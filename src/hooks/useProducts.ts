import { useState, useEffect, useMemo } from 'react';
import { products as allProducts } from '../data/products';
import type { FilterState, Product } from '../types';

const DEFAULT_FILTER: FilterState = {
  search: '',
  category: 'All',
  sortBy: 'default',
  minPrice: 0,
  maxPrice: 9999,
};

export function useProducts() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate an async data load (mimics real-world API call)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // Simulate potential error scenario (kept off — products always load)
        setIsLoading(false);
      } catch {
        setError('Failed to load products. Please try again.');
        setIsLoading(false);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo<Product[]>(() => {
    let result = [...allProducts];

    // Search filter
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (filters.category !== 'All') {
      result = result.filter((p) => p.category === filters.category);
    }

    // Price range filter
    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    // Sorting
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured first, then by id
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }

    return result;
  }, [filters]);

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(DEFAULT_FILTER);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category !== 'All') count++;
    if (filters.sortBy !== 'default') count++;
    if (filters.minPrice > 0 || filters.maxPrice < 9999) count++;
    return count;
  }, [filters]);

  return {
    products: filtered,
    filters,
    isLoading,
    error,
    updateFilter,
    resetFilters,
    activeFilterCount,
    totalCount: allProducts.length,
  };
}
