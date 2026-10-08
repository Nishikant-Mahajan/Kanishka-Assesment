import { Minus, Plus, Trash } from '@phosphor-icons/react';
import { cn } from '../../utils/cn';

type StepperSize = 'sm' | 'md' | 'lg';

interface QuantityStepperProps {
  quantity: number;
  onIncrease: (e?: React.MouseEvent) => void;
  onDecrease: (e?: React.MouseEvent) => void;
  /** When quantity reaches 1 and user presses –, show trash icon instead of – */
  showTrashAtOne?: boolean;
  size?: StepperSize;
  className?: string;
}

const sizeMap: Record<StepperSize, { btn: string; count: string; icon: number }> = {
  sm: { btn: 'w-7 h-7',    count: 'min-w-[1.5rem] text-xs',  icon: 12 },
  md: { btn: 'w-8 h-8',    count: 'min-w-[1.75rem] text-sm', icon: 13 },
  lg: { btn: 'w-10 h-10',  count: 'min-w-[2rem] text-base',  icon: 15 },
};

export function QuantityStepper({
  quantity,
  onIncrease,
  onDecrease,
  showTrashAtOne = false,
  size = 'sm',
  className,
}: QuantityStepperProps) {
  const s = sizeMap[size];
  const isAtOne = quantity === 1;

  return (
    <div
      className={cn(
        'flex items-center rounded-xl border border-brand/30 bg-brand/10 overflow-hidden',
        className
      )}
      onClick={(e) => {
        // Prevent card link clicks from firing when tapping stepper
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {/* Decrease / trash */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDecrease(e);
        }}
        className={cn(
          s.btn,
          'flex items-center justify-center transition-all duration-150',
          'text-text-secondary hover:text-accent-rose hover:bg-accent-rose/15',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand'
        )}
        aria-label={isAtOne && showTrashAtOne ? 'Remove from cart' : 'Decrease quantity'}
      >
        {isAtOne && showTrashAtOne ? (
          <Trash size={s.icon} weight="bold" className="text-accent-rose/70" />
        ) : (
          <Minus size={s.icon} weight="bold" />
        )}
      </button>

      {/* Count */}
      <span
        className={cn(
          s.count,
          'text-center font-bold text-text-primary select-none px-1 leading-none'
        )}
      >
        {quantity}
      </span>

      {/* Increase */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onIncrease(e);
        }}
        className={cn(
          s.btn,
          'flex items-center justify-center transition-all duration-150',
          'text-text-secondary hover:text-brand hover:bg-brand/20',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand'
        )}
        aria-label="Increase quantity"
      >
        <Plus size={s.icon} weight="bold" />
      </button>
    </div>
  );
}
