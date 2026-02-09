import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../screens/Profile/ProfileScreen';
import SettingsScreen from '../screens/Profile/SettingsScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import LeaderboardScreen from '../screens/Profile/LeaderboardScreen';
import ChampionScreen from '../screens/Profile/ChampionScreen';
import AchievementsScreen from '../screens/Profile/AchievementsScreen';
import HistoryScreen1 from '../screens/Profile/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileHome" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Stack.Screen name="Champion" component={ChampionScreen} />
      <Stack.Screen name="Achievements" component={AchievementsScreen} />
      <Stack.Screen name="History" component={HistoryScreen1} />
    </Stack.Navigator>
  );
}
