import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Lấy dữ liệu giỏ hàng từ API
  const fetchCart = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/carts/1'); // Lấy giỏ hàng có ID 1
      const cartData = await response.json();
      return cartData.products; // Trả về sản phẩm trong giỏ hàng
    } catch (error) {
      console.error('Error fetching cart:', error);
      return [];
    }
  };

  // Lấy dữ liệu sản phẩm từ API
  const fetchProducts = async (productIds: number[]) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      // Lọc chỉ những sản phẩm có trong giỏ hàng
      const filteredProducts = data.filter(product => 
        productIds.includes(product.id)
      );
      setProducts(filteredProducts); // Lưu sản phẩm vào state
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Gọi các API khi component được mount
  useEffect(() => {
    const fetchData = async () => {
      const cartProducts = await fetchCart(); // Lấy sản phẩm từ giỏ hàng
      setCartItems(cartProducts); // Lưu sản phẩm vào cartItems
      const productIds = cartProducts.map(item => item.productId); // Lấy danh sách productId
      await fetchProducts(productIds); // Lấy sản phẩm tương ứng
      setIsLoading(false);
    };

    fetchData();
  }, []); // Gọi chỉ một lần khi component được mount

  // Xử lý thay đổi số lượng
  const handleQuantityChange = (id: number, change: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.productId === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  // Xử lý xoá sản phẩm
  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.productId !== id));
  };

  // Tính tổng tiền
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Giỏ Hàng</Text>
      {cartItems.map(item => {
        const product = products.find(p => p.id === item.productId); // Tìm sản phẩm tương ứng
        if (!product) return null; // Nếu không tìm thấy, không hiển thị gì

        return (
          <View key={product.id} style={styles.productContainer}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{product.title}</Text>
              <Text style={styles.productPrice}>{product.price.toLocaleString()} VND</Text>
      
              {/* Hàng nút số lượng và nút xóa */}
              <View style={styles.actionRow}>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => handleQuantityChange(product.id, -1)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => handleQuantityChange(product.id, 1)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
      
                <TouchableOpacity onPress={() => handleRemoveItem(product.id)} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Xóa</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })}

      <Text style={styles.totalPrice}>Tổng Tiền: {totalPrice.toLocaleString()} VND</Text>

      <TouchableOpacity style={styles.placeOrderButton}>
        <Text style={styles.placeOrderText}>Thanh toán</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles remains unchanged

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  productDetails: {
    marginLeft: 10,
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#d32f2f',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    alignSelf: 'flex-end',
  },
  deleteButton: {
    backgroundColor: '#FFC0CB',
    padding: 10,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  placeOrderButton: {
    backgroundColor: '#FFC0CB',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: 150,
    height: 50,
    alignSelf: 'flex-end',
  },
  placeOrderText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cart;
