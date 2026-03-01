import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '../components/ui/AppButton';
import { AppInput } from '../components/ui/AppInput';
import { AppText } from '../components/ui/AppText';
import { Screen } from '../components/ui/Screen';
import { useAuth } from '../contexts/AuthContext';
import { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'OtpVerify'>;

export function OtpVerifyScreen({ route }: Props) {
  const { verifyOtp } = useAuth();
  const [otp, setOtp] = useState('');

  const handleVerify = async () => {
    await verifyOtp(otp);
  };

  return (
    <Screen scroll>
      <AppText style={styles.title}>Verify OTP</AppText>
      <AppText style={styles.subtitle}>
        OTP sent to {route.params.phone || 'your number'}.
      </AppText>

      <View style={styles.formGroup}>
        <AppInput
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={6}
          placeholder="Enter 6-digit OTP"
        />
        <AppButton title="Verify" onPress={handleVerify} disabled={otp.trim().length < 4} />
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
