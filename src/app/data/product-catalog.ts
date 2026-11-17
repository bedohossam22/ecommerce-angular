import womenTops from '../../Data/Women/women_top.json';
import womenDresses from '../../Data/Women/women_dress.json';
import menShirts from '../../Data/Men/men_shirt.json';
import menJeans from '../../Data/Men/men_jeans.json';
import { Product } from '../Models/product';

interface SourceProduct {
  imageUrl: string;
  brand: string;
  title: string;
  color: string;
  discountedPrice: number;
  price: number;
  discountPersent: number;
  thirdLavelCategory: string;
  topLavelCategory: string;
}

function productsFrom(
  source: SourceProduct[],
  category: Product['category'],
  department: string,
  idPrefix: string,
): Product[] {
  return source.slice(0, 6).map((item, index) => ({
    id: `${idPrefix}-${index + 1}`,
    imageUrl: item.imageUrl,
    brand: item.brand,
    title: item.title.replace(/\.\.\.$/, ''),
    category,
    department,
    price: item.discountedPrice,
    originalPrice: item.price,
    discountPercent: item.discountPersent,
    color: item.color,
  }));
}

export const productCatalog: Product[] = [
  ...productsFrom(womenTops, 'Women', 'Tops', 'women-top'),
  ...productsFrom(womenDresses, 'Women', 'Dresses', 'women-dress'),
  ...productsFrom(menShirts, 'Men', 'Shirts', 'men-shirt'),
  ...productsFrom(menJeans, 'Men', 'Denim', 'men-denim'),
];