import { StyleSheet, View } from 'react-native';

import { useCity } from '../../contexts/CityContext';
import { AppText } from './AppText';

export function AppHeader() {
  const { city } = useCity();

  return (
    <View style={styles.headerShell}>
      <View style={styles.topRow}>
        <View style={styles.brandRow}>
          <AppText style={styles.brandIcon}>🛒</AppText>
          <AppText style={styles.brandText}>bigbasket</AppText>
        </View>
        <View style={styles.profilePill}>
          <AppText style={styles.profileIcon}>◌</AppText>
        </View>
      </View>

      <View style={styles.locationRow}>
        <View>
          <AppText style={styles.deliveryText}>Get it in 1 day</AppText>
          <AppText style={styles.locationText}>{city?.name ?? 'Select City'}</AppText>
        </View>
        <AppText style={styles.arrowText}>›</AppText>
      </View>

      <View style={styles.searchBar}>
        <AppText style={styles.searchPlaceholder}>Search 18000+ products</AppText>
        <AppText style={styles.searchIcon}>🎤</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerShell: {
    marginBottom: 16,
    marginHorizontal: -16,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: '#6BA539',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  brandIcon: {
    fontSize: 14,
    color: '#F97316',
  },
  brandText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#D1FAE5',
  },
  profilePill: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    color: '#E5E7EB',
    fontSize: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  deliveryText: {
    fontSize: 12,
    color: '#F3F4F6',
    fontWeight: '600',
  },
  locationText: {
    marginTop: 2,
    fontSize: 15,
    color: '#F9FAFB',
    fontWeight: '500',
  },
  arrowText: {
    color: '#F9FAFB',
    fontSize: 22,
    lineHeight: 22,
  },
  searchBar: {
    height: 36,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchPlaceholder: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  searchIcon: {
    fontSize: 16,
    color: '#9CA3AF',
  },
});
