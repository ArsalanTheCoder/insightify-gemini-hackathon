import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DetectScreen from '../screens/Detect/DetectScreen';
import ResultScreen from '../screens/Detect/ResultScreen';
import DetectionHistoryScreen from '../screens/Detect/DetectionHistoryScreen';

const Stack = createNativeStackNavigator();

export default function DetectStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DetectScreen" component={DetectScreen} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
      <Stack.Screen name="HistoryScreen" component={DetectionHistoryScreen} />
    </Stack.Navigator>
  );
}
