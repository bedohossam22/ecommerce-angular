export interface Product {
  id: string;
  imageUrl: string;
  brand: string;
  title: string;
  category: 'Women' | 'Men';
  department: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  color: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}