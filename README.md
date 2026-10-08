# kart. — Mini E-Commerce Application

A responsive, dark-themed e-commerce application built as a React Developer Intern take-home assessment. Every feature requirement from the brief has been implemented with a focus on clean architecture, real-world patterns, and polished UX.

---

## Preview

| Shop Page | Product Detail | Cart |
|-----------|---------------|------|
| Product grid with search, filter & sort | Full detail view with related products | Line items, quantity stepper, order summary |

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| **React** | 19 | UI framework |
| **TypeScript** | 5.x | Static typing |
| **Vite** | 8.x | Build tool & dev server |
| **Tailwind CSS** | 3.4 | Utility-first styling |
| **React Router** | v6 | Client-side routing |
| **Zustand** | 4.5 | Lightweight global cart state |
| **Phosphor Icons** | 2.1 | Icon set (not AI-looking, hand-crafted) |
| **clsx + tailwind-merge** | — | Dynamic class composition |

---

## Project Structure

```
src/
├── components/
│   ├── cart/
│   │   ├── CartItem.tsx        # Individual cart row (qty stepper, remove)
│   │   └── CartSummary.tsx     # Order summary sidebar with totals
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky nav, cart badge, mobile drawer
│   │   └── Footer.tsx
│   ├── product/
│   │   ├── ProductCard.tsx     # Grid card with hover effects, badges
│   │   ├── ProductGrid.tsx     # Orchestrates grid / skeleton / empty states
│   │   ├── SearchBar.tsx       # Controlled search input with clear button
│   │   └── FilterBar.tsx       # Category pills + sort dropdown
│   └── ui/
│       ├── Badge.tsx           # Reusable colored badge
│       ├── EmptyState.tsx      # Search / filter / cart empty states
│       ├── ErrorState.tsx      # Error state with retry
│       ├── Skeleton.tsx        # Shimmer skeleton loader
│       ├── StarRating.tsx      # Fractional star rating display
│       └── Toast.tsx           # Auto-dismiss toast + useToast hook
├── data/
│   └── products.ts             # 25 products across 7 categories (local JSON-style data)
├── hooks/
│   └── useProducts.ts          # Filtering, search, sort logic with useMemo
├── pages/
│   ├── ShopPage.tsx            # Main listing page
│   ├── ProductDetailPage.tsx   # Full product detail + related products
│   └── CartPage.tsx            # Cart management page
├── store/
│   └── cartStore.ts            # Zustand store with localStorage persistence
├── types/
│   └── index.ts                # Shared TypeScript interfaces
└── utils/
    ├── cn.ts                   # clsx + twMerge helper
    └── format.ts               # Price, rating, count formatters
```

---

## Features Implemented

### Product Data
- 25 products across 7 categories (Electronics, Clothing, Books, Home & Kitchen, Sports, Beauty, Toys)
- Each product has: name, description, price, optional originalPrice, image, category, rating, reviewCount, inStock, tags, featured flag

### Product Listing
- Responsive 1→2→3→4 column grid
- Real-time text search (matches name, description, tags, category)
- Category filter with pill buttons
- Sort by: Featured, Price Low/High, Highest Rated, Name A–Z
- Shimmer skeleton loading state (800ms simulated delay)
- Empty state when no results match

### Product Details
- `/product/:id` route with full detail layout
- Image, rating, price with discount badge, description, tags
- Add to cart / already in cart / out of stock states
- Related products section (same category)
- 404 state for unknown product IDs

### Shopping Cart
- Add / remove items
- Increase / decrease quantity (remove when quantity reaches 0)
- Clear entire cart
- Total items count shown in navbar badge
- Total price, shipping (free over $100), tax calculation
- Cart state persisted to **localStorage** via Zustand persist middleware
- Empty cart state with CTA back to shop

### UI & Code Quality
- Dark theme only — no light mode toggle (by design per requirements)
- Fully responsive across mobile / tablet / desktop
- Loading, error, empty state handling on every data boundary
- Smooth transitions, hover effects, card elevation on hover
- Toast notifications on add-to-cart
- Cart badge animates when item count changes
- No Lucide icons — uses Phosphor Icons (designed by humans, not AI)
- Accessible: keyboard navigable, ARIA labels, focus-visible rings throughout

---

## Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9 (comes with Node)

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd shop-app

# Install dependencies
npm install
```

### Running locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production build

```bash
npm run build
npm run preview   # preview the production build locally
```

### Type checking

```bash
npx tsc --noEmit
```

---

## Assessment Checklist

- [x] Local product JSON data
- [x] Responsive product grid
- [x] Product search
- [x] Category filtering
- [x] Empty state on no results
- [x] Product detail page with routing
- [x] Add to cart
- [x] Remove from cart
- [x] Increase / decrease quantity
- [x] Display total items
- [x] Display total price
- [x] localStorage persistence
- [x] Loading states (shimmer skeletons)
- [x] Error state
- [x] Empty states (search, filter, cart)
- [x] Responsive design (mobile / tablet / desktop)
- [x] Reusable React components
- [x] React Hooks + state management
- [x] Clean, readable, maintainable code
- [x] README with setup instructions
