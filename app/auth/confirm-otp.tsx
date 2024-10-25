import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import { usePostHog } from 'posthog-react-native';
import React, { useState, useEffect, useMemo } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Vibration, Alert } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '@/theme';

const Page = () => {
  const paramsLocal = useLocalSearchParams<{
    phoneNumber: string;
    redirect: 'signup' | 'signin';
  }>();

  useEffect(() => {
    console.log(paramsLocal);
  }, []);
  const router = useRouter();
  const [timer, setTimer] = useState(59);
  const [isCodeResent, setIsCodeResent] = useState(false);
  // Timer for resend button
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Function to handle OTP submission
  const handleOtpFilled = (enteredOtp: string) => {
    if (enteredOtp === '123456') {
      // Alert.alert('Success', 'OTP verified successfully!');

      if (paramsLocal.redirect == 'signin') {
        router.replace('/home');
      } else if (paramsLocal.redirect === 'signup') {
        router.replace(`/auth/fill-credentials?user=${paramsLocal.phoneNumber}`);
      } else {
        Alert.alert('There was an unexpected error');
      }
    } else {
      Vibration.vibrate(500); // Vibrate on incorrect OTP
      Alert.alert('Error', 'Incorrect OTP. Please try again.');
    }
  };

  // Handle resend code action
  const handleResendCode = () => {
    setIsCodeResent(true);
    setTimer(59);
    Alert.alert('Code Resent', 'A new code has been sent to your phone.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Verify Account</Text>
      <View style={styles.otpContainer}>
        <Text style={styles.otpText}>
          We have sent a 6-digit code via SMS to {paramsLocal.phoneNumber}. Please enter the code
          below to verify your identity.
        </Text>
        <OtpInput
          focusColor={theme.SECONDARY_COLOR_LIGHT}
          autoFocus={false}
          theme={{
            pinCodeContainerStyle: {
              borderColor: theme.SECONDARY_COLOR,
            },
            focusStickStyle: {
              borderColor: theme.SECONDARY_COLOR_LIGHT,
            },
          }}
          onFilled={handleOtpFilled}
        />

        <View style={styles.otpResendContainer}>
          <Text style={styles.otpSubtitle}>Didn't get the code?</Text>
          <TouchableOpacity
            style={styles.otpResendButton}
            onPress={handleResendCode}
            disabled={timer > 0}>
            <Text
              style={{
                fontSize: 16,
                color: timer > 0 ? 'grey' : '#2d64f5',
                cursor: 'pointer',
              }}>
              {timer > 0 ? `Send the code again [${timer}s].` : 'Send the code again.'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.PRIMARY_COLOR,
    height: '100%',
    paddingHorizontal: 20,
    paddingTop: 60,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 32,
  },
  titleText: {
    fontSize: 36,
    letterSpacing: 2,
    color: theme.SECONDARY_COLOR,
    textAlign: 'center',
  },
  otpContainer: {
    paddingHorizontal: 20,
    backgroundColor: theme.PRIMARY_COLOR_DARK,
    paddingVertical: 40,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    gap: 40,
  },
  otpText: {
    textAlign: 'center',
    fontSize: 20,
  },
  otpResendContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignSelf: 'center',
  },
  otpSubtitle: {
    fontSize: 16,
  },
  otpResendButton: {},
});

export default Page;
