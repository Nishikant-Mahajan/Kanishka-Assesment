import { useEffect, useState } from 'react';
import { CheckCircle, X } from '@phosphor-icons/react';
import { cn } from '../../utils/cn';

interface ToastProps {
  message: string;
  visible: boolean;
  onDismiss: () => void;
}

export function Toast({ message, visible, onDismiss }: ToastProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      const t = setTimeout(onDismiss, 2800);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [visible, onDismiss]);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3',
        'bg-bg-elevated border border-border rounded-xl px-4 py-3 shadow-card',
        'transition-all duration-300',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      )}
    >
      <CheckCircle size={18} weight="fill" className="text-accent-emerald shrink-0" />
      <span className="text-sm font-medium text-text-primary whitespace-nowrap">{message}</span>
      <button
        onClick={onDismiss}
        className="ml-1 text-text-muted hover:text-text-primary transition-colors"
        aria-label="Dismiss"
      >
        <X size={14} weight="bold" />
      </button>
    </div>
  );
}

// Hook to manage toast state
export function useToast() {
  const [state, setState] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false,
  });

  const show = (message: string) => {
    setState({ message, visible: true });
  };

  const dismiss = () => {
    setState((prev) => ({ ...prev, visible: false }));
  };

  return { toast: state, show, dismiss };
}
