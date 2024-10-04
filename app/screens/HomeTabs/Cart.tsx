import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Cart = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="truck-fast-outline" size={50} color="#D2AE82" style={{ marginLeft: 250, marginBottom: 20, marginTop: 20}} />
      <Text style={styles.title}>YOUR ORDER:</Text>

      {/* Profiterol Item */}
      <View style={styles.itemContainer}>
      <Image source={require('../../../assets/images/a4.png')} style={styles.image} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>Profiterol</Text>
          <Text style={styles.itemPrice}>1$</Text>
        </View>
        <View style={styles.ratingAndCount}>
          <Text style={styles.rating}>⭐ 4.8</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>8</Text>
            <TouchableOpacity style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Espresso Item */}
      <View style={styles.itemContainer}>
      <Image source={require('../../../assets/images/a4.png')} style={styles.image} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>Espresso</Text>
          <Text style={styles.itemPrice}>2$</Text>
        </View>
        <View style={styles.ratingAndCount}>
          <Text style={styles.rating}>⭐ 4.7</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>2</Text>
            <TouchableOpacity style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Total and Go to Cart Button */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: 12$</Text>
        <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Payment')}>
          <Text style={styles.cartButtonText}>Go to Cart</Text>
          <MaterialCommunityIcons name='chevron-right' size={30} color={'#fff'} style={{ marginLeft: 90}}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    paddingHorizontal: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    color: 'gray',
  },
  ratingAndCount: {
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 5,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 200,
    marginBottom: 20,
  },
  cartButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    width: 260,
    flexDirection: 'row',
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 20,
  },
});
