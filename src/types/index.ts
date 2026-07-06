import type { Product, ProductImage, ProductSpec } from "@/generated/prisma/client";

export type ProductWithRelations = Product & {
  images: ProductImage[];
  specs: ProductSpec[];
};

export type CartItemView = {
  id: string;
  productId: string;
  quantity: number;
  color: string | null;
  slug: string;
  nameEn: string;
  nameFa: string;
  price: number;
  currency: string;
  image: string | null;
  stock: number;
};

export type CartView = {
  id: string;
  items: CartItemView[];
  subtotal: number;
};
