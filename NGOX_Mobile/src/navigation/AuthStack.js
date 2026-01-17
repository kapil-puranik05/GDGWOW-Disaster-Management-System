import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

// Import the screens needed for the Guest SOS flow
import SOSScreen from '../screens/SOSScreen';
import BotScreen from '../screens/BotScreen';

const Stack = createStackNavigator();

export default function AuthStack({ onLogin }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 1. Login Screen */}
      <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} onLogin={onLogin} />}
      </Stack.Screen>

      {/* 2. SignUp Screen */}
      <Stack.Screen name="SignUp" component={SignUpScreen} />

      {/* 3. Guest SOS Flow 
          This name 'GuestSOS' must match what you used in LoginScreen's navigation.navigate()
      */}
      <Stack.Screen name="GuestSOS" component={SOSScreen} />

      {/* 4. Bot Screen
          This allows the Guest SOS screen to push to the Chatbot without an account
      */}
      <Stack.Screen name="Bot" component={BotScreen} />
    </Stack.Navigator>
  );
}