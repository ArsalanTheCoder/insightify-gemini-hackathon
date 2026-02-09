import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import QuizHomeScreen from '../screens/Games/QuizHomeScreen';
import QuizPlayScreen from '../screens/Games/QuizPlayScreen';
import QuizResultScreen from '../screens/Games/QuizResultScreen';
import RewardsScreen from '../screens/Games/RewardsScreen';

const Stack = createNativeStackNavigator();

export default function GamesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="QuizHome" component={QuizHomeScreen} />
      <Stack.Screen name="QuizPlay" component={QuizPlayScreen} />
      <Stack.Screen name="QuizResult" component={QuizResultScreen} />
      <Stack.Screen name="Rewards" component={RewardsScreen} />
    </Stack.Navigator>
  );
}
