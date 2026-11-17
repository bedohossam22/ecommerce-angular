import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Home } from './home/home';
import { Product } from './Models/product';
import { CartStore } from './state/cart.store';

@Component({
  selector: 'app-root',
  imports: [Home, CurrencyPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly cart = inject(CartStore);
  protected readonly searchTerm = signal('');
  protected readonly selectedCategory = signal('All');
  protected readonly cartOpen = signal(false);
  protected readonly toastMessage = signal('');

  protected onSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  protected selectCategory(category: string): void {
    this.selectedCategory.set(category);
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  }

  protected addToCart(product: Product): void {
    this.cart.add(product);
    this.toastMessage.set(`${product.brand} added to your bag`);
    window.setTimeout(() => this.toastMessage.set(''), 2600);
  }

  protected checkout(): void {
    this.cartOpen.set(false);
    this.toastMessage.set('Your bag is ready — checkout is coming soon.');
    window.setTimeout(() => this.toastMessage.set(''), 3000);
  }
}
