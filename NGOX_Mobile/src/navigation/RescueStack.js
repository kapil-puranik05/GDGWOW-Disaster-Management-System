import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SOSScreen from '../screens/SOSScreen';
import BotScreen from '../screens/BotScreen';

const Stack = createStackNavigator();

export default function RescueStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 1. The selection and confirmation screen */}
      <Stack.Screen name="SOSHome" component={SOSScreen} />
      
      {/* 2. The Model-integrated Bot screen */}
      <Stack.Screen name="Bot" component={BotScreen} />
    </Stack.Navigator>
  );
}