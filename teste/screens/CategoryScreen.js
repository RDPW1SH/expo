import {
  Text,
  StyleSheet,
  FlatList,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CategoryComponent from "../components/CategoryComponente";
import LoadingComponent from "../components/LoadingComponent";
import Icon from "../components/IconComponent";

const CategoryScreen = ({ route, navigation }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  let categoryId = route?.params?.categoryId;
  let categoryTitle = route?.params?.categoryTitle;

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          const res = await fetch(
            "https://localhost:7199/api/meal/listar-meal"
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
      navigation.setOptions({ title: categoryTitle });
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
      <ScrollView>
        <FlatList
          data={meals}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={
            <View style={styles.addToListView}>
              <Text style={styles.addToListViewText}>Criar receita</Text>
              <Pressable onPress={() => navigation.navigate("AddRecipe")}>
                <Icon name="plus" size={24} color="black" />
              </Pressable>
            </View>
          }
          ListEmptyComponent={<Text>No meals found</Text>}
        />
      </ScrollView>
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
