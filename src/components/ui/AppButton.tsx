import { Pressable, PressableProps, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { AppText } from './AppText';

type AppButtonProps = PressableProps & {
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost';
};

const buttonVariantStyle: Record<NonNullable<AppButtonProps['variant']>, ViewStyle> = {
  primary: {
    backgroundColor: '#2563EB',
  },
  secondary: {
    backgroundColor: '#E5E7EB',
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
};

const textVariantStyle: Record<NonNullable<AppButtonProps['variant']>, TextStyle> = {
  primary: { color: '#FFFFFF' },
  secondary: { color: '#111827' },
  ghost: { color: '#1F2937' },
};

export function AppButton({ title, variant = 'primary', disabled, ...props }: AppButtonProps) {
  return (
    <Pressable
      style={[styles.button, buttonVariantStyle[variant], disabled ? styles.disabled : null]}
      disabled={disabled}
      {...props}
    >
      <AppText style={[styles.buttonText, textVariantStyle[variant]]}>{title}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});
