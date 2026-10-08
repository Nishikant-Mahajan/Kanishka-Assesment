import { Link } from 'react-router-dom';
import { ArrowLeft, Trash } from '@phosphor-icons/react';
import { useCartStore } from '../store/cartStore';
import { CartItemRow } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { EmptyState } from '../components/ui/EmptyState';
import { Toast, useToast } from '../components/ui/Toast';

export function CartPage() {
  const { items, clearCart } = useCartStore();
  const { toast, show, dismiss } = useToast();

  const handleCheckout = () => {
    show('Checkout coming soon! This is a demo.');
  };

  const handleClearCart = () => {
    clearCart();
    show('Cart cleared');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Link to="/" className="btn-ghost -ml-2">
            <ArrowLeft size={16} weight="bold" />
            Continue shopping
          </Link>
          <div className="h-5 w-px bg-border" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            Your Cart
          </h1>
          {items.length > 0 && (
            <span className="px-2.5 py-0.5 bg-brand/15 text-brand-light text-sm font-bold rounded-full">
              {items.length}
            </span>
          )}
        </div>

        {items.length > 0 && (
          <button
            onClick={handleClearCart}
            className="btn-danger"
            aria-label="Clear all cart items"
          >
            <Trash size={14} weight="bold" />
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState
          variant="cart"
          action={
            <Link to="/" className="btn-primary">
              <ArrowLeft size={16} weight="bold" />
              Browse products
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>

          {/* Summary sidebar */}
          <div>
            <CartSummary onCheckout={handleCheckout} />
          </div>
        </div>
      )}

      <Toast message={toast.message} visible={toast.visible} onDismiss={dismiss} />
    </div>
  );
}
