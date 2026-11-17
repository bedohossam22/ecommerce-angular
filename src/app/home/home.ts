import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { productCatalog } from '../data/product-catalog';
import { Product } from '../Models/product';

@Component({
  selector: 'app-home',
  imports: [CurrencyPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  readonly searchTerm = input('');
  readonly category = input('All');
  readonly categoryChange = output<string>();
  readonly addProduct = output<Product>();
  protected readonly activeDepartment = signal('All');
  protected readonly sortOrder = signal('featured');
  protected readonly favorites = signal<Set<string>>(new Set());

  protected readonly visibleProducts = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const activeCategory = this.category();
    const department = this.activeDepartment();
    const matching = productCatalog.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesDepartment = department === 'All' || product.department === department;
      const matchesSearch = !search ||
        `${product.title} ${product.brand} ${product.department} ${product.category}`.toLowerCase().includes(search);
      return matchesCategory && matchesDepartment && matchesSearch;
    });

    if (this.sortOrder() === 'price-low') return matching.sort((a, b) => a.price - b.price);
    if (this.sortOrder() === 'price-high') return matching.sort((a, b) => b.price - a.price);
    return matching;
  });

  protected chooseDepartment(department: string): void {
    this.activeDepartment.set(department);
    this.categoryChange.emit('All');
  }

  protected toggleFavorite(productId: string): void {
    this.favorites.update((current) => {
      const next = new Set(current);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }
}
