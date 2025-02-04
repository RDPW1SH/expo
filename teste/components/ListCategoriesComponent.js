import { Pressable, Text, StyleSheet, View } from "react-native";
import Icon from "./IconComponent";

export default function ListCategoriesComponent({ id, title, navigation, onDelete }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.viewIcons}>
                <Pressable onPress={() => navigation.navigate('EditCategory', { categoryId: id })}>
                    <Icon name={'edit'} size={22} color={'black'} />
                </Pressable>
                <Pressable onPress={onDelete}>
                    <Icon name={'trash'} size={22} color={'red'} />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    viewIcons: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
});
