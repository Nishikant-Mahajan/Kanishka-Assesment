import { SortAscending, ArrowsDownUp, Funnel } from '@phosphor-icons/react';
import { CATEGORIES } from '../../data/products';
import type { FilterState, SortOption } from '../../types';
import { cn } from '../../utils/cn';

interface FilterBarProps {
  filters: FilterState;
  onUpdate: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onReset: () => void;
  resultCount: number;
  activeFilterCount: number;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'default',    label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc',label: 'Highest Rated' },
  { value: 'name-asc',   label: 'Name A–Z' },
];

export function FilterBar({
  filters,
  onUpdate,
  onReset,
  resultCount,
  activeFilterCount,
}: FilterBarProps) {
  return (
    <div className="space-y-4">
      {/* Category pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-text-muted uppercase tracking-widest mr-1">
          Category
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onUpdate('category', cat as FilterState['category'])}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
              filters.category === cat
                ? 'bg-brand text-white shadow-glowSm'
                : 'bg-bg-elevated text-text-secondary border border-border hover:border-border-light hover:text-text-primary'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort + Results count row */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-text-secondary">
          <span className="text-text-primary font-semibold">{resultCount}</span>{' '}
          {resultCount === 1 ? 'product' : 'products'}
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Sort */}
          <div className="relative flex items-center">
            <ArrowsDownUp
              size={14}
              weight="bold"
              className="absolute left-3 text-text-muted pointer-events-none"
            />
            <select
              value={filters.sortBy}
              onChange={(e) => onUpdate('sortBy', e.target.value as SortOption)}
              className="input pl-8 pr-8 py-2 text-xs min-w-[170px] appearance-none"
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-bg-secondary">
                  {o.label}
                </option>
              ))}
            </select>
            <SortAscending
              size={14}
              weight="bold"
              className="absolute right-3 text-text-muted pointer-events-none"
            />
          </div>

          {/* Reset button */}
          {activeFilterCount > 0 && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-accent-rose/10 text-accent-rose border border-accent-rose/20 hover:bg-accent-rose/20 transition-all duration-200"
            >
              <Funnel size={13} weight="fill" />
              Clear ({activeFilterCount})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
