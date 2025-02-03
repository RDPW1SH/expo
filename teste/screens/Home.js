import { View, Text, Pressable, StyleSheet } from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Pressable onPress={() => navigation.navigate('Food', {})}>
        <Text>Go to Food</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1, alignItems: 'center', justifyContent: 'center',
    }
  })
  
export default HomeScreen;