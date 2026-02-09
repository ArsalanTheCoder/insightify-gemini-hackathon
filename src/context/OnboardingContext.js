import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const OnboardingContext = createContext();

export function OnboardingProvider({ children }) {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(null);

  useEffect(() => {
    const load = async () => {
      const value = await AsyncStorage.getItem('hasSeenOnboarding');
      setHasSeenOnboarding(value === 'true');
    };
    load();
  }, []);

  const completeOnboarding = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    setHasSeenOnboarding(true); // 🔥 THIS LINE IS IMPORTANT
  };

  return (
    <OnboardingContext.Provider
      value={{ hasSeenOnboarding, completeOnboarding }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}
