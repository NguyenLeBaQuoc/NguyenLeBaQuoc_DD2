import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const OrderConfirmation = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="truck-fast-outline" size={50} color="#D2AE82" style={styles.icon} />

      <Text style={styles.thankYouText}>Thank You For Your Order!</Text>
      <Text style={styles.waitText}>Wait For The Call</Text>

      <TouchableOpacity style={styles.trackButton} onPress={() => navigation.navigate('OrderStatusDetails')}>
        <Text style={styles.buttonText}>Track Your Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Màu nền đen
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  thankYouText: {
    color: '#D5B46D', // Màu vàng nhạt
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  waitText: {
    color: '#D5B46D', // Màu vàng nhạt
    fontSize: 16,
    marginBottom: 30,
  },
  trackButton: {
    backgroundColor: '#C48A50', // Màu nâu
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: '#fff', // Màu chữ trắng
    fontSize: 16,
  },
});

export default OrderConfirmation;
