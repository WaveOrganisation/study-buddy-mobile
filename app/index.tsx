import { Redirect } from "expo-router";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  'fontFamily "Londrina-Sketch" is not a system font and has not been loaded through expo-font.',
]);

export default function Home() {
  const isLoggedIn = false;

  if (isLoggedIn) {
    return (
      <>
        <Redirect href="/(authenticated)" />
      </>
    );
  }

  return (
    <>
      <Redirect href="/auth" />
    </>
  );
}
