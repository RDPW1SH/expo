import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  Modal,
  Button,
  DevSettings,
} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import LoadingComponent from "../components/LoadingComponent";
import ListCategoriesComponent from "../components/ListCategoriesComponent";
import Icon from "../components/IconComponent";
import axios from "axios";

const CategoryList = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
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

    navigation.setOptions({ title: "Lista de categorias" });
    const chamar = navigation.addListener("focus", () => {
      handleData();
    });
    return chamar;


  }, [navigation]);

  const confirmDelete = (id) => {
    setSelectedCategoryId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!selectedCategoryId) return;

    // Editar para eliminar categoria
    //setSelectedCategoryId(0);
    axios
      .delete("https://localhost:7199/api/category", {
        params: {
          Id: selectedCategoryId,
        },
      })
      .then(function (response) {
        setCategories(
          categories.filter((category) => category.id !== selectedCategoryId)
        );
        setSelectedCategoryId(null);
        DevSettings.reload();
      })
      .catch(function (error) {
        console.log(error);
      });

    setShowModal(false);
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          numColumns={1}
          data={categories}
          renderItem={({ item }) => (
            <ListCategoriesComponent
              id={item.id}
              title={item.title}
              navigation={navigation}
              onDelete={() => confirmDelete(item.id)} // Passar a função de delete
            />
          )}
          ListFooterComponent={
            <View style={styles.addToListView}>
              <Text style={styles.addToListViewText}>Add a category</Text>
              <Pressable onPress={() => navigation.navigate("AddCategory")}>
                <Icon name="plus" size={22} color="black" />
              </Pressable>
            </View>
          }
          keyExtractor={(item) => item.id}
        />
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
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 30,
    paddingHorizontal: 20,
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
    fontWeight: "600",
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

export default CategoryList;
