import { StyleSheet, View } from 'react-native';

import { AppHeader } from '../components/ui/AppHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { Screen } from '../components/ui/Screen';

export function SearchScreen() {
  return (
    <Screen>
      <AppHeader />
      <View style={styles.contentWrap}>
        <EmptyState
          title="Search products"
          description="Find groceries, medicines, and essentials from nearby shops."
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  contentWrap: {
    flex: 1,
    paddingBottom: 8,
  },
});
