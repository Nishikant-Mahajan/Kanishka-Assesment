import { WarningCircle, ArrowCounterClockwise } from '@phosphor-icons/react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-accent-rose/10 border border-accent-rose/20 flex items-center justify-center mb-6">
        <WarningCircle size={36} weight="duotone" className="text-accent-rose" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">Something went wrong</h3>
      <p className="text-sm text-text-secondary max-w-xs mb-6">
        {message ?? 'An unexpected error occurred. Please try again.'}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          <ArrowCounterClockwise size={16} weight="bold" />
          Try again
        </button>
      )}
    </div>
  );
}
