import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const data = [
  {
    id: '1',
    name: 'Tuna Salad',
    price: '14.22$',
    rating: '4.8',
    description: 'A delicious and healthy tuna salad.',
    image: require('../../../assets/images/a1.png'),
    quantity: 0,
  },
  {
    id: '2',
    name: 'White Wine',
    price: '20.45$',
    rating: '4.4',
    description: 'A fine white wine for special occasions.',
    image: require('../../../assets/images/a2.png'),
    quantity: 0,
  },
  {
    id: '3',
    name: 'Espresso',
    price: '2$',
    rating: '4.7',
    description: 'Strong and bold coffee for espresso lovers.',
    image: require('../../../assets/images/a3.png'),
    quantity: 0,
  },
  {
    id: '4',
    name: 'Profiterol',
    price: '1$',
    rating: '4.8',
    description: 'Delicious cream-filled pastry to satisfy your sweet tooth.',
    image: require('../../../assets/images/a4.png'),
    quantity: 0,
  },
];

const Notifications = () => {
  const [quantities, setQuantities] = useState(data.reduce((acc, item) => {
    acc[item.id] = item.quantity; 
    return acc; 
  }, {}));

  // State cho tìm kiếm
  const [searchQuery, setSearchQuery] = useState('');

  const handleIncrease = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] + 1,
    }));
  };

  const handleDecrease = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(prevQuantities[id] - 1, 0),
    }));
  };

  // Lọc dữ liệu dựa trên từ khóa tìm kiếm
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item: { image, name, price, rating, description, id } }) => (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.rating}>
          <AntDesign name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.favorite}>
        <AntDesign name="heart" size={24} color="red" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.cartButton}>
        <AntDesign name="shoppingcart" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.quantityWrapper}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleDecrease(id)}>
            <FontAwesome name="minus" size={18} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantities[id]}</Text>
          <TouchableOpacity onPress={() => handleIncrease(id)}>
            <FontAwesome name="plus" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search .."
          style={styles.searchInput}
          value={searchQuery} // Gán giá trị từ state
          onChangeText={setSearchQuery} // Cập nhật giá trị khi người dùng nhập
        />
      </View>
      <FlatList
        data={filteredData} // Sử dụng danh sách đã lọc
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  searchContainer: {
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: 'relative',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  description: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 5,
  },
  favorite: {
    paddingHorizontal: 10,
  },
  cartButton: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityWrapper: {
    position: 'absolute',
    right: 10,
    bottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#f9f9f9',
  },
  quantityText: {
    marginHorizontal: 5,
    fontSize: 16,
  },
});
