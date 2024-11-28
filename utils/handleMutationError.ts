import Toast from "react-native-toast-message";

const defaultErrorMessage = "Something went wrong";

export default async function handleMutationError(cb: () => Promise<void>) {
  try {
    await cb();
  } catch (error: unknown) {
    let errorMessage = error instanceof Error ? error.message : error;
    if (typeof errorMessage !== "string" || errorMessage.length === 0) {
      errorMessage = defaultErrorMessage;
    }

    Toast.show({
      type: "error",
      swipeable: true,
      position: "top",
      autoHide: true,
      text1: errorMessage as string,
    });
  }
}
