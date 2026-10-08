import { useRef } from 'react';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { cn } from '../../utils/cn';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search products, brands, categories…',
  className,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={cn('relative flex items-center', className)}>
      <MagnifyingGlass
        size={17}
        weight="bold"
        className="absolute left-3.5 text-text-muted pointer-events-none shrink-0"
      />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input pl-10 pr-10"
        aria-label="Search products"
        autoComplete="off"
        spellCheck={false}
      />
      {value && (
        <button
          onClick={() => {
            onChange('');
            inputRef.current?.focus();
          }}
          className="absolute right-3 text-text-muted hover:text-text-primary transition-colors"
          aria-label="Clear search"
        >
          <X size={15} weight="bold" />
        </button>
      )}
    </div>
  );
}
