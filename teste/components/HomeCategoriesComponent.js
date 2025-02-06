import { Pressable, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeCategoriesComponent({ id, title, color }) {

    const navigation = useNavigation();

    return (
          <Pressable
            style={[styles.item, { backgroundColor: color }]}
            onPress={() => navigation.navigate('Category', {categoryId: id, categoryTitle: title})}
          >
            <Text style={styles.title}>{title}</Text>
          </Pressable>
        
    )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', 
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 10, // Bordas arredondadas
    padding: 5, 
    height:150,
    width:150,
    margin: 10, // Margem de 10px entre os itens
    alignItems: 'center',
    justifyContent: 'center',
  },
})