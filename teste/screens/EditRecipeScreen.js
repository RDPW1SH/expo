import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Switch,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import LoadingComponent from "../components/LoadingComponent";
import { MultiSelect } from "react-native-element-dropdown";
import Icon from "../components/IconComponent";
import axios from "axios";
const EditRecipeScreen = ({ navigation, route }) => {
  const recipeId = route?.params.recipeId;
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function handleData() {
      try {
        const res = await fetch(
          "https://localhost:7199/api/category/listar-categorias"
        );

        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }

        axios
          .get("https://localhost:7199/api/meal/listar-meal", {})
          .then(function (response) {
            const data = response.data;
            // Filtrar a receita pelo ID
            const foundRecipe = data.find((recipe) => recipe.id === recipeId);
            if (foundRecipe) {
              setRecipe(foundRecipe);
              // Atualiza o MultiSelect com os IDs das categorias
              const categoryIds = foundRecipe?.categoryIds || [];

              // Filtrar categorias correspondentes pelo ID
              const selectedCategoriesData = categories.filter((category) =>
                categoryIds.includes(category.id)
              );

              // Atualizar o estado com os objetos completos das categorias
              setSelectedCategories(selectedCategoriesData);
              setIngredients(foundRecipe.ingredients || [""]);
              setSteps(foundRecipe.steps || [""]);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    handleData();
  }, [recipeId]);

  useEffect(() => {
    navigation.setOptions({ title: "Editar Receita" });
  }, [navigation]);

  const handleInputChange = (key, value) => {
    setRecipe((previousState) => ({
      ...previousState,
      [key]: value,
    }));
  };

  if (loading) {
    return <LoadingComponent />;
  }

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (text, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = text;
    setIngredients(newIngredients);
  };

  const handleAddStep = () => {
    setSteps([...steps, ""]);
  };

  const handleRemoveStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleStepChange = (text, index) => {
    const newSteps = [...steps];
    newSteps[index] = text;
    setSteps(newSteps);
  };

  const handleNewRecipe = () => {
    const recipeTitle =
      recipe.title.charAt(0).toUpperCase() + recipe.title.slice(1);
    const recipeComplexity =
      recipe.complexity.charAt(0).toUpperCase() + recipe.complexity.slice(1);
    const recipeAffordability =
      recipe.affordability.charAt(0).toUpperCase() +
      recipe.affordability.slice(1);

    const form = new FormData();

    form.append("Id", recipe.id);
    form.append("CategoryIds", recipe.categoryIds);
    form.append("Title", recipeTitle);
    form.append("ImageUrl", recipe.imageUrl);
    form.append("Ingredients", recipe.ingredients);
    form.append("Steps", recipe.steps);
    form.append("Duration", recipe.duration);
    form.append("Complexity", recipeComplexity);
    form.append("Affordability", recipeAffordability);
    form.append("IsGlutenFree", recipe.isGlutenFree);
    form.append("IsVegan", recipe.isVegan);
    form.append("IsVegetarian", recipe.isVegetarian);
    form.append("IsLactoseFree", recipe.isLactoseFree);

    axios
      .put("https://localhost:7199/api/meal/edit-meal", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("Formulario enviado", form);
  };

  return (
    <SafeAreaProvider style={styles.default}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={{ width: "90%" }}>
          <View style={styles.form}>
            <View>
              <Text style={styles.label}>Nome da receita</Text>
              <TextInput
                style={styles.formTextInput}
                defaultValue={recipe?.title}
                onChangeText={(text) => handleInputChange("title", text)}
              />
            </View>
            <View>
              <Text style={styles.label}>URL da imagem</Text>
              <TextInput
                style={styles.formTextInput}
                defaultValue={recipe?.imageUrl}
                onChangeText={(text) => handleInputChange("imageUrl", text)}
              />
            </View>
            <View>
              <Text style={styles.label}>Categorias</Text>
              <MultiSelect
                data={categories}
                labelField="title"
                valueField="id"
                placeholder="Select Categories"
                value={selectedCategories}
                onChange={(items) => setSelectedCategories(items)}
                style={styles.picker}
              />
            </View>
            <View>
              <Text style={styles.label}>Ingredientes</Text>
              {ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter ingredient"
                    value={ingredient}
                    onChangeText={(text) => handleIngredientChange(text, index)}
                  />
                  <Pressable onPress={() => handleRemoveIngredient(index)}>
                    <Icon name={"remove"} size={24} color="black" />
                  </Pressable>
                </View>
              ))}
              <Pressable onPress={handleAddIngredient} style={styles.addButton}>
                <Text style={styles.addButtonText}>Adicionar ingrediente</Text>
              </Pressable>
            </View>
            <View>
              <Text style={styles.label}>Passos</Text>
              {steps.map((step, index) => (
                <View key={index} style={styles.ingredientContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter steps"
                    value={step}
                    onChangeText={(text) => handleStepChange(text, index)}
                  />
                  <Pressable onPress={() => handleRemoveStep(index)}>
                    <Icon name={"remove"} size={24} color="black" />
                  </Pressable>
                </View>
              ))}
              <Pressable onPress={handleAddStep} style={styles.addButton}>
                <Text style={styles.addButtonText}>Adicionar Passos</Text>
              </Pressable>
            </View>
            <View>
              <Text style={styles.label}>Duração (em minutos)</Text>
              <TextInput
                style={styles.formTextInput}
                defaultValue={recipe?.duration}
                onChangeText={(text) => handleInputChange("duration", text)}
              />
            </View>
            <View>
              <Text style={styles.label}>Custo</Text>
              <TextInput
                style={styles.formTextInput}
                defaultValue={recipe?.affordability}
                onChangeText={(text) =>
                  handleInputChange("affordability", text)
                }
              />
            </View>
            <View>
              <Text style={styles.label}>Dificuldade</Text>
              <TextInput
                style={styles.formTextInput}
                defaultValue={recipe?.complexity}
                onChangeText={(text) => handleInputChange("complexity", text)}
              />
            </View>
            <View>
              <Text style={styles.label}>Contem Gluten?</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={recipe.isGlutenFree ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                value={recipe?.isGlutenFree}
                onValueChange={(newValue) =>
                  handleInputChange("isGlutenFree", newValue)
                }
              />
            </View>
            <View>
              <Text style={styles.label}>É Vegan?</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={recipe.isVegan ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                value={recipe?.isVegan}
                onValueChange={(newValue) =>
                  handleInputChange("isVegan", newValue)
                }
              />
            </View>
            <View>
              <Text style={styles.label}>É Vegetariana?</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={recipe.isVegetarian ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                value={recipe?.isVegetarian}
                onValueChange={(newValue) =>
                  handleInputChange("isVegetarian", newValue)
                }
              />
            </View>
            <View>
              <Text style={styles.label}>Contem Lactose?</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={recipe.isLactoseFree ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                value={recipe?.isLactoseFree}
                onValueChange={(newValue) =>
                  handleInputChange("isLactoseFree", newValue)
                }
              />
            </View>
            <Pressable style={styles.formPressable} onPress={handleNewRecipe}>
              <Text style={styles.formPressableText}>Editar Receita</Text>
            </Pressable>
          </View>
        </ScrollView>
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
    paddingVertical: 20,
  },
  form: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  formTextInput: {
    height: 50,
    width: "100%",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 15,
  },
  label: {
    fontSize: 16,
    paddingBottom: 2,
    fontWeight: "600",
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingLeft: 15,
  },
  input: {
    height: 50,
    width: "80%",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 15,
  },
  ingredientContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  addButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 8,
  },
  addButtonText: {
    textAlign: "center",
  },
  formPressable: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    backgroundColor: "lightblue",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  formPressableText: {
    textAlign: "center",
    fontSize: 18,
  },
});

export default EditRecipeScreen;
