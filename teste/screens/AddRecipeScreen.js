import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Button,
  Switch,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import LoadingComponent from "../components/LoadingComponent";

const AddRecipeScreen = ({ navigation }) => {
  const [recipe, setRecipe] = useState({
    categoryIds: "",
    title: "",
    imageUrl: "",
    ingredients: [""],
    steps: [""],
    duration: "",
    complexity: "",
    affordability: "",
    isGlutenFree: false,
    isVegan: false,
    isVegetarian: false,
    isLactoseFree: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function handleData() {
      try {
        const res = await fetch(
          "https://67a0e0ad5bcfff4fabe0f261.mockapi.io/api/testes/Category"
        );

        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    navigation.setOptions({ title: "All Categories" });
    handleData();
  }, [navigation]);

  if (loading) {
    return <LoadingComponent />;
  }

  function handleNewRecipe() {}
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.form}>
        <View>
          <Text>Nome da receita</Text>
          <TextInput />
        </View>
        <View>
          <Text>URL da imagem</Text>
          <TextInput />
        </View>
        <View>
          <Text>Ingredientes</Text>
        </View>
        <View>
          <Text>Passos</Text>
        </View>
        <View>
          <Text>Duração (em minutos)</Text>
          <TextInput />
        </View>
        <View>
          <Text>Custo</Text>
          <TextInput />
        </View>
        <View>
          <Text>Dificuldade</Text>
          <TextInput />
        </View>
        <View>
          <View>
            <Text>Contem Gluten?</Text>
            <Switch />
          </View>
          <View>
            <Text>É Vegan?</Text>
            <Switch />
          </View>
          <View>
            <Text>É Vegetariana?</Text>
            <Switch />
          </View>
          <View>
            <Text>Contem Lactose?</Text>
            <Switch />
          </View>
        </View>
        <View>
          <Pressable onPress={handleNewRecipe}>
            <Text>Criar Receita</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#A48686",
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  form: {
    padding: 10,
    backgroundColor: "white",
  },
});
export default AddRecipeScreen;
