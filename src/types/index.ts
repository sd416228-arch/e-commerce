export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  location: string;
}

export interface Product {
  id: string;
  name: string;
  nepaliName?: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  gender: 'women' | 'men' | 'unisex';
  category: 'Festive Suits' | 'Anarkali' | 'Kurtas' | 'Dresses' | 'Tops' | 'Fusion Wear';
  isBestSeller: boolean;
  isDashainSpecial: boolean;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  images: string[];
  thumbnail: string;
  shortDescription: string;
  details: string[];
  materials: string;
  sizeAndFit: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  tags: string[];
  reviews: Review[];
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface DeliveryInfo {
  fullName: string;
  phoneNumber: string;
  buildingHouse: string;
  colonySuburb: string;
  email: string;
  region: string;
  city: string;
  area: string;
  address: string;
  deliveryDateOption: 'standard' | 'express' | 'festival_rush';
}

export type PaymentMethod = 'cod' | 'esewa' | 'card';

export interface EsewaAccount {
  isLinked: boolean;
  esewaId: string;
  accountHolder: string;
  balance: number;
}

export interface Order {
  orderId: string;
  items: CartItem[];
  deliveryInfo: DeliveryInfo;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  finalTotal: number;
  createdAt: string;
  estimatedDeliveryDate: string;
  status: 'Processing' | 'Confirmed' | 'Shipped' | 'Delivered';
  esewaTxnId?: string;
}

export type ReelCategory =
  | 'all'
  | 'customer-reviews'
  | 'on-our-models'
  | 'outfit-inspiration'
  | 'new-arrivals'
  | 'dashain-looks';

export interface FashionReel {
  id: string;
  /** Direct MP4/WebM URL for hover-to-play. Leave empty to show poster-only card. */
  videoUrl: string;
  /** WebM alternative source for broader codec support */
  videoUrlWebm?: string;
  /** Static poster image shown before/during load */
  posterUrl: string;
  caption: string;
  creatorName: string;
  creatorHandle?: string;
  category: ReelCategory;
  /** ID of the matching product in PRODUCTS array */
  relatedProductId: string;
  /** True only when purchase is genuinely verified by the store */
  verifiedPurchase?: boolean;
  /** Admin can set to false to hide from public gallery */
  published?: boolean;
  /** Duration label e.g. "0:28" for display */
  duration?: string;
  views?: number;
}
