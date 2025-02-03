// In App.js in a new project

import * as React from 'react';
import { View, Text, Pressable,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home';
import FoodScreen from './screens/food';


const Stack = createNativeStackNavigator();

function RootStack() {
  return (
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Food" component={FoodScreen} />
      </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}