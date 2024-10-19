import { Text } from 'react-native';
import React from 'react';

interface ConfirmOTPBottomSheetUI {
  onSubmit: (code: string) => void;
}

export function ConfirmOTPBottomSheetUI() {
  return <Text>Confirm OTP</Text>;
}
