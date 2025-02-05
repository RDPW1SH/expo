import { Text, StyleSheet, FlatList, View, Pressable } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CategoryComponent from "../components/CategoryComponente";
import LoadingComponent from "../components/LoadingComponent";
import Icon from "../components/IconComponent";

const CategoryScreen = ({ route, navigation }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  let categoryId = route?.params?.categoryId;

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          const res = await fetch(
            //"https://67a0e0ad5bcfff4fabe0f261.mockapi.io/api/testes/meals"
            "https://67a0e0ad5bcfff4fabe0f261.mockapi.io/api/testes/meals"
          );
          if (res.ok) {
            const data = await res.json();
            console.log(data);
            const filteredMeals = data.filter((meal) =>
              meal.categoryIds.includes(categoryId)
            );
            setMeals(filteredMeals);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }, [categoryId])
  );

  if (loading) {
    return <LoadingComponent />;
  }

  const renderItem = (itemData) => {
    const item = itemData.item;
    const mealItemProps = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      duration: item.duration,
      complexity: item.complexity,
      affordability: item.affordability,
    };
    return <CategoryComponent {...mealItemProps} />;
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={meals}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={
            <View style={styles.addToListView}>
              <Text style={styles.addToListViewText}>Add Recipe</Text>
              <Pressable onPress={() => navigation.navigate("AddRecipe")}>
                <Icon name="plus" size={24} color="black" />
              </Pressable>
            </View>
          }
          ListEmptyComponent={<Text>No meals found</Text>}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A48686",
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  addToListView: {
    paddingVertical: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  addToListViewText: {
    fontSize: 20,
    fontWeight: 600,
  },
});
