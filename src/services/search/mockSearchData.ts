import { DEMO_CATEGORIES, DEMO_SHOPS } from '../../constants/demoShops';

export type MockSearchShop = {
  id: string;
  name: string;
  categoryId: string;
  rating: number;
  eta: string;
};

export type MockSearchProduct = {
  id: string;
  name: string;
  price: number;
  mrp?: number;
  shopId: string;
  categoryId: string;
};

export type MockSearchCategory = {
  id: string;
  name: string;
};

export const mockCategories: MockSearchCategory[] = DEMO_CATEGORIES.map((category) => ({
  id: category.id,
  name: category.name,
}));

export const mockShops: MockSearchShop[] = DEMO_CATEGORIES.flatMap((category) =>
  category.shops.map((shop, index) => ({
    id: shop.id,
    name: shop.name,
    categoryId: category.id,
    rating: Number((4.1 + (index % 4) * 0.2).toFixed(1)),
    eta: shop.info.includes('mins') ? shop.info.split('•')[1].trim() : '15 mins',
  })),
);

export const mockProducts: MockSearchProduct[] = DEMO_SHOPS.flatMap((shop) => {
  const categoryId =
    DEMO_CATEGORIES.find((category) =>
      category.shops.some((categoryShop) => categoryShop.id === shop.id),
    )?.id ?? 'general';

  return shop.subcategories.flatMap((subcategory) =>
    subcategory.products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      shopId: shop.id,
      categoryId,
    })),
  );
});
