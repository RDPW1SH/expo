import { View, FlatList, StyleSheet, Text, Pressable } from "react-native";
import { useState, useEffect, useCallback } from "react";
import LoadingComponent from "../components/LoadingComponent";
import HomeCategoriesComponent from "../components/HomeCategoriesComponent";
import Icon from "../components/IconComponent";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";


function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  function chamadaApi() {
    axios
      .get("https://localhost:7199/api/category/listar-categorias")
      .then(function (response) {
        const data = response.data;
        setCategories(data);
        console.log(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  useEffect(() => {
    /*
    async function handleData() {
      try {
        const res = await fetch(
          //"https://67a0e0ad5bcfff4fabe0f261.mockapi.io/api/testes/Category"
          "https://localhost:7199/api/category/listar-categorias"
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
    */



    navigation.setOptions({ title: "All Categories" });
    //handleData();
    const chamar = navigation.addListener("focus", () => {
      chamadaApi();
    });
    return chamar;
  }, [navigation]);

  /*
    useFocusEffect(
      useCallback(() => {
        chamadaApi(); // Atualiza os dados sempre que a tela for focada
      }, []))
  */
  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={categories}
        ListFooterComponent={
          <View style={styles.addToListView}>
            <Text style={styles.addToListViewText}>Edit categories</Text>
            <Pressable onPress={() => navigation.navigate("CategoryList")}>
              <Icon name="edit" size={24} color="black" />
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <HomeCategoriesComponent
            id={item.id}
            title={item.title}
            color={item.color}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A48686",
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

export default HomeScreen;
