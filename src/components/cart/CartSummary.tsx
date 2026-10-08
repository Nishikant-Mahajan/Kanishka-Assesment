import { ArrowRight, Tag, ShieldCheck } from '@phosphor-icons/react';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../utils/format';

interface CartSummaryProps {
  onCheckout?: () => void;
}

export function CartSummary({ onCheckout }: CartSummaryProps) {
  const totalItems = useCartStore((s) => s.totalItems());
  const totalPrice = useCartStore((s) => s.totalPrice());

  const shipping = totalPrice >= 999 ? 0 : 99;
  const tax = totalPrice * 0.18; // 18% GST
  const grandTotal = totalPrice + shipping + tax;

  return (
    <div className="card p-5 space-y-5 sticky top-24">
      <h2 className="font-bold text-text-primary text-base">Order Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-text-secondary">
            Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </span>
          <span className="font-semibold text-text-primary">{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Shipping</span>
          <span className={shipping === 0 ? 'text-accent-emerald font-semibold' : 'font-semibold text-text-primary'}>
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Tax (18% GST)</span>
          <span className="font-semibold text-text-primary">{formatPrice(tax)}</span>
        </div>
      </div>

      {/* Free shipping nudge */}
      {totalPrice < 999 && (
        <div className="flex items-center gap-2 bg-brand/10 border border-brand/20 rounded-xl px-3 py-2.5">
          <Tag size={14} weight="duotone" className="text-brand shrink-0" />
          <p className="text-xs text-text-secondary">
            Add{' '}
            <span className="font-semibold text-brand">{formatPrice(999 - totalPrice)}</span>{' '}
            more for free shipping
          </p>
        </div>
      )}

      <div className="border-t border-border pt-4 flex justify-between">
        <span className="font-bold text-text-primary">Total</span>
        <span className="font-bold text-text-primary text-lg">{formatPrice(grandTotal)}</span>
      </div>

      <button
        onClick={onCheckout}
        className="btn-primary w-full justify-center py-3 text-sm"
      >
        Checkout
        <ArrowRight size={16} weight="bold" />
      </button>

      <div className="flex items-center justify-center gap-2 text-xs text-text-muted">
        <ShieldCheck size={14} weight="duotone" className="text-accent-emerald" />
        Secure checkout · SSL encrypted
      </div>
    </div>
  );
}
