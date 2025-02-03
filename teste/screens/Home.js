import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { CATEGORIES } from '../constants/data/dummy-data';


const Item = ({ id, title, color, navigation }) => (
  <Pressable
    style={[styles.item, { backgroundColor: color }]}
    onPress={() => navigation.navigate('Food', id)}
  >
    <Text style={styles.title}>{title}</Text>
  </Pressable>
);


function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={CATEGORIES}
        renderItem={({ item }) =>
          <Item
            id={item.id}
            title={item.title}
            color={item.color}
            navigation={navigation}
          />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#A48686',
  },
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

export default HomeScreen;