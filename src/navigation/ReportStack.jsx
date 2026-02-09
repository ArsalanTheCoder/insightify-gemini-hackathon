import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ReportHomeScreen from '../screens/Report/ReportHomeScreen';
import ReportFormScreen from '../screens/Report/ReportFormScreen';
import ReportSuccessScreen from '../screens/Report/ReportSuccessScreen';

const Stack = createNativeStackNavigator();

export default function ReportStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReportHome" component={ReportHomeScreen} />
      <Stack.Screen name="ReportForm" component={ReportFormScreen} />
      <Stack.Screen name="ReportSuccess" component={ReportSuccessScreen} />
    </Stack.Navigator>
  );
}
