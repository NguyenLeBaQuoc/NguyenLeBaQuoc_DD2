import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import Forgotpassword from './screens/Forgotpassword';
import Payment from './screens/HomeTabs/Payment';
import Productdetail from './screens/HomeTabs/Productdetail';
import Map from './screens/HomeTabs/Map';
import OrderConfirmation from './screens/HomeTabs/OrderConfirmation';
import OrderStatusDetails from './screens/HomeTabs/OrderStatusDetails';

const Stack = createNativeStackNavigator();

const Myapp = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen}/>
        <Stack.Screen options={{headerShown: false}} name="Details" component={DetailsScreen} />
        <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignInScreen} />
        <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUpScreen} />
        <Stack.Screen options={{headerShown: false}} name="Forgot" component={Forgotpassword} />
        <Stack.Screen options={{headerShown: false}} name="Payment" component={Payment} />
        <Stack.Screen options={{headerShown: false}} name="Productdetail" component={Productdetail} />
        <Stack.Screen options={{headerShown: false}} name="Map" component={Map} />
        <Stack.Screen options={{headerShown: false}} name="OrderConfirmation" component={OrderConfirmation} />
        <Stack.Screen options={{headerShown: false}} name="OrderStatusDetails" component={OrderStatusDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Myapp

const styles = StyleSheet.create({})