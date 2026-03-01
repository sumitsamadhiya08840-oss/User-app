export type AuthStackParamList = {
  Login: undefined;
  OtpVerify: { phone: string };
};

export type HomeStackParamList = {
  HomeMain: undefined;
  ShopDetails: { shopId: string };
  CategoryShops: { categoryId: string };
  ShopListing: { categoryId?: string; title?: string } | undefined;
  SubcategoryProducts: { shopId: string; subcategoryId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Cart: undefined;
  Orders: undefined;
  Profile: undefined;
};
