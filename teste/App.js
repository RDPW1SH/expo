// In App.js in a new project

import * as React from 'react';
import { View, Text, Pressable,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FoodScreen from './screens/food';

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Pressable onPress={() => navigation.navigate('Food', {})}>
        <Text>Go to Food</Text>
      </Pressable>
    </View>
  );
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
  }
})