import { BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRoute } from '@react-navigation/core';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { z } from 'zod';

import { phoneNumberRegex } from '@/shared/regex';
import { theme } from '@/theme';

interface SignUpProps {
  onSubmit: (username: string, password: string) => void;
}

const signUpSchema = z.object({
  user: z.string().regex(phoneNumberRegex, 'Please enter a valid phone number'),
});

const SignUpBottomSheetUI = ({ onSubmit }: SignUpProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      user: '',
    },
  });
  const handleSubmit = form.handleSubmit((data) => {
    router.push(`/auth/confirm-otp?phoneNumber=${data.user}&redirect=signup`);
  });

  return (
    <BottomSheetView style={styles.container}>
      <Text style={styles.titleText}>Create Account</Text>
      <Text style={styles.subtitleText}>
        Please enter your mobile number, so we can create you an account.
      </Text>
      <BottomSheetView style={styles.inputsContainer}>
        <BottomSheetView style={styles.inputContainer}>
          <Text style={[styles.inputLabel, form.formState.errors['user'] ? { color: 'red' } : {}]}>
            Mobile Number
          </Text>
          <Controller
            control={form.control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <BottomSheetTextInput
                  // autoFocus
                  autoComplete="tel"
                  placeholder="Mobile Number"
                  style={[
                    styles.input,
                    form.formState.errors['user'] ? { borderColor: 'red' } : {},
                  ]}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholderTextColor={theme.SECONDARY_COLOR_LIGHT}
                />
              );
            }}
            name="user"
          />
          <Text
            style={[styles.inputHelperText, form.formState.errors['user'] ? { color: 'red' } : {}]}>
            {form.formState.errors['user']
              ? form.formState.errors['user'].message
              : 'Please enter your mobile number.'}
          </Text>
        </BottomSheetView>
      </BottomSheetView>
      <BottomSheetView style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text
            style={{
              color: '#FAFAFA',
              fontWeight: 'semibold',
            }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheetView>
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

export default SignUpBottomSheetUI;
