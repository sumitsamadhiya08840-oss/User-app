import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

import { DEMO_SHOPS, Product } from '../constants/demoShops';

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartSummary = {
  itemCount: number;
  subtotal: number;
  totalMrp: number;
  savings: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  totalMrp: number;
  savings: number;
  addItem: (product: Product) => void;
  getItemQuantity: (productId: string) => number;
  updateQuantity: (productId: string, quantity: number) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const INITIAL_CART_ITEMS: CartItem[] = (() => {
  const products = DEMO_SHOPS.flatMap((shop) =>
    shop.subcategories.flatMap((subcategory) => subcategory.products),
  );

  if (products.length < 2) {
    return [];
  }

  return [
    { product: products[0], quantity: 2 },
    { product: products[1], quantity: 1 },
  ];
})();

const getSummary = (items: CartItem[]): CartSummary => {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalMrp = items.reduce((sum, item) => sum + item.product.mrp * item.quantity, 0);
  const savings = Math.max(totalMrp - subtotal, 0);

  return {
    itemCount,
    subtotal,
    totalMrp,
    savings,
  };
};

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);

  const summary = useMemo(() => getSummary(items), [items]);

  const addItem = (product: Product) => {
    setItems((previousItems) => {
      const existing = previousItems.find((item) => item.product.id === product.id);
      if (existing) {
        return previousItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...previousItems, { product, quantity: 1 }];
    });
  };

  const getItemQuantity = (productId: string) =>
    items.find((item) => item.product.id === productId)?.quantity ?? 0;

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((previousItems) => {
      if (quantity <= 0) {
        return previousItems.filter((item) => item.product.id !== productId);
      }

      const existing = previousItems.find((item) => item.product.id === productId);
      if (!existing) {
        const product = DEMO_SHOPS.flatMap((shop) =>
          shop.subcategories.flatMap((subcategory) => subcategory.products),
        ).find((candidate) => candidate.id === productId);

        if (!product) {
          return previousItems;
        }

        return [...previousItems, { product, quantity }];
      }

      return previousItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      );
    });
  };

  const incrementQuantity = (productId: string) => {
    setItems((previousItems) =>
      previousItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrementQuantity = (productId: string) => {
    setItems((previousItems) =>
      previousItems
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (productId: string) => {
    setItems((previousItems) => previousItems.filter((item) => item.product.id !== productId));
  };

  const value: CartContextValue = {
    items,
    itemCount: summary.itemCount,
    subtotal: summary.subtotal,
    totalMrp: summary.totalMrp,
    savings: summary.savings,
    addItem,
    getItemQuantity,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    clearCart: () => setItems([]),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}
