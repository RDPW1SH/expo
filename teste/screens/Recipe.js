import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {RecipeComponentSteps, RecipeComponentIngredients} from '../components/RecipeComponente';



const RecipeScreen = ({ navigation, route }) => {
  let id = route?.params?.mealId;
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function handleData() {
      try {
        const res = await fetch('https://67a0e0ad5bcfff4fabe0f261.mockapi.io/api/testes/meals');
        if (res.ok) {
          const data = await res.json();
          const foundMeal = data.find((meal) => meal.id === id);
          console.log(foundMeal);
          setMeal(foundMeal);
          navigation.setOptions({ title: foundMeal?.title || 'food' });
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }

    handleData();
  }, [navigation]);

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ActivityIndicator size="large" color='#fff' />
        </SafeAreaView>
      </SafeAreaProvider>
    )
  }
  console.log(meal);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.view}>
        <Image style={styles.image} source={{ uri: meal.imageUrl }} />
        <View style={styles.view2}><Text style={styles.text}>{meal.duration} Minutes</Text><Text style={styles.text2}> {meal.complexity}</Text><Text style={styles.text2}>{meal.affordability}</Text></View>
        {/* Título Ingredientes */ }
        <RecipeComponentIngredients meal={meal} />
        {/* Título Steps */}
        <RecipeComponentSteps meal={meal} />
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A48686',
  },
  view: {
    width: '100%',
    marginBottom: 40,
    flex: 1, alignItems: 'center',
  },
  view2: {
    width: '100%',
    display: 'flex', flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300
  },
  text: {
    color: 'white',
    padding: 10,
  },
  text2: {
    color: 'white',
    padding: 10,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#703D3F',
    marginVertical: 10,
    textAlign: 'center',
  },
  underline: {
    height: 2,
    backgroundColor: '#703D3F',
    width: '70%',
    alignSelf: 'center',
    marginBottom: 5,
  },
  ingredientText: {
    backgroundColor: '#E1B497',
    color: '#9E5A4B',
    width: '70%',
    textAlign: 'center',
    margin: 2.5,
    padding: 2.5,
    borderRadius: 5,
  },
})
export default RecipeScreen