import { Text, StyleSheet,Pressable ,FlatList, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MEALS, CATEGORIES } from '../constants/data/dummy-data';

const CategoryScreen = ({ route, navigation }) => {
    const [meals, setMeals] = useState([]);
    const categoryId = route?.params?.categoryId;
    const category = CATEGORIES.find((cat) => cat.id === categoryId);
    console.log(category.title)

    useEffect(() => {
        if (categoryId) {
            const filteredMeals = MEALS.filter(meal => meal.categoryIds.includes(categoryId));
            setMeals(filteredMeals);
        }

        if (category) {
            navigation.setOptions({ title: category.title });
        }
    }, [categoryId, category, navigation]);

    const renderItem = ({ item }) => (
        <View style={[styles.listContainer, styles.shadowProp]}>
            <Pressable
                onPress={() => navigation.navigate('Recipe', { mealId: item.id })}
            >
                <Image style={styles.listImage} source={{ uri: item.imageUrl }} />
                <View style={styles.listView}>
                    <Text style={styles.listTitle}>{item.title}</Text>
                    <View style={styles.listTextView}>
                        <Text style={styles.listText}>{item.duration} Minutes</Text>
                        <Text style={styles.listText}>{item.complexity}</Text>
                        <Text style={styles.listText}>{item.affordability}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={meals}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={<Text>No meals found</Text>}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default CategoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A48686',
        paddingHorizontal: 25,
        paddingTop: 20,
    },
    listContainer: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 15,
        overflow: 'hidden',
    },
    listView: {
        padding: 15,
        alignItems: 'center',
    },
    listImage: {
        width: '100%',
        height: 220,
    },
    listTextView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
    },
    listTitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        paddingBottom: 10,
    },
    listText: {
        fontSize: 14,
    },
    shadowProp: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    }
});
