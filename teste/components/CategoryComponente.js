import { Text, StyleSheet, View, Image, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';

function CategoryComponent({ id, title, imageUrl, duration, complexity, affordability}) {
    const navigation=useNavigation();
    return (
        <View style={[styles.listContainer, styles.shadowProp]}>
            <Pressable
                onPress={() => navigation.navigate('Recipe', { mealId: id })}
            >
                <Image style={styles.listImage} source={{ uri: imageUrl }} />
                <View style={styles.listView}>
                    <Text style={styles.listTitle}>{title}</Text>
                    <View style={styles.listTextView}>
                        <Text style={styles.listText}>{duration} Minutes</Text>
                        <Text style={styles.listText}>{complexity}</Text>
                        <Text style={styles.listText}>{affordability}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
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
export default CategoryComponent;