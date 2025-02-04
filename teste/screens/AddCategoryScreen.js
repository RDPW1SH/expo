import { View, Text, StyleSheet, TextInput, Button, Modal} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';
import { useSharedValue } from 'react-native-reanimated';
const AddCategoryScreen = () => {

    
    const [showModal, setShowModal] = useState(false);
    const [defaultColor, setDefaultColor] = useState('#2196f3');
    const navigation = useNavigation();

    const onSelectColor = ({ hex }) => {
      setDefaultColor(hex);
      console.log(hex);
    };
    useEffect(() => {
        navigation.setOptions({ title: 'Adicionar Categoria' });
    }, [navigation])
    
    return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.formViewCategoryName}>
                    <Text style={styles.formViewTitle}>Nome da Categoria</Text>
                    <TextInput n style={styles.formViewInput} placeholder='Example: "Asian"'></TextInput>
                </View>
                <View style={styles.formViewCategoryColor}>
                    <Text style={styles.formViewTitle}>Cor da categoria</Text>
                    <Button title='Choose a color' color={defaultColor} onPress={() => setShowModal(true)} />

                    <Modal visible={showModal} animationType='slide'>
                        <ColorPicker style={''} value='red' onComplete={onSelectColor}>
                            <Preview />
                            <Panel1 />
                            <HueSlider />
                            <OpacitySlider />
                            <Swatches />
                        </ColorPicker>
                        <Button title='Ok' onPress={() => setShowModal(false)} />
                    </Modal>
                </View>
            </View>
        </SafeAreaView>   
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center',
        backgroundColor: '#A48686',
        paddingHorizontal: 25,
        paddingVertical: 50,
    },
    formContainer: {
        display: 'flex',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        gap: 10,
    },
    formViewCategoryName: {
        display: 'flex',
        gap: 5
    },
    formViewCategoryColor: {

    },
    colorPicker: {
        width: '100%',
        height: 'auto',
        padding: 15,
    },
    formViewTitle: {
        paddingTop: 10,
      fontSize: 18,
      fontWeight: 600,  
    },
    formViewInput: {
        fontSize: 16,
        borderBottomColor: '#A48686',
        borderBottomWidth: 2,
    }
})

export default AddCategoryScreen