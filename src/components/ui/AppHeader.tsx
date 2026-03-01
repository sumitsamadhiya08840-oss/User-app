import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { useCity } from '../../contexts/CityContext';
import { addRecentSearch } from '../../services/search/recentSearchesService';
import { SearchSuggestionType, searchAll } from '../../services/search/searchService';
import { AppText } from './AppText';

type AppHeaderProps = {
  enableSearchInput?: boolean;
  searchValue?: string;
  onSearchChangeText?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
  onSearchClear?: () => void;
  searchPlaceholder?: string;
  searchAutoFocus?: boolean;
  onSearchPress?: () => void;
};

export function AppHeader({
  enableSearchInput = false,
  searchValue = '',
  onSearchChangeText,
  onSearchSubmit,
  onSearchClear,
  searchPlaceholder = 'Search 18000+ products',
  searchAutoFocus = false,
  onSearchPress,
}: AppHeaderProps) {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { city, clearCity } = useCity();
  const [localQuery, setLocalQuery] = useState('');
  const [localMode, setLocalMode] = useState<'suggestions' | 'results'>('suggestions');

  const isControlled = typeof onSearchChangeText === 'function';
  const activeQuery = (isControlled ? searchValue : localQuery).trim();
  const localSearchResult = useMemo(() => searchAll(activeQuery), [activeQuery]);

  const iconBySuggestionType: Record<SearchSuggestionType, string> = {
    Shop: '🏪',
    Product: '🛍️',
    Category: '🏷️',
  };

  const hasLocalResults =
    localSearchResult.shops.length > 0 ||
    localSearchResult.products.length > 0 ||
    localSearchResult.categories.length > 0;

  const handleLocationPress = async () => {
    await clearCity();
  };

  const handleShopPress = async (shopId: string, shopName: string) => {
    await addRecentSearch(shopName);
    navigation.navigate('Home', {
      screen: 'ShopDetails',
      params: { shopId },
    });
    setLocalQuery('');
  };

  const handleCategoryPress = async (categoryId: string, categoryName: string) => {
    await addRecentSearch(categoryName);
    navigation.navigate('Home', {
      screen: 'CategoryShops',
      params: { categoryId },
    });
    setLocalQuery('');
  };

  const handleProductPress = async (productName: string) => {
    await addRecentSearch(productName);
    Alert.alert('Coming soon', 'Product detail coming soon');
    setLocalQuery('');
  };

  const handleLocalSubmit = async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }

    setLocalMode('results');
    await addRecentSearch(trimmed);
  };

  const handleSearchChange = (value: string) => {
    if (isControlled) {
      onSearchChangeText?.(value);
      return;
    }

    setLocalQuery(value);
    setLocalMode('suggestions');
  };

  const handleSearchSubmit = (value: string) => {
    if (isControlled) {
      onSearchSubmit?.(value);
      return;
    }

    handleLocalSubmit(value);
  };

  const handleSearchClear = () => {
    if (isControlled) {
      onSearchClear?.();
      return;
    }

    setLocalQuery('');
    setLocalMode('suggestions');
  };

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

      <Pressable
        style={styles.locationRow}
        onPress={handleLocationPress}
        accessibilityRole="button"
      >
        <View>
          <AppText style={styles.deliveryText}>Get it in 1 day</AppText>
          <AppText style={styles.locationText}>{city?.name ?? 'Select City'}</AppText>
        </View>
        <AppText style={styles.arrowText}>›</AppText>
      </Pressable>

      {enableSearchInput ? (
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            value={isControlled ? searchValue : localQuery}
            onChangeText={handleSearchChange}
            placeholder={searchPlaceholder}
            placeholderTextColor="#9CA3AF"
            returnKeyType="search"
            autoFocus={searchAutoFocus}
            onSubmitEditing={(event) => handleSearchSubmit(event.nativeEvent.text)}
          />

          {(isControlled ? searchValue : localQuery).trim().length > 0 ? (
            <Pressable style={styles.clearButton} onPress={handleSearchClear}>
              <AppText style={styles.clearButtonText}>✕</AppText>
            </Pressable>
          ) : (
            <AppText style={styles.searchIcon}>🎤</AppText>
          )}
        </View>
      ) : (
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            value={localQuery}
            onChangeText={handleSearchChange}
            placeholder={searchPlaceholder}
            placeholderTextColor="#9CA3AF"
            returnKeyType="search"
            onSubmitEditing={(event) => handleSearchSubmit(event.nativeEvent.text)}
            onFocus={() => onSearchPress?.()}
          />

          {localQuery.trim().length > 0 ? (
            <Pressable style={styles.clearButton} onPress={handleSearchClear}>
              <AppText style={styles.clearButtonText}>✕</AppText>
            </Pressable>
          ) : (
            <Pressable style={styles.searchPressable} onPress={onSearchPress}>
              <AppText style={styles.searchIcon}>🎤</AppText>
            </Pressable>
          )}
        </View>
      )}

      {!enableSearchInput && localQuery.trim().length > 0 ? (
        <View style={styles.searchPanel}>
          {localMode === 'suggestions' ? (
            <>
              {localSearchResult.suggestions.slice(0, 6).map((suggestion) => (
                <Pressable
                  key={suggestion.id}
                  style={styles.suggestionRow}
                  onPress={() => handleLocalSubmit(suggestion.label)}
                >
                  <AppText style={styles.suggestionIcon}>
                    {iconBySuggestionType[suggestion.type]}
                  </AppText>
                  <AppText style={styles.suggestionLabel}>{suggestion.label}</AppText>
                  <View style={styles.typeBadge}>
                    <AppText style={styles.typeBadgeText}>{suggestion.type}</AppText>
                  </View>
                </Pressable>
              ))}
            </>
          ) : hasLocalResults ? (
            <>
              {localSearchResult.shops.slice(0, 3).map((shop) => (
                <Pressable
                  key={shop.id}
                  style={styles.resultRow}
                  onPress={() => handleShopPress(shop.id, shop.name)}
                >
                  <AppText style={styles.resultPrimary}>🏪 {shop.name}</AppText>
                </Pressable>
              ))}

              {localSearchResult.products.slice(0, 3).map((product) => (
                <Pressable
                  key={product.id}
                  style={styles.resultRow}
                  onPress={() => handleProductPress(product.name)}
                >
                  <AppText style={styles.resultPrimary}>🛍️ {product.name}</AppText>
                </Pressable>
              ))}

              {localSearchResult.categories.slice(0, 3).map((category) => (
                <Pressable
                  key={category.id}
                  style={styles.resultRow}
                  onPress={() => handleCategoryPress(category.id, category.name)}
                >
                  <AppText style={styles.resultPrimary}>🏷️ {category.name}</AppText>
                </Pressable>
              ))}
            </>
          ) : (
            <AppText style={styles.noResultsText}>No results found</AppText>
          )}
        </View>
      ) : null}
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
  searchPressable: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  searchPanel: {
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    padding: 8,
    maxHeight: 280,
  },
  suggestionRow: {
    minHeight: 40,
    borderRadius: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggestionIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  suggestionLabel: {
    flex: 1,
    fontSize: 13,
    color: '#111827',
    fontWeight: '600',
  },
  typeBadge: {
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  typeBadgeText: {
    fontSize: 10,
    color: '#3730A3',
    fontWeight: '700',
  },
  resultRow: {
    minHeight: 38,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  resultPrimary: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '600',
  },
  noResultsText: {
    paddingVertical: 12,
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 13,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    height: 34,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  searchIcon: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  clearButtonText: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '700',
  },
});
