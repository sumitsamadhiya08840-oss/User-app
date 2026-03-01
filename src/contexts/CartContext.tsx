import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import { STORAGE_KEYS } from '../constants/storage';

export type CartProduct = {
  id: string;
  name: string;
  price: number;
  mrp?: number;
  imageUrl?: string;
  image?: string;
  description?: string;
  brand?: string;
  unit?: string;
  inStock?: boolean;
  shopId?: string;
  subcategoryId?: string;
};

export type CartItem = {
  product: CartProduct;
  shopId: string;
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
  shopId?: string;
  itemCount: number;
  subtotal: number;
  totalMrp: number;
  savings: number;
  addItem: (product: CartProduct, shopId?: string) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  getQuantity: (productId: string) => number;
  getItemQuantity: (productId: string) => number;
  updateQuantity: (productId: string, quantity: number) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const getSummary = (items: CartItem[]): CartSummary => {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalMrp = items.reduce(
    (sum, item) => sum + (item.product.mrp ?? item.product.price) * item.quantity,
    0,
  );
  const savings = Math.max(totalMrp - subtotal, 0);

  return {
    itemCount,
    subtotal,
    totalMrp,
    savings,
  };
};

const normalizeProduct = (product: CartProduct, defaultShopId?: string): CartProduct => ({
  ...product,
  mrp: product.mrp ?? product.price,
  imageUrl: product.imageUrl ?? product.image,
  shopId: product.shopId ?? defaultShopId,
});

const appendOrIncrement = (items: CartItem[], product: CartProduct, itemShopId: string) => {
  const existing = items.find((item) => item.product.id === product.id);

  if (existing) {
    return items.map((item) =>
      item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
    );
  }

  return [...items, { product, shopId: itemShopId, quantity: 1 }];
};

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEYS.CART);
        if (!raw) {
          setIsHydrated(true);
          return;
        }

        const parsed = JSON.parse(raw) as CartItem[];
        if (!Array.isArray(parsed)) {
          setIsHydrated(true);
          return;
        }

        setItems(
          parsed
            .filter(
              (item) =>
                item &&
                item.product &&
                typeof item.product.id === 'string' &&
                typeof item.product.name === 'string',
            )
            .map((item) => ({
              ...item,
              product: normalizeProduct(item.product, item.shopId),
            })),
        );
      } catch {
        setItems([]);
      } finally {
        setIsHydrated(true);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    AsyncStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
  }, [isHydrated, items]);

  const summary = useMemo(() => getSummary(items), [items]);
  const activeShopId = items[0]?.shopId;

  const addItem = (product: CartProduct, shopId?: string) => {
    const targetShopId = shopId ?? product.shopId ?? activeShopId ?? 'default-shop';
    const normalizedProduct = normalizeProduct(product, targetShopId);

    if (activeShopId && activeShopId !== targetShopId && items.length > 0) {
      Alert.alert(
        'Replace cart items?',
        'Your cart has items from another shop. Clear cart to add this item?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Clear & Add',
            onPress: () => {
              setItems([{ product: normalizedProduct, shopId: targetShopId, quantity: 1 }]);
            },
          },
        ],
      );
      return;
    }

    setItems((previousItems) => {
      return appendOrIncrement(previousItems, normalizedProduct, targetShopId);
    });
  };

  const getQuantity = (productId: string) =>
    items.find((item) => item.product.id === productId)?.quantity ?? 0;

  const getItemQuantity = getQuantity;

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((previousItems) => {
      if (quantity <= 0) {
        return previousItems.filter((item) => item.product.id !== productId);
      }

      const existing = previousItems.find((item) => item.product.id === productId);
      if (!existing) {
        return previousItems;
      }

      return previousItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      );
    });
  };

  const increment = (productId: string) => {
    setItems((previousItems) =>
      previousItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrement = (productId: string) => {
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

  const incrementQuantity = increment;
  const decrementQuantity = decrement;
  const clearCart = () => setItems([]);

  const value: CartContextValue = {
    items,
    shopId: activeShopId,
    itemCount: summary.itemCount,
    subtotal: summary.subtotal,
    totalMrp: summary.totalMrp,
    savings: summary.savings,
    addItem,
    increment,
    decrement,
    getQuantity,
    getItemQuantity,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    clearCart,
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
