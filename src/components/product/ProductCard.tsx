import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartSimple, Eye } from '@phosphor-icons/react';
import type { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { StarRating } from '../ui/StarRating';
import { Badge } from '../ui/Badge';
import { QuantityStepper } from '../ui/QuantityStepper';
import { formatPrice, discountPercent } from '../../utils/format';
import { cn } from '../../utils/cn';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (name: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addItem, removeItem, updateQuantity, items } = useCartStore();
  const [imgError, setImgError] = useState(false);
  const [adding, setAdding] = useState(false);

  const cartItem = items.find((i) => i.id === product.id);
  const inCart = Boolean(cartItem);
  const quantity = cartItem?.quantity ?? 0;

  const discount = product.originalPrice
    ? discountPercent(product.originalPrice, product.price)
    : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    setAdding(true);
    addItem(product);
    onAddToCart?.(product.name);
    setTimeout(() => setAdding(false), 500);
  };

  const handleIncrease = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    addItem(product);
  };

  const handleDecrease = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (quantity <= 1) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, quantity - 1);
    }
  };

  return (
    <article className="card group relative flex flex-col overflow-hidden hover:border-border-light hover:-translate-y-1 transition-all duration-300 hover:shadow-glow">
      {/* Image */}
      <Link
        to={`/product/${product.id}`}
        className="relative block overflow-hidden bg-bg-elevated aspect-[4/3] flex-shrink-0"
        tabIndex={0}
      >
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingCartSimple size={40} weight="duotone" className="text-text-muted opacity-40" />
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="flex items-center gap-2 bg-bg-elevated/90 backdrop-blur-sm text-text-primary text-xs font-semibold px-3 py-2 rounded-xl border border-border translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye size={14} weight="duotone" />
            View details
          </span>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount >= 5 && (
            <Badge variant="rose">−{discount}%</Badge>
          )}
          {product.featured && !discount && (
            <Badge variant="brand">Featured</Badge>
          )}
          {!product.inStock && (
            <Badge variant="muted">Out of stock</Badge>
          )}
        </div>

        {/* Cart quantity bubble — visible when in cart */}
        {inCart && (
          <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-brand text-white text-[11px] font-bold flex items-center justify-center shadow-glow">
            {quantity}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 min-w-0 focus-visible:outline-none focus-visible:underline"
          >
            <h3 className="text-sm font-semibold text-text-primary leading-snug line-clamp-2 hover:text-brand transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>

        <span className="text-xs text-text-muted font-medium">{product.category}</span>

        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed mt-0.5">
          {product.description}
        </p>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border gap-3">
          <div className="flex flex-col">
            <span className="font-bold text-text-primary text-base">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-text-muted line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* — Stepper when in cart, plain Add button when not — */}
          {inCart ? (
            <QuantityStepper
              quantity={quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              showTrashAtOne
              size="sm"
            />
          ) : (
            <button
              onClick={handleAdd}
              disabled={!product.inStock || adding}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                !product.inStock
                  ? 'bg-bg-elevated text-text-muted cursor-not-allowed'
                  : 'bg-brand text-white hover:bg-brand-light shadow-glowSm hover:shadow-glow'
              )}
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCartSimple
                size={14}
                weight={adding ? 'fill' : 'bold'}
                className={cn(adding && 'animate-bounce')}
              />
              {!product.inStock ? 'Sold out' : 'Add'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
