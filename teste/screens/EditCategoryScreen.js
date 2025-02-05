import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import LoadingComponent from "../components/LoadingComponent";
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from "reanimated-color-picker";
import axios from "axios";

const EditCategoryScreen = ({ route, navigation }) => {
  const [category, setCategory] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const onSelectColor = ({ hex }) => {
    setCategory((prev) => ({
      ...prev,
      color: hex,
    }));
    /*
        console.log(category.color);
        console.log(hex);*/
  };

  let categoryId = route?.params?.categoryId;

  useEffect(() => {
    async function handleData() {
      try {
        const res = await fetch(
          "https://67a0e0ad5bcfff4fabe0f261.mockapi.io/api/testes/Category"
        );

        if (res.ok) {
          const data = await res.json();
          // console.log(data);
          setCategory(data.find((category) => category.id == categoryId));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    handleData();
  }, [navigation]);

  if (loading) {
    return <LoadingComponent />;
  }

  const handleEdit = async () => {
    axios
      .put("/user", {
        title: newTitle,
        color: category.color,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.formViewCategoryName}>
            <Text style={styles.formViewTitle}>Nome da Categoria</Text>
            <TextInput
              style={styles.formViewInput}
              placeholder={`Atual: ${category.title}`}
              onChange={(e) => setNewTitle(e.target.value)}
            ></TextInput>
          </View>
          <View style={styles.formViewCategoryColor}>
            <Text style={styles.formViewTitle}>Cor da categoria</Text>
            <Button
              title="Choose a color"
              color={category.color}
              onPress={() => setShowModal(true)}
            />
            <Modal visible={showModal} animationType="slide">
              <ColorPicker value="red" onComplete={onSelectColor}>
                <Preview />
                <Panel1 />
                <HueSlider />
                <OpacitySlider />
                <Swatches />
              </ColorPicker>
              <Button title="Ok" onPress={() => setShowModal(false)} />
            </Modal>
          </View>
          <Pressable
            onPress={() => handleEdit()}
            style={styles.confirmPressable}
          >
            <Text style={styles.confirmPressableText}>Editar Categoria</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#A48686",
    paddingHorizontal: 25,
    paddingVertical: 50,
  },
  formContainer: {
    display: "flex",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "white",
    gap: 10,
  },
  formViewCategoryName: {
    display: "flex",
    gap: 5,
  },
  colorPicker: {
    width: "100%",
    height: "auto",
    padding: 15,
  },
  formViewTitle: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: 600,
  },
  formViewInput: {
    fontSize: 16,
    borderBottomColor: "#A48686",
    borderBottomWidth: 2,
  },
  confirmPressable: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "lightblue",
    textAlign: "center",
  },
  confirmPressableText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default EditCategoryScreen;
