import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Storefront,
  ShoppingCart,
  List,
  X,
  Bag,
} from '@phosphor-icons/react';
import { useCartStore } from '../../store/cartStore';
import { cn } from '../../utils/cn';

export function Navbar() {
  const location = useLocation();
  const totalItems = useCartStore((s) => s.totalItems());
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const prevCount = useRef(totalItems);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate cart icon on count change
  useEffect(() => {
    if (totalItems !== prevCount.current) {
      setCartBounce(true);
      const t = setTimeout(() => setCartBounce(false), 500);
      prevCount.current = totalItems;
      return () => clearTimeout(t);
    }
  }, [totalItems]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { href: '/', label: 'Shop' },
    { href: '/cart', label: 'Cart' },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-bg-primary/90 backdrop-blur-xl border-b border-border shadow-card'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus-visible:outline-none"
        >
          <div className="w-8 h-8 rounded-xl bg-brand flex items-center justify-center shadow-glowSm group-hover:shadow-glow transition-shadow duration-300">
            <Bag size={18} weight="fill" className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-text-primary">
            kart<span className="text-brand">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                location.pathname === link.href
                  ? 'text-text-primary bg-bg-elevated'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side: cart */}
        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-bg-elevated transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-label={`Cart (${totalItems} items)`}
          >
            <ShoppingCart
              size={22}
              weight="bold"
              className={cn(
                'text-text-secondary transition-colors hover:text-text-primary',
                cartBounce && 'animate-cart-bounce text-brand'
              )}
            />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-brand text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-bg-elevated transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X size={20} weight="bold" className="text-text-primary" />
            ) : (
              <List size={20} weight="bold" className="text-text-secondary" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'sm:hidden border-t border-border bg-bg-secondary/95 backdrop-blur-xl overflow-hidden transition-all duration-300',
          mobileOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 py-3 flex flex-col gap-1">
          <Link
            to="/"
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
              location.pathname === '/'
                ? 'bg-bg-elevated text-text-primary'
                : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
            )}
          >
            <Storefront size={16} weight="duotone" />
            Shop
          </Link>
          <Link
            to="/cart"
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
              location.pathname === '/cart'
                ? 'bg-bg-elevated text-text-primary'
                : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
            )}
          >
            <ShoppingCart size={16} weight="duotone" />
            Cart
            {totalItems > 0 && (
              <span className="ml-auto bg-brand text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
