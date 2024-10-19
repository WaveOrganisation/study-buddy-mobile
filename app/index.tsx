import { LogBox, View } from 'react-native';

import Paper from '@/components/ui/paper';
import Typography from '@/components/ui/typography';
import { Link, Redirect, useRouter } from 'expo-router';
import { usePostHog } from 'posthog-react-native';
import { useEffect } from 'react';

LogBox.ignoreLogs([
  'fontFamily "Londrina-Sketch" is not a system font and has not been loaded through expo-font.',
]);

export default function Home() {
  return (
    <>
      <Redirect href={'/auth'} />
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
