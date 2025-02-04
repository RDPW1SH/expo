import { View, FlatList, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import LoadingComponent from '../components/LoadingComponent';
import HomeCategoriesComponent from '../components/HomeCategoriesComponent';



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
      } finally {
        setLoading(false); 
      }  
      
    }
    navigation.setOptions({title: 'All Categories'})
    handleData()
    
  }, [navigation])

  if(loading) {
    return (
      <LoadingComponent />
    )
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={categories}
        renderItem={({ item }) =>
          <HomeCategoriesComponent
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
})

export default HomeScreen;