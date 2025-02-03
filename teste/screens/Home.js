import { View, Text, Pressable, StyleSheet } from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1, alignItems: 'center', justifyContent: 'center',
      backgroundColor:'#A48686',
      
    },
    header: {
      width: '100%',
      height: 80,
      backgroundColor: '#8C3232',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
  })
  
export default HomeScreen;