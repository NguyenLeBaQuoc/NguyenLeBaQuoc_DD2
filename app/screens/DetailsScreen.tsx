import { StyleSheet, Text, View , Button} from 'react-native';
import React from 'react';

const DetailsScreen = ({navigation}: {navigation: any}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#577be9' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to SigIn"
        onPress={() => navigation.navigate('SignIn')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({})