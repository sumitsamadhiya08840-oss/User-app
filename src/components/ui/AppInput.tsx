import { StyleSheet, TextInput, TextInputProps } from 'react-native';

type AppInputProps = TextInputProps;

export function AppInput({ style, ...props }: AppInputProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor="#9CA3AF"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
  },
});
