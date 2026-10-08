import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingCartSimple,
  Check,
  Package,
  ArrowCounterClockwise,
  Truck,
  ShieldCheck,
} from '@phosphor-icons/react';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { StarRating } from '../components/ui/StarRating';
import { Badge } from '../components/ui/Badge';
import { QuantityStepper } from '../components/ui/QuantityStepper';
import { ProductCard } from '../components/product/ProductCard';
import { Toast, useToast } from '../components/ui/Toast';
import { formatPrice, discountPercent } from '../utils/format';
import { cn } from '../utils/cn';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, removeItem, updateQuantity, items } = useCartStore();
  const { toast, show, dismiss } = useToast();
  const [imgError, setImgError] = useState(false);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === id);
  const cartItem = product ? items.find((i) => i.id === product.id) : undefined;
  const inCart = Boolean(cartItem);
  const cartQty = cartItem?.quantity ?? 0;

  // Related products: same category, excluding current
  const related = product
    ? products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-20 h-20 rounded-2xl bg-bg-elevated flex items-center justify-center mx-auto mb-6 border border-border">
          <Package size={36} weight="duotone" className="text-text-muted" />
        </div>
        <h1 className="text-xl font-bold text-text-primary mb-2">Product not found</h1>
        <p className="text-text-secondary mb-8">
          This product doesn't exist or may have been removed.
        </p>
        <Link to="/" className="btn-primary inline-flex">
          <ArrowLeft size={16} weight="bold" />
          Back to shop
        </Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? discountPercent(product.originalPrice, product.price)
    : 0;

  const handleAdd = () => {
    if (!product.inStock || adding) return;
    setAdding(true);
    addItem(product);
    show(`"${product.name}" added to cart`);
    setTimeout(() => {
      setAdding(false);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 animate-fade-in">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="btn-ghost -ml-2"
        aria-label="Go back"
      >
        <ArrowLeft size={16} weight="bold" />
        Back
      </button>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Image */}
        <div className="space-y-4">
          <div className="relative rounded-xl3 overflow-hidden bg-bg-elevated border border-border aspect-square">
            {imgError ? (
              <div className="w-full h-full flex items-center justify-center">
                <Package size={64} weight="duotone" className="text-text-muted opacity-40" />
              </div>
            ) : (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            )}

            {/* Badges overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {discount >= 5 && <Badge variant="rose">−{discount}% off</Badge>}
              {product.featured && <Badge variant="brand">Featured</Badge>}
              {!product.inStock && <Badge variant="muted">Out of stock</Badge>}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          {/* Category */}
          <Link
            to="/"
            onClick={() => {}}
            className="text-xs font-semibold text-brand uppercase tracking-widest hover:text-brand-light transition-colors"
          >
            {product.category}
          </Link>

          {/* Name */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <StarRating
            rating={product.rating}
            reviewCount={product.reviewCount}
            size="md"
          />

          {/* Price */}
          <div className="flex items-end gap-3">
            <span className="text-3xl font-extrabold text-text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-text-muted line-through mb-0.5">
                  {formatPrice(product.originalPrice)}
                </span>
                <Badge variant="rose" className="mb-0.5">Save {discount}%</Badge>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-text-secondary leading-relaxed">{product.description}</p>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-bg-elevated text-text-muted text-xs rounded-lg border border-border"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-2">
            {inCart ? (
              /* ── Already in cart: show stepper + view cart link ── */
              <>
                <div className="flex-1 flex items-center justify-between gap-4 px-5 py-3 rounded-xl bg-brand/10 border border-brand/25">
                  <span className="text-sm font-semibold text-brand-light">In your cart</span>
                  <QuantityStepper
                    quantity={cartQty}
                    onIncrease={() => addItem(product)}
                    onDecrease={() => {
                      if (cartQty <= 1) removeItem(product.id);
                      else updateQuantity(product.id, cartQty - 1);
                    }}
                    showTrashAtOne
                    size="lg"
                  />
                </div>
                <Link
                  to="/cart"
                  className="btn-ghost border border-border px-6 py-3.5 justify-center text-sm font-semibold"
                >
                  View cart
                </Link>
              </>
            ) : (
              /* ── Not in cart: Add to cart button ── */
              <button
                onClick={handleAdd}
                disabled={!product.inStock || adding}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
                  !product.inStock
                    ? 'bg-bg-elevated text-text-muted cursor-not-allowed'
                    : added
                    ? 'bg-accent-emerald/20 text-accent-emerald border border-accent-emerald/30'
                    : 'bg-brand text-white hover:bg-brand-light shadow-glowSm hover:shadow-glow'
                )}
              >
                {added ? (
                  <>
                    <Check size={18} weight="bold" />
                    Added to cart!
                  </>
                ) : (
                  <>
                    <ShoppingCartSimple
                      size={18}
                      weight="bold"
                      className={cn(adding && 'animate-bounce')}
                    />
                    {!product.inStock ? 'Out of stock' : 'Add to cart'}
                  </>
                )}
              </button>
            )}
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { icon: Truck, label: 'Free shipping over $100' },
              { icon: ArrowCounterClockwise, label: '30-day returns' },
              { icon: ShieldCheck, label: 'Secure payment' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 p-3 bg-bg-elevated rounded-xl border border-border text-center"
              >
                <Icon size={20} weight="duotone" className="text-brand" />
                <span className="text-[11px] text-text-muted leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="space-y-6 animate-slide-up">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-primary">
              More in{' '}
              <span className="text-brand">{product.category}</span>
            </h2>
            <Link
              to="/"
              className="text-sm text-text-secondary hover:text-brand transition-colors font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={(n) => show(`"${n}" added`)} />
            ))}
          </div>
        </section>
      )}

      <Toast message={toast.message} visible={toast.visible} onDismiss={dismiss} />
    </div>
  );
}
