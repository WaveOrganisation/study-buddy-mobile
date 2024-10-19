import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomBackdrop from '@/components/CustomBackdrop';

const Sheet = () => {
  // ref

  // callbacks

  const snapPoints = useMemo(() => ['45%'], []);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  // renders
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView>
          <Button title={'Present Modal'} onPress={handlePresentModalPress} />
        </SafeAreaView>
        <BottomSheetModal
          backdropComponent={CustomBackdrop}
          ref={bottomSheetRef}
          // onChange={handleSheetChanges}
          index={1}
          snapPoints={snapPoints}
          enablePanDownToClose>
          <BottomSheetView>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Sheet;
