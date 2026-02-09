import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/Splash/SplashScreen';
import OnboardingStack from './OnboardingStack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

import { AuthContext } from '../context/AuthContext';
import { OnboardingContext } from '../context/OnboardingContext';

const Stack = createNativeStackNavigator(); // ✅ THIS WAS MISSING

export default function RootNavigator() {
  const { user, loading } = useContext(AuthContext);
  const { hasSeenOnboarding } = useContext(OnboardingContext);

  // ⏳ Still loading auth or onboarding state
  if (loading || hasSeenOnboarding === null) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      {!hasSeenOnboarding && (
        <Stack.Screen name="Onboarding" component={OnboardingStack} />
      )}

      {hasSeenOnboarding && !user && (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}

      {hasSeenOnboarding && user && (
        <Stack.Screen name="App" component={AppStack} />
      )}

    </Stack.Navigator>
  );
}
