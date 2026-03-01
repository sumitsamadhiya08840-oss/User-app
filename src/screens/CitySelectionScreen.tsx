import { StyleSheet, View } from 'react-native';

import { AppButton } from '../components/ui/AppButton';
import { AppText } from '../components/ui/AppText';
import { Screen } from '../components/ui/Screen';
import { useCity } from '../contexts/CityContext';

const COMING_SOON_CITIES = ['Indore', 'Bhopal', 'Delhi'];

export function CitySelectionScreen() {
  const { setCity } = useCity();

  const handleSelectGwalior = async () => {
    await setCity({
      city_id: 'gwalior',
      name: 'Gwalior',
    });
  };

  return (
    <Screen scroll>
      <AppText style={styles.title}>Choose Your City</AppText>
      <AppText style={styles.subtitle}>
        Service is currently available in select locations.
      </AppText>

      <View style={styles.activeSection}>
        <AppButton title="Gwalior" onPress={handleSelectGwalior} />
      </View>

      <View style={styles.comingSoonSection}>
        <AppText style={styles.comingSoonTitle}>Coming Soon</AppText>
        <View style={styles.buttonGroup}>
          {COMING_SOON_CITIES.map((city) => (
            <AppButton key={city} title={city} variant="ghost" disabled />
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    marginTop: 8,
    color: '#6B7280',
  },
  activeSection: {
    marginTop: 32,
    gap: 12,
  },
  comingSoonSection: {
    marginTop: 40,
  },
  comingSoonTitle: {
    marginBottom: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  buttonGroup: {
    gap: 12,
  },
});
