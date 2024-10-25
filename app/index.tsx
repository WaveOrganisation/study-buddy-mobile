import { Redirect } from 'expo-router';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'fontFamily "Londrina-Sketch" is not a system font and has not been loaded through expo-font.',
]);

export default function Home() {
  const isLoggedIn = false;

  if (isLoggedIn) {
    return (
      <>
        <Redirect href="/home" />
      </>
    );
  }

  return (
    <>
      <Redirect href="/auth/sheet" />
      {/*<View className="flex h-full items-center justify-center p-7 bg-white dark:bg-black">*/}
      {/*  <Paper className="p-5">*/}
      {/*    <Typography>INDEX FILE</Typography>*/}
      {/*    <Link href={'/auth'} replace>*/}
      {/*      Go to Auth*/}
      {/*    </Link>*/}
      {/*  </Paper>*/}
      {/*</View>*/}
    </>
  );
}
