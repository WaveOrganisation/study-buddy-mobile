import * as React from 'react';
import { View, Text, TextInput, Animated, Easing, TextInputProps } from 'react-native';

import { cn } from '@/utils/cn';

export interface FloatingLabelInputProps extends TextInputProps {
  label: string;
}

const FloatingLabelInput = React.forwardRef<TextInput, FloatingLabelInputProps>(
  ({ label, className, value, onChangeText, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const labelPosition = React.useRef(new Animated.Value(value ? 0 : 1)).current;

    const handleFocus = () => {
      setIsFocused(true);
      Animated.timing(labelPosition, {
        toValue: 0, // Move label to top
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    };

    const handleBlur = () => {
      if (!value) {
        setIsFocused(false);
        Animated.timing(labelPosition, {
          toValue: 1, // Move label to center
          duration: 150,
          isInteraction: true,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
      }
    };

    const labelStyle = {
      top: labelPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [-8, 14], // Top when focused, center when not
      }),
      fontSize: labelPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 16], // Smaller when focused, larger when not
      }),
      color: isFocused ? '#3B82F6' : '#6B7280', // Primary when focused, gray when not
    };

    return (
      <View className="relative w-full">
        <TextInput
          ref={ref}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          style={{ paddingTop: 10 }} // Ensure space for label
          className={cn(
            'w-full px-3 py-2 text-base bg-transparent border-2 border-gray-300 rounded-md focus:border-primary focus:outline-none',
            className
          )}
          {...props}
        />
        <Animated.Text
          style={[labelStyle, { position: 'absolute', left: 12, paddingHorizontal: 4 }]}>
          {label}
        </Animated.Text>
      </View>
    );
  }
);

export { FloatingLabelInput };
