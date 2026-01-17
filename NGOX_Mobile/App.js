import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthStack from './src/navigation/AuthStack';
import MainTabs from './src/navigation/MainTabs';

const Stack = createStackNavigator();

// App.js
export default function App() {
  const [userData, setUserData] = React.useState(null);

  const login = (data) => setUserData(data); // This is the onLogin function
  const logout = () => setUserData(null);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {userData == null ? (
            <Stack.Screen name="Auth">
              {/* IMPORTANT: Pass 'login' as 'onLogin' to the AuthStack */}
              {(props) => <AuthStack {...props} onLogin={login} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Main">
              {(props) => <MainTabs {...props} onLogout={logout} user={userData} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}