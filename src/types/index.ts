export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: Category;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tags: string[];
  featured?: boolean;
}

export type Category =
  | 'Electronics'
  | 'Clothing'
  | 'Books'
  | 'Home & Kitchen'
  | 'Sports'
  | 'Beauty'
  | 'Toys';

export interface CartItem extends Product {
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export type SortOption =
  | 'default'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'name-asc';

export interface FilterState {
  search: string;
  category: Category | 'All';
  sortBy: SortOption;
  minPrice: number;
  maxPrice: number;
}
