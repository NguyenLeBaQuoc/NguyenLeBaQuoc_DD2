import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';  // Import đúng kiểu navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import axios from 'axios';

type ProductDetailScreenProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

const ProductDetail = () => {
  const navigation = useNavigation<ProductDetailScreenProp>();
  const route = useRoute<ProductDetailRouteProp>();

  const { productId } = route.params;  // Lấy productId từ route.params
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    // Fetch dữ liệu sản phẩm từ API
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (productId) {
      fetchProductDetail();
    }
  }, [productId]);

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="chevron-left-circle" size={40} style={styles.backIcon} />
      </TouchableOpacity>

      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>

      <View style={styles.ratingContainer}>
        <Text>⭐ {product.rating.rate}</Text>
        <TouchableOpacity style={styles.heartButton}>
          <Text>❤️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.aboutContainer}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>{product.description}</Text>
      </View>

      <View style={styles.cartContainer}>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartButtonText} onPress={() => navigation.navigate('Cart')}>
            Add to Cart
          </Text>
        </TouchableOpacity>
        <Text style={styles.totalPrice}>{product.price}$</Text>
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
  aboutContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  aboutText: {
    color: '#555',
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
