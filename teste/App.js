// In App.js in a new project
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home';
import FoodScreen from './screens/Food';


const Stack = createNativeStackNavigator();

function RootStack() {
  return (
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen name="All Categories" component={HomeScreen} />
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