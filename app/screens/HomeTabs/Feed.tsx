import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList, ScrollView, Dimensions, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const products = [
  { id: 1, name: 'CAPPUCCINO', price: '3$', description: 'A rich and creamy coffee.', image: require('../../../assets/images/h1.png') },
  { id: 2, name: 'LATTE MEO', price: '4$', description: 'Smooth and milky coffee.', image: require('../../../assets/images/h3.png') },
  { id: 3, name: 'ESPRESSO', price: '2$', description: 'Strong and bold coffee.', image: require('../../../assets/images/h2.png') },
  { id: 4, name: 'MOCHA', price: '3.5$', description: 'Chocolate and coffee blend.', image: require('../../../assets/images/h4.png') },
  { id: 5, name: 'Profiterol', price: '3$', description: 'Delicious cream-filled pastry.', image: require('../../../assets/images/a4.png') },
  { id: 6, name: 'ESPRESSO DIFICA', price: '2$', description: 'Strong espresso with a twist.', image: require('../../../assets/images/a3.png') },
];

const banners = [
  require('../../../assets/images/bn1.jpg'),
  require('../../../assets/images/bn2.jpg'),
  require('../../../assets/images/bn3.png'),
];

const Feed = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const bannerIndex = useRef(0);
  
  // State cho tìm kiếm
  const [searchQuery, setSearchQuery] = useState('');
  // State cho thông báo
  const [showAlert, setShowAlert] = useState(false);
  const alertOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      bannerIndex.current = (bannerIndex.current + 1) % banners.length;
      scrollViewRef.current.scrollTo({ x: bannerIndex.current * width, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Lọc sản phẩm dựa trên từ khóa tìm kiếm
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          value={searchQuery} // Gán giá trị từ state
          onChangeText={setSearchQuery} // Cập nhật giá trị khi người dùng nhập
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
          {['COFFEE', 'DESSERTS', 'ALCOHOL', 'ALCOHOL FREE', 'BREAKFAST'].map((category, index) => (
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
            onPress={() => navigation.navigate('Productdetail')}
          >
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            {/* Mô tả sản phẩm */}
            <Text style={styles.productDescription}>{item.description}</Text>
            <View style={styles.ratingContainer}>
              <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
              <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
              <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
              <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
              <MaterialCommunityIcons name="star-half" size={16} color="#FFD700" />
              <Text style={styles.ratingText}> 4.9</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.productPrice}>{item.price}</Text>
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
    case 'COFFEE':
      return 'coffee';
    case 'DESSERTS':
      return 'cupcake';
    case 'ALCOHOL':
      return 'glass-wine';
    case 'ALCOHOL FREE':
      return 'cup-water';
    case 'BREAKFAST':
      return 'food-croissant';
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
    padding: 15, // Tăng độ dày padding
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 0, // Đặt trái bằng 0 để bắt đầu từ cạnh trái
    right: 0, // Đặt phải bằng 0 để căn chỉnh với cạnh phải
    zIndex: 1, // Đặt ở trên cùng
  },
  alertText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18, // Tăng kích thước font chữ
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
    width: '100%', // Đặt chiều rộng 100% để chiếm toàn bộ không gian card
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
