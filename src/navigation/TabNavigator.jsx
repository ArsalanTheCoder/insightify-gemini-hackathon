import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens / Stacks
import FeedScreen from '../screens/Feed/FeedScreen';
import ReportStack from './ReportStack';

// Stacks
import DetectStack from './DetectStack';
import ProfileStack from './ProfileStack';
import GamesStack from './GamesStack';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#0056D2',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginBottom: 5,
        },
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Feed') iconName = '🏠';
          else if (route.name === 'Games') iconName = '🎮';
          else if (route.name === 'Detect') iconName = '🛡️';
          else if (route.name === 'Report') iconName = '📢';
          else if (route.name === 'Profile') iconName = '👤';

          return (
            <View style={focused ? styles.activeIconContainer : null}>
              <Text style={{ fontSize: 22 }}>{iconName}</Text>
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Games" component={GamesStack} />
      <Tab.Screen name="Detect" component={DetectStack} />
      <Tab.Screen name="Report" component={ReportStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingTop: 8,
    paddingBottom: 8,
  },
  activeIconContainer: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
