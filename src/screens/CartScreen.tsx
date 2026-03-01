import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppHeader } from '../components/ui/AppHeader';
import { AppButton } from '../components/ui/AppButton';
import { AppText } from '../components/ui/AppText';
import { Screen } from '../components/ui/Screen';
import { useCart } from '../contexts/CartContext';

export function CartScreen() {
  const {
    items,
    itemCount,
    subtotal,
    savings,
    totalMrp,
    incrementQuantity,
    decrementQuantity,
    removeItem,
  } = useCart();

  const deliveryCharge = itemCount > 0 ? 25 : 0;
  const grandTotal = subtotal + deliveryCharge;

  return (
    <Screen>
      <AppHeader />

      <View style={styles.pageHeaderRow}>
        <AppText style={styles.pageTitle}>My Cart</AppText>
        <AppText style={styles.itemCountText}>{itemCount} items</AppText>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <AppText style={styles.emptyEmoji}>🛒</AppText>
          <AppText style={styles.emptyTitle}>Your cart is empty</AppText>
          <AppText style={styles.emptySubtitle}>
            Add products from shops to place your order.
          </AppText>
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          >
            {items.map((item) => (
              <View key={item.product.id} style={styles.itemCard}>
                <Image
                  source={{ uri: item.product.image }}
                  style={styles.itemImage}
                  resizeMode="cover"
                />

                <View style={styles.itemInfo}>
                  <AppText style={styles.itemName} numberOfLines={1}>
                    {item.product.name}
                  </AppText>
                  <AppText style={styles.itemMeta} numberOfLines={1}>
                    {item.product.brand} • {item.product.unit}
                  </AppText>

                  <View style={styles.priceRow}>
                    <AppText style={styles.currentPrice}>₹{item.product.price}</AppText>
                    <AppText style={styles.oldPrice}>₹{item.product.mrp}</AppText>
                  </View>

                  <View style={styles.controlsRow}>
                    <View style={styles.quantityWrap}>
                      <Pressable
                        style={styles.quantityButton}
                        onPress={() => decrementQuantity(item.product.id)}
                      >
                        <AppText style={styles.quantityButtonText}>−</AppText>
                      </Pressable>

                      <AppText style={styles.quantityText}>{item.quantity}</AppText>

                      <Pressable
                        style={styles.quantityButton}
                        onPress={() => incrementQuantity(item.product.id)}
                      >
                        <AppText style={styles.quantityButtonText}>+</AppText>
                      </Pressable>
                    </View>

                    <Pressable onPress={() => removeItem(item.product.id)}>
                      <AppText style={styles.removeText}>Remove</AppText>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}

            <View style={styles.billCard}>
              <AppText style={styles.billTitle}>Bill Details</AppText>

              <View style={styles.billRow}>
                <AppText style={styles.billLabel}>MRP Total</AppText>
                <AppText style={styles.billValue}>₹{totalMrp}</AppText>
              </View>
              <View style={styles.billRow}>
                <AppText style={styles.billLabel}>Product Total</AppText>
                <AppText style={styles.billValue}>₹{subtotal}</AppText>
              </View>
              <View style={styles.billRow}>
                <AppText style={styles.billLabel}>Delivery Charge</AppText>
                <AppText style={styles.billValue}>₹{deliveryCharge}</AppText>
              </View>
              <View style={styles.billRow}>
                <AppText style={styles.savingLabel}>You Save</AppText>
                <AppText style={styles.savingValue}>₹{savings}</AppText>
              </View>

              <View style={styles.totalDivider} />

              <View style={styles.billRow}>
                <AppText style={styles.grandLabel}>To Pay</AppText>
                <AppText style={styles.grandValue}>₹{grandTotal}</AppText>
              </View>
            </View>
          </ScrollView>

          <View style={styles.checkoutBar}>
            <View>
              <AppText style={styles.checkoutAmount}>₹{grandTotal}</AppText>
              <AppText style={styles.checkoutText}>Including delivery</AppText>
            </View>
            <View style={styles.checkoutButtonWrap}>
              <AppButton title="Proceed" />
            </View>
          </View>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  pageHeaderRow: {
    marginTop: -4,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  itemCountText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -40,
  },
  emptyEmoji: {
    fontSize: 44,
  },
  emptyTitle: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  emptySubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#6B7280',
  },
  listContent: {
    paddingBottom: 20,
  },
  itemCard: {
    flexDirection: 'row',
    gap: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  itemMeta: {
    marginTop: 3,
    fontSize: 12,
    color: '#6B7280',
  },
  priceRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  currentPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  oldPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  controlsRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
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
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  quantityText: {
    width: 32,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  removeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
  },
  billCard: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    padding: 12,
  },
  billTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  billRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  billLabel: {
    fontSize: 13,
    color: '#4B5563',
  },
  billValue: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '600',
  },
  savingLabel: {
    fontSize: 13,
    color: '#16A34A',
    fontWeight: '600',
  },
  savingValue: {
    fontSize: 13,
    color: '#16A34A',
    fontWeight: '700',
  },
  totalDivider: {
    marginTop: 8,
    marginBottom: 6,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  grandLabel: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '700',
  },
  grandValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '800',
  },
  checkoutBar: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  checkoutAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  checkoutText: {
    marginTop: 2,
    fontSize: 12,
    color: '#6B7280',
  },
  checkoutButtonWrap: {
    width: 140,
  },
});
