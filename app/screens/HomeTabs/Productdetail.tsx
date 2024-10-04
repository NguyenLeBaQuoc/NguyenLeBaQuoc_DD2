import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProductDetail = () => {
  const navigation = useNavigation();
  const [size, setSize] = useState('Small');
  const [toppings, setToppings] = useState({
    Caramel: 0,
    Banana: 0,
    Chocolate: 0,
    Strawberry: 0,
  });

  const handleSizeChange = (size) => {
    setSize(size);
  };

  const handleToppingChange = (topping, action) => {
    setToppings((prev) => ({
      ...prev,
      [topping]: action === 'increment' ? prev[topping] + 1 : prev[topping] > 0 ? prev[topping] - 1 : 0,
    }));
  };

  const totalPrice = 4 + Object.values(toppings).reduce((acc, val) => acc + val, 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
        <MaterialCommunityIcons name='chevron-left-circle' size={40} style={styles.backIcon} />
      </TouchableOpacity>

      <Image
        source={require('../../../assets/images/a1.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Cappuccino</Text>

      <View style={styles.ratingContainer}>
        <Text>⭐ 4.9</Text>
        <TouchableOpacity style={styles.heartButton}>
          <Text>❤️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sizeContainer}>
        <Text style={styles.sectionTitle}>Coffee Size</Text>
        <View style={styles.sizeButtons}>
          {['Small', 'Medium', 'Large'].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => handleSizeChange(item)}
              style={[
                styles.sizeButton,
                size === item && styles.selectedSizeButton,
              ]}
            >
              <Text style={size === item ? styles.selectedSizeText : styles.sizeText}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.aboutContainer}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ipsum vivamus velit lorem amet.
        </Text>
      </View>

      <View style={styles.toppingsContainer}>
        <Text style={styles.sectionTitle}>Add Topping(1$)</Text>
        {Object.keys(toppings).map((topping) => (
          <View key={topping} style={styles.toppingRow}>
            <Text>{topping}</Text>
            <View style={styles.toppingButtons}>
              <TouchableOpacity
                onPress={() => handleToppingChange(topping, 'decrement')}
                style={styles.toppingButton}
              >
                <Text>-</Text>
              </TouchableOpacity>
              <Text>{toppings[topping]}</Text>
              <TouchableOpacity
                onPress={() => handleToppingChange(topping, 'increment')}
                style={styles.toppingButton}
              >
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.cartContainer}>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartButtonText} onPress={() => navigation.navigate('Cart')}>Add to Cart</Text>
        </TouchableOpacity>
        <Text style={styles.totalPrice}>{totalPrice}$</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  backIcon: {
    marginLeft: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    marginTop: 10,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  heartButton: {
    padding: 5,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
  },
  sizeContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  sizeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sizeButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  selectedSizeButton: {
    backgroundColor: '#8B4513',
  },
  sizeText: {
    color: '#000',
  },
  selectedSizeText: {
    color: '#fff',
  },
  aboutContainer: {
    marginTop: 20,
  },
  aboutText: {
    color: '#555',
  },
  toppingsContainer: {
    marginTop: 20,
  },
  toppingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  toppingButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toppingButton: {
    padding: 5,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
  },
  cartContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#000',
  },
  cartButtonText: {
    color: '#fff',
  },
  totalPrice: {
    fontSize: 20,
  },
});

export default ProductDetail;
