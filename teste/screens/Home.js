import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';


const Item = ({ id, title, color, navigation }) => (
  <Pressable
    style={[styles.item, { backgroundColor: color }]}
    onPress={() => navigation.navigate('Category', {categoryId: id})}
  >
    <Text style={styles.title}>{title}</Text>
  </Pressable>
);


function HomeScreen({ navigation }) {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function handleData() {

      try {
        const res = await fetch('https://67a0e0ad5bcfff4fabe0f261.mockapi.io/api/testes/Category');
        if(res.ok) {
          const data = await res.json();
          setCategories(data);
        }

      } catch (e) {
        console.error(e)
      }     
      setLoading(false); 
    }
    navigation.setOptions({title: 'All Categories'})
    handleData()
    
  }, [navigation])

  if(loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ActivityIndicator size="large" color='#fff'/>
        </SafeAreaView>
      </SafeAreaProvider>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={categories}
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