import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList, ScrollView, Dimensions, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const banners = [
  require('../../../assets/images/bn1.jpg'),
  require('../../../assets/images/bn2.jpg'),
  require('../../../assets/images/bn3.png'),
];

const Feed = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const bannerIndex = useRef(0);

  // State cho tìm kiếm, sản phẩm và danh mục
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Thêm state cho danh mục
  const [showAlert, setShowAlert] = useState(false);
  const alertOpacity = useRef(new Animated.Value(0)).current;

  // Fetch sản phẩm từ API
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => setProducts(json))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Fetch danh mục từ API
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((json) => setCategories(json))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      bannerIndex.current = (bannerIndex.current + 1) % banners.length;
      scrollViewRef.current.scrollTo({ x: bannerIndex.current * width, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Hàm thêm sản phẩm vào giỏ hàng
  const handleAddToCart = () => {
    setShowAlert(true);
    Animated.timing(alertOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(alertOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setShowAlert(false);
        });
      }, 2000);
    });
  };

  return (
    <View style={styles.container}>
      {/* Thông báo */}
      {showAlert && (
        <Animated.View style={[styles.alertContainer, { opacity: alertOpacity }]}>
          <Text style={styles.alertText}>Sản phẩm đã được thêm vào giỏ hàng</Text>
        </Animated.View>
      )}

      {/* Địa chỉ và biểu tượng */}
      <View style={styles.header}>
        <MaterialCommunityIcons name="map-marker" size={20} color="brown" />
        <Text style={styles.address} onPress={() => navigation.navigate('Map')}>Thu Duc, TPHCM </Text>
        <MaterialCommunityIcons style={styles.phoneIcon} name="phone-in-talk-outline" size={20} color="brown" />
      </View>

      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={20} color="gray" />
        <TextInput 
          placeholder="Search..." 
          style={styles.searchInput} 
          value={searchQuery} 
          onChangeText={setSearchQuery} 
        />
      </View>

      {/* Banners tự động cuộn */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        style={styles.bannerContainer}
      >
        {banners.map((banner, index) => (
          <Image key={index} source={banner} style={styles.banner} />
        ))}
      </ScrollView>

      {/* Tiêu đề danh mục */}
      <Text style={styles.categoryTitle}>Categories</Text>

      {/* Các nút danh mục */}
      <ScrollView horizontal style={styles.scrollView}>
        <View style={styles.categories}>
          {categories.map((category, index) => (
            <View key={index} style={styles.categoryButton}>
              <MaterialCommunityIcons name={getIconName(category)} size={20} color="white" />
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Text style={styles.categoryTitle}>Products</Text>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={filteredProducts} // Sử dụng danh sách đã lọc
        renderItem={({ item }) => (
          <TouchableOpacity
  style={styles.productCard}
  onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
>

            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.title}</Text>
            <View style={styles.ratingContainer}>
              {/* Hiển thị số sao theo rating.rate */}
              {Array.from({ length: 5 }, (_, index) => (
                <MaterialCommunityIcons
                  key={index}
                  name={index < Math.floor(item.rating.rate) ? 'star' : index < item.rating.rate ? 'star-half' : 'star-outline'}
                  size={16}
                  color="#FFD700"
                />
              ))}
              <Text style={styles.ratingText}> {item.rating.rate.toFixed(1)}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.productPrice}>${item.price}</Text>
              <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
                <MaterialCommunityIcons name="cart" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

// Helper function to get icon names based on category
const getIconName = (category) => {
  switch (category) {
    case 'coffee':
      return 'coffee';
    case 'desserts':
      return 'cupcake';
    case 'jewelery':
      return 'ring';
    case 'electronics':
      return 'cellphone';
    default:
      return 'coffee'; // Default icon
  }
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
  },
  alertContainer: {
    backgroundColor: '#6a1b9a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  alertText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bannerContainer: {
    width: '100%',
    height: 250,
    marginBottom: 20,
  },
  banner: {
    width: width,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  address: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  phoneIcon: {
    marginLeft: 'auto',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 5,
    marginBottom: 10,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    marginBottom: 10,
  },
  categories: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryButton: {
    backgroundColor: '#6a1b9a',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
 

  categoryText: {
    color: 'white',
    marginLeft: 5,
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
    margin: 5,
    height: 240,
    width: '45%',
    position: 'relative',
  },
  productImage: {
    width: 120,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#000',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a1b9a',
  },
  addButton: {
    backgroundColor: '#6a1b9a',
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  row: {
    justifyContent: 'space-between',
  },
});
