import { StyleSheet, View } from 'react-native';

import { AppButton } from '../components/ui/AppButton';
import { AppHeader } from '../components/ui/AppHeader';
import { AppText } from '../components/ui/AppText';
import { Screen } from '../components/ui/Screen';
import { useAuth } from '../contexts/AuthContext';
import { useCity } from '../contexts/CityContext';

export function ProfileScreen() {
  const { city, clearCity } = useCity();
  const { logout } = useAuth();

  const handleChangeCity = async () => {
    await clearCity();
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Screen scroll>
      <AppHeader />
      <AppText style={styles.cityText}>
        Selected city: {city?.name ?? 'Not selected'}
      </AppText>

      <View style={styles.actions}>
        <AppButton title="Change City" variant="secondary" onPress={handleChangeCity} />
        <AppButton title="Logout" variant="ghost" onPress={handleLogout} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cityText: {
    fontSize: 16,
    color: '#374151',
  },
  actions: {
    marginTop: 24,
    gap: 12,
  },
});
