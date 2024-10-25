import Feather from '@expo/vector-icons/Feather';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { usePostHog } from 'posthog-react-native';
import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';

import { theme } from '@/theme';

interface SignInProps {
  onSubmit: (username: string, password: string) => void;
}
const SignInBottomSheetUI = ({ onSubmit }: SignInProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((s) => !s);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Welcome Back!</Text>
      <Text style={styles.subtitleText}>
        Please enter your credentials to sign in your account.
      </Text>
      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>User</Text>
          <BottomSheetTextInput
            // autoFocus
            autoComplete="username"
            placeholder="User"
            style={styles.input}
            placeholderTextColor={theme.SECONDARY_COLOR_LIGHT}
          />
          <Text style={styles.inputHelperText}>
            Please enter your username or your phone number.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <BottomSheetTextInput
            secureTextEntry={!showPassword}
            autoComplete="current-password"
            placeholder="Password"
            style={styles.input}
            placeholderTextColor={theme.SECONDARY_COLOR_LIGHT}
          />

          <View style={styles.passwordIconContainer}>
            <Feather
              style={styles.passwordIcon}
              name={showPassword ? 'eye-off' : 'eye'}
              onPress={handleTogglePassword}
            />
          </View>

          <Text style={styles.inputHelperText}>Please enter your password.</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onSubmit('test', 'test');
          }}>
          <Text
            style={{
              color: '#FAFAFA',
              fontWeight: 'semibold',
            }}>
            Sign In
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            color: '#403958',
            paddingHorizontal: 20,
          }}>
          Forgot your password?{' '}
          <Text
            style={{
              textDecorationLine: 'underline',
              color: '#403958',
            }}>
            Reset it here
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  titleText: {
    fontSize: 44,
    top: '12%',
    letterSpacing: 4,
    color: '#403958',
    textAlign: 'center',
    marginTop: -40,
    marginBottom: 40,
  },
  subtitleText: {
    fontSize: 20,
    color: '#403958',
    textAlign: 'center',
    width: '80%',
    marginHorizontal: 'auto',
    marginVertical: 24,
  },
  inputsContainer: {
    flexDirection: 'column',
    // paddingHorizontal: 10,
    gap: 20,
  },
  inputContainer: {
    position: 'relative',
  },
  inputLabel: {
    fontSize: 18,
    color: theme.SECONDARY_COLOR, // Dark text for label
    marginBottom: 5,
    fontWeight: '600', // Semi-bold text
  },
  input: {
    borderColor: theme.SECONDARY_COLOR, // Light gray border
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    color: '#111827', // Dark gray text
  },
  inputHelperText: {
    fontSize: 14,
    color: '#6b7280', // Gray helper text
    marginTop: 5,
    marginLeft: 10,
  },
  buttonContainer: {
    marginVertical: 20,
    display: 'flex',
    gap: 16,
  },
  button: {
    padding: 12, // p-3 translates to padding: 12px (3 * 4px)
    borderRadius: 8, // rounded-md translates to border-radius: 8px
    alignItems: 'center', // items-center aligns items to the center
    borderColor: '#403958', // border-white
    borderWidth: 0, // border-none
    backgroundColor: '#403958', // bg-white
  },
  passwordIconContainer: {
    position: 'absolute',
    right: 14,
    top: '50%',
    transform: [{ translateY: -8 }],
  },
  passwordIcon: {
    color: '#403958',
    fontSize: 22,
  },
});

export default SignInBottomSheetUI;
