import { TProduct } from "./product";

export type TCart = {
  products: TProduct[];
  totalPrice: string;
};

export function addProduct(cart: TCart, product: TProduct): TCart {
  return { ...cart, products: [...cart.products, product] };
}

export function contains(cart: TCart, product: TProduct): boolean {
  return cart.products.some(({ slug }) => slug === product.slug);
}