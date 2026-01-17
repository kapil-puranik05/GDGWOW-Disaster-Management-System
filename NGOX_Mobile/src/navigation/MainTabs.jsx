import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Platform } from 'react-native';
// 1. Import useSafeAreaInsets
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ShieldAlert, Users, UserCircle } from 'lucide-react-native';
import { COLORS } from '../theme/color';

import RescueStack from './RescueStack';
import NGODirectory from '../screens/NGODirectory';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs({ onLogout }) {
  // 2. Get the insets
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.secondary,
          tabBarInactiveTintColor: '#94a3b8',
          tabBarStyle: { 
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#f1f5f9',
            // 3. APPLY DYNAMIC INSETS
            // We add the system's bottom inset to our desired padding
            height: 65 + insets.bottom, 
            paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
            paddingTop: 10,
          }
        }}
      >
        <Tab.Screen 
          name="SOSFlow" 
          component={RescueStack} 
          options={{ 
            tabBarLabel: 'Emergency',
            tabBarIcon: ({ color }) => <ShieldAlert size={26} color={color} /> 
          }}
        />

        <Tab.Screen 
          name="NGOs" 
          component={NGODirectory} 
          options={{ 
            tabBarLabel: 'Near NGOs',
            tabBarIcon: ({ color }) => <Users size={24} color={color} /> 
          }} 
        />

        <Tab.Screen 
          name="Profile" 
          options={{ 
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => <UserCircle size={24} color={color} /> 
          }}
        >
          {(props) => <ProfileScreen {...props} onLogout={onLogout} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}