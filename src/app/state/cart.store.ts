import { computed, Injectable, signal } from '@angular/core';
import { CartItem, Product } from '../Models/product';

const STORAGE_KEY = 'atelier-cart';

@Injectable({ providedIn: 'root' })
export class CartStore {
  private readonly itemsState = signal<CartItem[]>(this.readCart());
  readonly items = this.itemsState.asReadonly();
  readonly itemCount = computed(() =>
    this.itemsState().reduce((total, item) => total + item.quantity, 0),
  );
  readonly subtotal = computed(() =>
    this.itemsState().reduce((total, item) => total + item.product.price * item.quantity, 0),
  );

  add(product: Product): void {
    this.updateItems((items) => {
      const existing = items.find((item) => item.product.id === product.id);
      return existing
        ? items.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...items, { product, quantity: 1 }];
    });
  }

  setQuantity(productId: string, quantity: number): void {
    this.updateItems((items) =>
      quantity < 1
        ? items.filter((item) => item.product.id !== productId)
        : items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item,
          ),
    );
  }

  remove(productId: string): void {
    this.updateItems((items) => items.filter((item) => item.product.id !== productId));
  }

  private updateItems(update: (items: CartItem[]) => CartItem[]): void {
    const items = update(this.itemsState());
    this.itemsState.set(items);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }

  private readCart(): CartItem[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  }
}