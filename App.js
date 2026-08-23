import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Platform, View } from 'react-native';

import CalculadoraScreen from './src/screens/CalculadoraScreen';
import InfoScreen from './src/screens/InfoScreen';
import { colors } from './src/utils/theme';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={colors.bg0} />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: colors.bg1,
              borderTopColor: colors.border,
              borderTopWidth: 1,
              height: Platform.OS === 'ios' ? 88 : 64,
              paddingBottom: Platform.OS === 'ios' ? 28 : 10,
              paddingTop: 10,
            },
            tabBarActiveTintColor: colors.accent,
            tabBarInactiveTintColor: colors.textMuted,
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '600',
              letterSpacing: 0.3,
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Calculadora') {
                iconName = focused ? 'calculator' : 'calculator-outline';
              } else {
                iconName = focused ? 'information-circle' : 'information-circle-outline';
              }
              return <Ionicons name={iconName} size={24} color={color} />;
            },
          })}
        >
          <Tab.Screen
            name="Calculadora"
            component={CalculadoraScreen}
            options={{ tabBarLabel: 'Calculadora' }}
          />
          <Tab.Screen
            name="Informações"
            component={InfoScreen}
            options={{ tabBarLabel: 'Informações' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
