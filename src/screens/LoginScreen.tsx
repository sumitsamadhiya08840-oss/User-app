import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '../components/ui/AppButton';
import { AppInput } from '../components/ui/AppInput';
import { AppText } from '../components/ui/AppText';
import { Screen } from '../components/ui/Screen';
import { AuthStackParamList } from '../navigation/types';
import { digitsOnly } from '../utils/format';
import { isValidIndianPhone } from '../utils/validators';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const normalizedPhone = digitsOnly(phone).slice(0, 10);
  const isPhoneValid = isValidIndianPhone(normalizedPhone);
  const phoneError =
    normalizedPhone.length > 0 && !isPhoneValid ? 'Enter a valid 10-digit mobile number' : '';

  const handlePhoneChange = (value: string) => {
    setPhone(digitsOnly(value).slice(0, 10));
  };

  const handleSendOtp = async () => {
    if (!isPhoneValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    navigation.navigate('OtpVerify', { phone: normalizedPhone });
  };

  return (
    <Screen scroll>
      <AppText style={styles.title}>Login</AppText>
      <AppText style={styles.subtitle}>Enter your mobile number to continue</AppText>

      <View style={styles.formGroup}>
        <AppInput
          label="Mobile Number"
          value={normalizedPhone}
          onChangeText={handlePhoneChange}
          keyboardType="number-pad"
          maxLength={10}
          placeholder="10-digit mobile number"
          error={phoneError}
          leftAddon={<AppText style={styles.codeText}>+91</AppText>}
        />
        <AppButton
          title="Send OTP"
          onPress={handleSendOtp}
          disabled={!isPhoneValid}
          loading={isSubmitting}
        />
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
  codeText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
    minWidth: 36,
  },
});
