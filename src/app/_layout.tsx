import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    'GoogleSansFlex-36pt-Regular': require('../../assets/fonts/GoogleSansFlex_36pt_Regular.ttf'),
    'GoogleSansFlex-9pt-Medium': require('../../assets/fonts/GoogleSansFlex_9pt_Medium.ttf'),
    'Gilmer-Regular': require('../../assets/fonts/Gilmer_Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
