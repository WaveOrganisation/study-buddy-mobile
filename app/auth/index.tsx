import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import { Image } from 'expo-image';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomBackdrop from '@/components/CustomBackdrop';
import SignInBottomSheetUI from '@/components/signInBottomSheetUI';
import SignUp from '@/components/signUp';
import { theme } from '@/theme';
import { usePostHog } from 'posthog-react-native';
import { ConfirmOTPBottomSheetUI } from '@/components/confirmOTPBottomSheetUI';

function SignInButton() {
  const posthog = usePostHog();
  const signInSnapPoints = useMemo(() => ['62%'], []);
  const confirmOTPSnapPoints = useMemo(() => ['25%'], []);
  const signInSheetRef = useRef<BottomSheetModal>(null);
  const confirmOTPSheetRef = useRef<BottomSheetModal>(null);
  const handleSignInPresentPress = useCallback(() => {
    signInSheetRef.current?.present();
    posthog.capture('Sign In Pressed');
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
              confirmOTPSheetRef.current?.present();
            }}
          />
        </BottomSheetView>
      </BottomSheetModal>
      <BottomSheetModal
        backdropComponent={CustomBackdrop}
        ref={confirmOTPSheetRef}
        index={1}
        snapPoints={confirmOTPSnapPoints}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: theme.PRIMARY_COLOR,
        }}
        handleIndicatorStyle={{
          backgroundColor: '#FAFAFA',
        }}>
        <BottomSheetView>
          <ConfirmOTPBottomSheetUI />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}

export default function OnboardingScreen() {
  const [loaded, error] = useFonts({
    'Londrina-Sketch': require('assets/fonts/LondrinaSketch-Regular.ttf'),
  });
  const posthog = usePostHog();
  const signUpSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['62%'], []);
  const handleSignUpPresentPress = useCallback(() => {
    signUpSheetRef.current?.present();
    posthog.capture('Sign Up Pressed');
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // signInSheetRef.current?.forceClose();
      signUpSheetRef.current?.forceClose();
      return true;
    });

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <SafeAreaView className="bg-[#9BCBC5]" style={{ height: '100%' }}>
            <Text className="left-[50%] -translate-x-1/2" style={styles.titleText}>
              StudyBuddy
            </Text>
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

                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => {
                    handleSignUpPresentPress();
                  }}>
                  <Text
                    style={{
                      color: '#403958',
                    }}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  position: 'absolute',
                  width: '100%',
                  bottom: '0%',
                  paddingHorizontal: 100,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#403958',
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

          <BottomSheetModal
            ref={signUpSheetRef}
            // onChange={handleSheetChanges}
            backdropComponent={CustomBackdrop}
            index={1}
            snapPoints={snapPoints}
            enablePanDownToClose
            backgroundStyle={{
              backgroundColor: theme.PRIMARY_COLOR,
            }}
            handleIndicatorStyle={{
              backgroundColor: '#FAFAFA',
            }}
            onChange={(index) => {
              if (index === 0) {
                signUpSheetRef.current?.forceClose();
              }
            }}>
            <BottomSheetView>
              <SignUp />
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 64,
    // fontWeight: 'bold',
    position: 'absolute',
    top: '12%',
    letterSpacing: 6,
    color: '#403958',
    textAlign: 'center',
    fontFamily: 'Londrina-Sketch',
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
