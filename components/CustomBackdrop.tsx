import { BottomSheetBackdropProps, useBottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated";

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [0, 1], [0, 1], Extrapolate.CLAMP),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  const bottomSheet = useBottomSheetModal();

  return <Animated.Text style={containerStyle} onPress={bottomSheet.dismissAll} />;
};

export default CustomBackdrop;
