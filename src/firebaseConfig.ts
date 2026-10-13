import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, Persistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics: any = null;
if (Platform.OS === 'web' && typeof window !== 'undefined' && typeof document !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Ignore analytics unsupported environment
  });
}

// React Native AsyncStorage persistence adapter for Firebase Auth
const createReactNativePersistence = (storage: typeof AsyncStorage): Persistence => {
  const PersistenceClass = class {
    type = 'LOCAL' as const;
    async _isAvailable(): Promise<boolean> {
      try {
        if (!storage) return false;
        await storage.setItem('firebase:persistence:test', '1');
        await storage.removeItem('firebase:persistence:test');
        return true;
      } catch {
        return false;
      }
    }
    _set(key: string, value: any): Promise<void> {
      return storage.setItem(key, JSON.stringify(value));
    }
    async _get(key: string): Promise<any> {
      const json = await storage.getItem(key);
      return json ? JSON.parse(json) : null;
    }
    _remove(key: string): Promise<void> {
      return storage.removeItem(key);
    }
    _addListener(): void {}
    _removeListener(): void {}
  };

  return new PersistenceClass() as unknown as Persistence;
};

// Persist user auth session across app restarts
export const auth = Platform.OS === 'web'
  ? getAuth(app)
  : initializeAuth(app, {
      persistence: createReactNativePersistence(AsyncStorage),
    });

export default app;