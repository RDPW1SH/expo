import { Text, StyleSheet, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CategoryComponent from '../components/CategoryComponente';
import LoadingComponent from '../components/LoadingComponent';

const CategoryScreen = ({ route, navigation }) => {

    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);

    let categoryId = route?.params?.categoryId;

    useEffect(() => {
        async function handleData() {

            try {

                const res = await fetch('https://67a0e0ad5bcfff4fabe0f261.mockapi.io/api/testes/meals');
                if (res.ok) {
                    const data = await res.json();
                    const filteredMeals = data.filter(meal => meal.categoryIds.includes(categoryId));
                    setMeals(filteredMeals);
                }
            } catch (e) {
                console.error(e)
            }
            setLoading(false);
        }
        navigation.setOptions({ title: route?.params?.categoryTitle || 'Categoria' });
        handleData()
    }, [categoryId])

    if (loading) {
        return (
            <LoadingComponent />
        )
    }

    const renderItem = ( itemData ) => {
        const item = itemData.item
        const mealItemProps={id: item.id, title: item.title, imageUrl: item.imageUrl, duration: item.duration, complexity:item.complexity,affordability:item.affordability};
        return <CategoryComponent {...mealItemProps} />
    };

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
});
