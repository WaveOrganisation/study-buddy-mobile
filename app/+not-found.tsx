import { Link, Stack } from "expo-router";
import { H2, Text, View } from "tamagui";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View flex={1} justifyContent={"center"} alignItems={"center"}>
        <H2 textAlign={"center"}>Ooops! Page not found</H2>
        <Text textAlign={"center"}>The page you are looking for does not exist.</Text>
      </View>
    </>
  );
}
