// In App.js in a new project
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/Category';
import RecipeScreen from './screens/Recipe';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <> 
      <NavigationContainer>
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
        <Stack.Screen name="AllCategories" component={HomeScreen} />
        <Stack.Screen name="Recipe" component={RecipeScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
      </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}