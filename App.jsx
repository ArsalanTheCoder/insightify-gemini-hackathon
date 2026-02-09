// App.js (only the relevant useEffect shown; keep your providers same)
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeModules, NativeEventEmitter } from 'react-native';

import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { OnboardingProvider } from './src/context/OnboardingContext';
import { navigationRef, navigateToDetect } from './src/navigation/navigationRef';

const { NotificationModule } = NativeModules;
const notificationEmitter = new NativeEventEmitter(NotificationModule);

export default function App() {
  useEffect(() => {
    // Cold start or app resume: check persisted launch payload
    (async () => {
      try {
        const payloadStr = await NotificationModule.getLaunchPayload();
        if (payloadStr) {
          // pass full payload (string or object) to the navigator helper
          const payload = typeof payloadStr === 'string' ? JSON.parse(payloadStr) : payloadStr;
          navigateToDetect(payload);
        }
      } catch (e) {
        console.warn('getLaunchPayload error', e);
      }
    })();

    // Runtime: when app is running or backgrounded (will receive broadcast)
    const sub = notificationEmitter.addListener('NotificationReceived', raw => {
      try {
        const payload = typeof raw === 'string' ? JSON.parse(raw) : raw;
        // FORCE navigation every time a notification is tapped or broadcasted
        navigateToDetect(payload);
      } catch (e) {
        console.warn('NotificationReceived parse error', e);
      }
    });

    return () => sub.remove();
  }, []);

  return (
    <AuthProvider>
      <OnboardingProvider>
        <NavigationContainer ref={navigationRef}>
          <RootNavigator />
        </NavigationContainer>
      </OnboardingProvider>
    </AuthProvider>
  );
}
