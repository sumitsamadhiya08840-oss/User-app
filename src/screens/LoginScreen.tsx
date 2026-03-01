import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '../components/ui/AppButton';
import { AppInput } from '../components/ui/AppInput';
import { AppText } from '../components/ui/AppText';
import { Screen } from '../components/ui/Screen';
import { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const [phone, setPhone] = useState('');

  const handleSendOtp = () => {
    navigation.navigate('OtpVerify', { phone });
  };

  return (
    <Screen scroll>
      <AppText style={styles.title}>Login</AppText>
      <AppText style={styles.subtitle}>Enter your phone number to receive OTP.</AppText>

      <View style={styles.formGroup}>
        <AppInput
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          maxLength={10}
          placeholder="Enter phone number"
        />
        <AppButton title="Send OTP" onPress={handleSendOtp} disabled={phone.trim().length < 10} />
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
  formGroup: {
    marginTop: 32,
    gap: 12,
  },
});
