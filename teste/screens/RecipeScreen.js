import {
  View,
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  Button,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RecipeComponentSteps from "../components/RecipeComponentSteps";
import RecipeComponentIngredients from "../components/RecipeComponentIngredients";
import Icon from "../components/IconComponent";

import axios from "axios";

const RecipeScreen = ({ navigation, route }) => {
  let id = route?.params?.mealId;
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function handleData() {
      try {
        const res = await fetch("https://localhost:7199/api/meal/listar-meal");
        if (res.ok) {
          const data = await res.json();
          const foundMeal = data.find((meal) => meal.id === id);
          console.log(foundMeal);
          setMeal(foundMeal);
          navigation.setOptions({ title: foundMeal?.title || "food" });
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }

    handleData();
  }, [navigation]);

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ActivityIndicator size="large" color="#fff" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  const confirmDelete = () => {
    setShowModal(true);
  };

  const handleDelete = async () => {
    axios
      .delete(`https://localhost:7199/api/meal/delete-meal/?Id=${meal.id}`, {
        data: { id: meal.id },
      })
      .then(function (response) {
        console.log(response.status);

        navigation.goBack();
      })
      .catch(function (error) {
        console.log(error);
      });
    setShowModal(false);
  };
  // console.log(meal);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.view}>
          <Image style={styles.image} source={{ uri: meal.imageUrl }} />
          <View style={styles.view2}>
            <Pressable
              style={{ paddingLeft: 5 }}
              onPress={() =>
                navigation.navigate("EditRecipe", { recipeId: meal.id })
              }
            >
              <Icon name="edit" size={18} color="black" />
            </Pressable>
            <Text style={styles.text}>{meal.duration} Minutes</Text>
            <Text style={styles.text2}> {meal.complexity}</Text>
            <Text style={styles.text2}>{meal.affordability}</Text>
            <Pressable style={{ paddingLeft: 5 }} onPress={confirmDelete}>
              <Icon name="trash" size={18} color="red" />
            </Pressable>
          </View>
          {/* Título Ingredientes */}
          <RecipeComponentIngredients meal={meal} />
          {/* Título Steps */}
          <RecipeComponentSteps meal={meal} />
        </View>
      </ScrollView>
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Tem certeza que deseja excluir esta categoria?
            </Text>
            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={() => setShowModal(false)} />
              <Button title="Excluir" color="red" onPress={handleDelete} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A48686",
  },
  view: {
    width: "100%",
    marginBottom: 40,
    flex: 1,
    alignItems: "center",
  },
  view2: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
  },
  text: {
    color: "white",
    padding: 10,
  },
  text2: {
    color: "white",
    padding: 10,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#703D3F",
    marginVertical: 10,
    textAlign: "center",
  },
  underline: {
    height: 2,
    backgroundColor: "#703D3F",
    width: "70%",
    alignSelf: "center",
    marginBottom: 5,
  },
  ingredientText: {
    backgroundColor: "#E1B497",
    color: "#9E5A4B",
    width: "70%",
    textAlign: "center",
    margin: 2.5,
    padding: 2.5,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Fundo escuro transparente
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
export default RecipeScreen;
