import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import GestureGoBack from "@/components/gestureGoBack";
import { ConfirmOtp } from "@/components/ConfirmOTPUI";
import { query } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { Vibration } from "react-native";
import { ApiRoutes } from "@/utils/endpoints";

// Page Component
const Page = () => {
  const mutation = useMutation({
    mutationFn: async ({ phoneNumber, code }: { phoneNumber: string; code: string }) => {
      return await query<{ confirmationCode: string }>(ApiRoutes.VerifyOtp, {
        phoneNumber,
        confirmationCode: code,
      });
    },
    onSuccess: async (data) => {
      if (data.response.ok) {
        router.replace("/auth/fill-credentials");
      } else {
        console.log("Error confirming phone");
        Vibration.vibrate(500); // Vibrate on incorrect OTP
      }
    },
  });
  const params = useLocalSearchParams<{ phoneNumber: string }>();

  console.log(params);

  const router = useRouter();
  // const [isCodeResent, setIsCodeResent] = useState(false);

  // Function to handle OTP submission
  const handleOtpFilled = (enteredOtp: string) => {
    mutation.mutate({ phoneNumber: params.phoneNumber, code: enteredOtp });
  };

  // Handle resend code action
  const handleResendCode = () => {};

  return (
    <>
      <GestureGoBack />
      <ConfirmOtp
        phoneNumber={params.phoneNumber}
        onFilled={handleOtpFilled}
        onResend={handleResendCode}
      />
    </>
  );
};

export default Page;
