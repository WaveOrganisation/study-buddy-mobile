import { useEffect } from "react";
import { BackHandler } from "react-native";
import { useRouter } from "expo-router";

const GestureGoBack = () => {
  const router = useRouter();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      router.canGoBack() && router.back();
      return true;
    });

    return () => {
      backHandler.remove();
    };
  }, []);

  return null;
};

export default GestureGoBack;
