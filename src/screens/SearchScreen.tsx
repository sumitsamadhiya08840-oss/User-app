import { AppHeader } from '../components/ui/AppHeader';
import { AppText } from '../components/ui/AppText';
import { Screen } from '../components/ui/Screen';

export function SearchScreen() {
  return (
    <Screen>
      <AppHeader />
      <AppText style={{ fontSize: 16, color: '#4B5563' }}>Search content placeholder.</AppText>
    </Screen>
  );
}
