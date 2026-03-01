import { FlatList, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useMemo, useRef, useState } from 'react';

import { AppHeader } from '../components/ui/AppHeader';
import { AppText } from '../components/ui/AppText';
import { Screen } from '../components/ui/Screen';
import { getShopById, Product } from '../constants/demoShops';
import { useCart } from '../contexts/CartContext';
import { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'ShopDetails'>;

type ProductCardProps = {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
};

function ProductCard({ product, quantity, onAdd, onIncrement, onDecrement }: ProductCardProps) {
  return (
    <View style={styles.productCard}>
      <View style={styles.discountBadge}>
        <AppText style={styles.discountText}>{product.discountLabel}</AppText>
      </View>

      <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="cover" />

      <View style={styles.productBody}>
        <AppText style={styles.productBrand}>{product.brand}</AppText>
        <AppText style={styles.productName} numberOfLines={1}>
          {product.name}
        </AppText>

        <View style={styles.unitPill}>
          <AppText style={styles.unitText}>{product.unit}</AppText>
          <AppText style={styles.unitArrow}>⌄</AppText>
        </View>

        <View style={styles.priceRow}>
          <AppText style={styles.price}>₹{product.price}</AppText>
          <AppText style={styles.mrp}>₹{product.mrp}</AppText>
        </View>

        {quantity > 0 ? (
          <View style={styles.quantityWrap}>
            <Pressable style={styles.quantityButton} onPress={onDecrement}>
              <AppText style={styles.quantityButtonText}>−</AppText>
            </Pressable>

            <AppText style={styles.quantityText}>{quantity}</AppText>

            <Pressable style={styles.quantityButton} onPress={onIncrement}>
              <AppText style={styles.quantityButtonText}>+</AppText>
            </Pressable>
          </View>
        ) : (
          <Pressable style={styles.addButton} onPress={onAdd}>
            <AppText style={styles.addButtonText}>Add</AppText>
          </Pressable>
        )}
      </View>
    </View>
  );
}

export function ShopDetailsScreen({ route, navigation }: Props) {
  const { shopId } = route.params;
  const shop = useMemo(() => getShopById(shopId), [shopId]);

  const [bannerIndex, setBannerIndex] = useState(0);
  const bannerRef = useRef<FlatList<string>>(null);
  const { addItem, getItemQuantity, incrementQuantity, decrementQuantity } = useCart();

  useEffect(() => {
    if (!shop || shop.banners.length === 0) {
      return;
    }

    const timer = setInterval(() => {
      const next = (bannerIndex + 1) % shop.banners.length;
      bannerRef.current?.scrollToIndex({ index: next, animated: true });
      setBannerIndex(next);
    }, 2500);

    return () => clearInterval(timer);
  }, [bannerIndex, shop]);

  if (!shop) {
    return (
      <Screen>
        <AppHeader />
        <AppText style={styles.notFoundText}>Shop not found.</AppText>
      </Screen>
    );
  }

  return (
    <Screen>
      <AppHeader />

      <View style={styles.fixedInfoSection}>
        <AppText style={styles.shopTitle}>{shop.name}</AppText>
        <AppText style={styles.shopAddress}>{shop.address}</AppText>
        <AppText style={styles.shopTiming}>Open Hours: {shop.timing}</AppText>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <FlatList
          ref={bannerRef}
          horizontal
          data={shop.banners}
          keyExtractor={(item, index) => `${item}-${index}`}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.bannerImage} resizeMode="cover" />
          )}
          onMomentumScrollEnd={(event) => {
            const nextIndex = Math.round(event.nativeEvent.contentOffset.x / 328);
            setBannerIndex(nextIndex);
          }}
          getItemLayout={(_, index) => ({
            length: 328,
            offset: 328 * index,
            index,
          })}
          contentContainerStyle={styles.bannerList}
        />

        <View style={styles.dotRow}>
          {shop.banners.map((_, idx) => (
            <View
              key={`banner-dot-${idx}`}
              style={[styles.dot, idx === bannerIndex ? styles.dotActive : null]}
            />
          ))}
        </View>

        {shop.subcategories.map((subcategory) => (
          <View key={subcategory.id} style={styles.subcategoryBlock}>
            <View style={styles.subcategoryHeader}>
              <AppText style={styles.subcategoryTitle}>{subcategory.name}</AppText>
              <Pressable
                onPress={() =>
                  navigation.navigate('SubcategoryProducts', {
                    shopId: shop.id,
                    subcategoryId: subcategory.id,
                  })
                }
              >
                <AppText style={styles.subcategoryViewAll}>View All</AppText>
              </Pressable>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productRow}
            >
              {subcategory.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={getItemQuantity(product.id)}
                  onAdd={() => addItem(product)}
                  onIncrement={() => incrementQuantity(product.id)}
                  onDecrement={() => decrementQuantity(product.id)}
                />
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  fixedInfoSection: {
    marginTop: -6,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 10,
  },
  shopTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  shopAddress: {
    marginTop: 4,
    fontSize: 14,
    color: '#4B5563',
  },
  shopTiming: {
    marginTop: 3,
    fontSize: 13,
    color: '#6B7280',
  },
  contentContainer: {
    paddingBottom: 12,
  },
  bannerList: {
    paddingRight: 10,
  },
  bannerImage: {
    width: 328,
    height: 150,
    borderRadius: 12,
    marginRight: 10,
  },
  dotRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    backgroundColor: '#6BA539',
  },
  subcategoryBlock: {
    marginTop: 14,
  },
  subcategoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subcategoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  subcategoryViewAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22A55D',
  },
  productRow: {
    paddingBottom: 8,
    paddingRight: 8,
  },
  productCard: {
    width: 152,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    marginRight: 10,
  },
  discountBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    backgroundColor: '#22C55E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomRightRadius: 8,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  productImage: {
    width: '100%',
    height: 104,
  },
  productBody: {
    paddingHorizontal: 8,
    paddingVertical: 7,
  },
  productBrand: {
    fontSize: 11,
    color: '#6B7280',
  },
  productName: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  unitPill: {
    marginTop: 6,
    height: 28,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    paddingHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  unitText: {
    fontSize: 12,
    color: '#4B5563',
  },
  unitArrow: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 12,
  },
  priceRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  mrp: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  addButton: {
    marginTop: 8,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  quantityWrap: {
    marginTop: 8,
    height: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  quantityButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  quantityButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  quantityText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  notFoundText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4B5563',
  },
});
