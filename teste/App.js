// In App.js in a new project
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import HomeScreen from './screens/Home';
import CategoryScreen from './screens/categoria/[id]';
import FoodScreen from './screens/Food';


const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <>
      <StatusBar backgroundColor="#8C3232" barStyle="light-content" />
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#8C3232',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="All Categories" component={HomeScreen} />
        <Stack.Screen name="Food" component={FoodScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
      </Stack.Navigator>
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}