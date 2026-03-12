import React from 'react';
import { Tabs } from 'expo-router';
import { Clock, Hourglass, Bell } from 'lucide-react-native';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = colorScheme === 'dark' ? '#FFF' : '#000';
  const inactiveColor = colorScheme === 'dark' ? '#333' : '#CCC';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false, // Minima: No bulky headers
        tabBarShowLabel: false, // Minima: Icons only
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#FFF',
          borderTopWidth: 0,
          elevation: 0,
          height: 80,
          paddingBottom: 20,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <Clock color={color} size={24} strokeWidth={1.5} />,
        }}
      />
      <Tabs.Screen
        name="timer"
        options={{
          tabBarIcon: ({ color }) => <Hourglass color={color} size={24} strokeWidth={1.5} />,
        }}
      />
      <Tabs.Screen
        name="alarm"
        options={{
          tabBarIcon: ({ color }) => <Bell color={color} size={24} strokeWidth={1.5} />,
        }}
      />
    </Tabs>
  );
}