import { StyleSheet, View } from 'react-native';

import { AppHeader } from '../components/ui/AppHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { Screen } from '../components/ui/Screen';

export function OrdersScreen() {
  return (
    <Screen>
      <AppHeader />
      <View style={styles.contentWrap}>
        <EmptyState
          title="No orders yet"
          description="Your placed orders will appear here once you checkout from cart."
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
