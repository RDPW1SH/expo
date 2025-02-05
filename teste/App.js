// In App.js in a new project
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import CategoryScreen from "./screens/CategoryScreen";
import RecipeScreen from "./screens/RecipeScreen";
import AddCategoryScreen from "./screens/AddCategoryScreen";
import CategoryListScreen from "./screens/CategoryListScreen";
import EditCategoryScreen from "./screens/EditCategoryScreen";
import AddRecipeScreen from "./screens/AddRecipeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <StatusBar backgroundColor="#8C3232" barStyle="light-content" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#8C3232",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen name="AllCategories" component={HomeScreen} />
          <Stack.Screen name="Recipe" component={RecipeScreen} />
          <Stack.Screen name="Category" component={CategoryScreen} />
          <Stack.Screen name="AddCategory" component={AddCategoryScreen} />
          <Stack.Screen name="CategoryList" component={CategoryListScreen} />
          <Stack.Screen name="EditCategory" component={EditCategoryScreen} />
          <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
