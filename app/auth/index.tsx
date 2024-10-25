import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { usePostHog } from 'posthog-react-native';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomBackdrop from '@/components/CustomBackdrop';
import SignInBottomSheetUI from '@/components/signInBottomSheetUI';
import SignUpBottomSheetUI from '@/components/signUpBottomSheetUI';
import { theme } from '@/theme';

function SignInButton() {
  const posthog = usePostHog();
  const signInSnapPoints = useMemo(() => ['62%'], []);
  // const confirmOTPSnapPoints = useMemo(() => ['25%'], []);
  const signInSheetRef = useRef<BottomSheetModal>(null);
  // const confirmOTPSheetRef = useRef<BottomSheetModal>(null);
  const handleSignInPresentPress = useCallback(() => {
    signInSheetRef.current?.present();
    posthog.capture('Sign In Pressed');
  }, []);
  const router = useRouter();

  const bottomSheet = useBottomSheetModal();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // signInSheetRef.current?.forceClose();
      bottomSheet.dismissAll();
      return true;
    });

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleSignInPresentPress();
        }}>
        <Text
          style={{
            color: '#FAFAFA',
          }}>
          Sign In
        </Text>
      </TouchableOpacity>
      <BottomSheetModal
        backdropComponent={CustomBackdrop}
        ref={signInSheetRef}
        index={1}
        snapPoints={signInSnapPoints}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: theme.PRIMARY_COLOR,
        }}
        handleIndicatorStyle={{
          backgroundColor: '#FAFAFA',
        }}>
        <BottomSheetView>
          <SignInBottomSheetUI
            onSubmit={() => {
              // confirmOTPSheetRef.current?.present();
              router.setParams({
                LOGINPAGEuser: '052-574-4414',
                LOGINPAGEpassword: 'testpw',
              });
              router.replace('/auth/confirm-otp');
            }}
          />
        </BottomSheetView>
      </BottomSheetModal>
      {/*<BottomSheetModal*/}
      {/*  backdropComponent={CustomBackdrop}*/}
      {/*  ref={confirmOTPSheetRef}*/}
      {/*  index={1}*/}
      {/*  snapPoints={confirmOTPSnapPoints}*/}
      {/*  enablePanDownToClose*/}
      {/*  backgroundStyle={{*/}
      {/*    backgroundColor: theme.PRIMARY_COLOR,*/}
      {/*  }}*/}
      {/*  handleIndicatorStyle={{*/}
      {/*    backgroundColor: '#FAFAFA',*/}
      {/*  }}>*/}
      {/*  <BottomSheetView>*/}
      {/*    <ConfirmOTPBottomSheetUI />*/}
      {/*  </BottomSheetView>*/}
      {/*</BottomSheetModal>*/}
    </>
  );
}
function SignUpButton() {
  const router = useRouter();
  const posthog = usePostHog();
  const signUpSnapPoints = useMemo(() => ['45%'], []);
  // const confirmOTPSnapPoints = useMemo(() => ['25%'], []);
  const signUpSheetRef = useRef<BottomSheetModal>(null);
  // const confirmOTPSheetRef = useRef<BottomSheetModal>(null);
  const handleSignInPresentPress = useCallback(() => {
    signUpSheetRef.current?.present();
    posthog.capture('Sign Up Pressed');
  }, []);
  const bottomSheet = useBottomSheetModal();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // signInSheetRef.current?.forceClose();
      bottomSheet.dismissAll();
      return true;
    });

    return () => {
      backHandler.remove();
    };
  }, []);
  return (
    <>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => {
          handleSignInPresentPress();
        }}>
        <Text
          style={{
            color: theme.SECONDARY_COLOR,
          }}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <BottomSheetModal
        backdropComponent={CustomBackdrop}
        ref={signUpSheetRef}
        index={1}
        snapPoints={signUpSnapPoints}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: theme.PRIMARY_COLOR,
        }}
        handleIndicatorStyle={{
          backgroundColor: '#FAFAFA',
        }}
        keyboardBehavior="interactive">
        <BottomSheetView>
          <SignUpBottomSheetUI onSubmit={() => {}} />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}

export default function OnboardingScreen() {
  const [loaded, error] = useFonts({
    'Londrina-Sketch': require('assets/fonts/LondrinaSketch-Regular.ttf'),
  });

  return (
    <>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <SafeAreaView style={{ height: '100%', backgroundColor: theme.PRIMARY_COLOR }}>
            <Text style={styles.titleText}>StudyBuddy</Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('assets/images/background-onboarding.png')}
                style={styles.image}
                contentFit="contain"
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: '25%',
                }}>
                <Text style={styles.subtitleText}>
                  Study Buddy - Learning Made Simple, Fun, and Free!
                </Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  width: '100%',
                  bottom: '10%',
                  display: 'flex',
                  gap: 10,
                  paddingHorizontal: 20,
                }}>
                <SignInButton />

                <SignUpButton />
              </View>
              <View
                style={{
                  paddingHorizontal: 100,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#403958',
                    marginVertical: 20,
                  }}>
                  By Signing Up, you agree to our{' '}
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                    }}>
                    User Notice
                  </Text>{' '}
                  and{' '}
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                    }}>
                    Privacy Policy
                  </Text>
                  . {'\n\n'}
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                    }}>
                    Can't sign in or sign up?{' '}
                  </Text>
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 64,
    // fontWeight: 'bold',
    letterSpacing: 6,
    color: '#403958',
    textAlign: 'center',
    fontFamily: 'Londrina-Sketch',
    marginBottom: -200,
    marginTop: 40,
  },
  subtitleText: {
    // position: 'absolute',
    fontWeight: 'bold',
    color: '#403958',
    textAlign: 'center',
    fontSize: 16,
  },
  image: {
    width: '80%',
    height: '90%',
    // backgroundColor: 'red',
  },
  imageContainer: {
    paddingHorizontal: 20,
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    padding: 12, // p-3 translates to padding: 12px (3 * 4px)
    borderRadius: 8, // rounded-md translates to border-radius: 8px
    alignItems: 'center', // items-center aligns items to the center
    borderColor: '#403958', // border-white
    borderWidth: 0, // border-none
    backgroundColor: '#403958', // bg-white
  },
  button2: {
    padding: 12, // p-3 translates to padding: 12px (3 * 4px)
    borderRadius: 8, // rounded-md translates to border-radius: 8px
    alignItems: 'center', // items-center aligns items to the center
    borderColor: '#403958', // border-white
    borderWidth: 1, // border-none
    backgroundColor: '#9BCBC5',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
