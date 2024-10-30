import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

// Định nghĩa kiểu cho RootStackParamList (cần tạo trước trong types.ts)
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type ProductDetailScreenProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

const ProductDetail = () => {
  const navigation = useNavigation<ProductDetailScreenProp>();
  const route = useRoute<ProductDetailRouteProp>();

  const { productId } = route.params;  // Lấy productId từ route.params
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);  // Trạng thái loading
  const [error, setError] = useState<string | null>(null);  // Trạng thái lỗi

  useEffect(() => {
    // Fetch dữ liệu sản phẩm từ API
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        setError('Lỗi khi tải dữ liệu sản phẩm.');
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetail();
    }
  }, [productId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
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
        <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.cartButtonText}>Add to Cart</Text>
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
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default ProductDetail;
