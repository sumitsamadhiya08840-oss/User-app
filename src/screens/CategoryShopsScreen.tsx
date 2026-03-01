import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppHeader } from '../components/ui/AppHeader';
import { AppText } from '../components/ui/AppText';
import { Screen } from '../components/ui/Screen';
import { getCategoryById } from '../constants/demoShops';
import { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'CategoryShops'>;

export function CategoryShopsScreen({ route, navigation }: Props) {
  const { categoryId } = route.params;
  const category = getCategoryById(categoryId);

  if (!category) {
    return (
      <Screen>
        <AppHeader />
        <AppText style={styles.notFound}>Category not found.</AppText>
      </Screen>
    );
  }

  return (
    <Screen>
      <AppHeader />

      <View style={styles.headerBlock}>
        <AppText style={styles.heading}>{category.name}</AppText>
        <AppText style={styles.subHeading}>All shops in this category</AppText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
        <View style={styles.gridContainer}>
          {category.shops.map((shop) => (
            <View key={shop.id} style={styles.shopCard}>
              <Image source={{ uri: shop.image }} style={styles.shopImage} resizeMode="cover" />

              <View style={styles.shopBody}>
                <AppText style={styles.shopName} numberOfLines={1}>
                  {shop.name}
                </AppText>
                <AppText style={styles.shopAddress} numberOfLines={1}>
                  {shop.address}
                </AppText>
                <AppText style={styles.shopInfo} numberOfLines={1}>
                  {shop.info}
                </AppText>
                <AppText style={styles.shopTiming} numberOfLines={1}>
                  ⏰ {shop.timing}
                </AppText>

                <Pressable
                  style={styles.visitButton}
                  onPress={() => navigation.navigate('ShopDetails', { shopId: shop.id })}
                >
                  <AppText style={styles.visitButtonText}>Visit Shop</AppText>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerBlock: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  subHeading: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B7280',
  },
  listContent: {
    paddingBottom: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  shopCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  shopImage: {
    width: '100%',
    height: 110,
  },
  shopBody: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  shopName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  shopAddress: {
    marginTop: 3,
    fontSize: 11,
    color: '#4B5563',
  },
  shopInfo: {
    marginTop: 3,
    fontSize: 11,
    color: '#6B7280',
  },
  shopTiming: {
    marginTop: 3,
    fontSize: 11,
    color: '#4B5563',
  },
  visitButton: {
    marginTop: 8,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#22A55D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  visitButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  notFound: {
    marginTop: 10,
    fontSize: 16,
    color: '#4B5563',
  },
});
