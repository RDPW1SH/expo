import { Text, StyleSheet, FlatList, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MEALS } from '../../../constants/data/dummy-data';

const CategoryScreen = ({ route }) => {

    const [meals, setMeals] = useState();
    // console.log(route.params)
    let id = route?.params?.id; 

    useEffect(() => {

        const filteredMeals = MEALS.filter(meal => meal.categoryIds.includes(id));
        setMeals(filteredMeals);

    }, [id])

    const listComponent = ({item}) => (
        <View style={styles.listContainer}>
            <Image source={{ uri: item.imageUrl }} width={360} height={220} />
            <View style={styles.listView}>
                <Text style={styles.listTitle}>{item.title}</Text>
                <View style={styles.listTextView}>
                    <Text style={styles.listText}>{item.duration} Minutes</Text>
                    <Text style={styles.listText}>{item.complexity}</Text>
                    <Text style={styles.listText}>{item.affordability}</Text>    
                </View>
            </View>
        </View>
    ); 
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            <Text>Categoria ID: {id}</Text>
            <FlatList data={meals} renderItem={listComponent} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  };
  
export default CategoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
        backgroundColor:'#A48686',
        
      },
    listContainer: {
        minWidth: 360,
        height: 'auto',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'purple',
    },
    listView: {
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    listTextView: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    listTitle: {
        fontSize: 20,
        fontStyle: 'bold',
        fontWeight: '600',
        paddingBottom: 15,
    },
    listText: {
        fontSize: 14,
        fontStyle: 'normal',
    }
})