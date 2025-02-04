import { Text, StyleSheet, View} from 'react-native'
function RecipeComponentSteps({ meal }) {

    return (
        <View style={styles.view}>
            <Text style={styles.title}>Steps</Text>
            <View style={styles.underline}></View>
            {meal.steps?.map((steps, index) => (
                <Text key={index} style={styles.ingredientText}>
                    {steps}
                </Text>
            ))}
        </View>
    );
}
const styles = StyleSheet.create({
    view: {
        flex: 1, alignItems: 'center',
        width: '100%',
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

export default RecipeComponentSteps;