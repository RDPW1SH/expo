import { View, FlatList, StyleSheet, Text, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LoadingComponent from '../components/LoadingComponent';

const EditCategoryScreen = ({route, navigation}) => {

    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    let categoryId = route?.params?.categoryId;

        useEffect(() => {
          async function handleData() {
            try {
    
              const res = await fetch('https://67a0e0ad5bcfff4fabe0f261.mockapi.io/api/testes/Category');
        
                if(res.ok) {
                  const data = await res.json();
                  console.log(data);
                  setCategory(data.find((category) => category.id == categoryId));
                }
              } catch (e) {
                console.error(e)
              } finally {
                setLoading(false); 
              }  
              
            }
            navigation.setOptions({title: category?.title})
            handleData()
            
          }, [navigation])
        
        if(loading) {
          return (
            <LoadingComponent />
          )
        }

  return (
    <View>
      <Text>{category.id}</Text>
      <Text>{category.title}</Text>
      <Text>{category.colorr}</Text>


    </View>
  )
}

export default EditCategoryScreen