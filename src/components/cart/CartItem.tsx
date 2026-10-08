import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash } from '@phosphor-icons/react';
import type { CartItem as CartItemType } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { QuantityStepper } from '../ui/QuantityStepper';
import { formatPrice } from '../../utils/format';

interface CartItemProps {
  item: CartItemType;
}

export function CartItemRow({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const [imgError, setImgError] = useState(false);
  const [removing, setRemoving] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => removeItem(item.id), 250);
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity <= 1) {
      handleRemove();
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div
      className={`flex gap-4 p-4 rounded-xl border border-border bg-bg-card transition-all duration-300 ${
        removing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      {/* Thumbnail */}
      <Link
        to={`/product/${item.id}`}
        className="shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-bg-elevated border border-border block"
      >
        {imgError ? (
          <div className="w-full h-full bg-bg-elevated" />
        ) : (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        )}
      </Link>

      {/* Details */}
      <div className="flex flex-1 min-w-0 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/product/${item.id}`}
            className="text-sm font-semibold text-text-primary hover:text-brand transition-colors line-clamp-2 leading-snug"
          >
            {item.name}
          </Link>
          <button
            onClick={handleRemove}
            className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-accent-rose hover:bg-accent-rose/10 transition-all duration-200"
            aria-label={`Remove ${item.name}`}
          >
            <Trash size={14} weight="bold" />
          </button>
        </div>

        <span className="text-xs text-text-muted">{item.category}</span>

        {/* Quantity stepper + price */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <QuantityStepper
            quantity={item.quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            showTrashAtOne
            size="md"
          />

          <div className="text-right">
            <p className="text-sm font-bold text-text-primary">
              {formatPrice(item.price * item.quantity)}
            </p>
            {item.quantity > 1 && (
              <p className="text-[11px] text-text-muted">
                {formatPrice(item.price)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
