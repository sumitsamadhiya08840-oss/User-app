import { AppHeader } from '../components/ui/AppHeader';
import { BannerCarousel } from '../components/ui/BannerCarousel';
import { CategoryShopsSection } from '../components/ui/CategoryShopsSection';
import { AppFooter } from '../components/ui/AppFooter';
import { Screen } from '../components/ui/Screen';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMain'>;

export function HomeScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.bannerWrap}>
          <BannerCarousel />
        </View>
        <CategoryShopsSection
          onVisitShop={(shopId) => {
            navigation.navigate('ShopDetails', { shopId });
          }}
          onViewAllCategory={(categoryId) => {
            navigation.navigate('CategoryShops', { categoryId });
          }}
        />
        <AppFooter />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 0,
  },
  bannerWrap: {
    marginBottom: 16,
  },
});
