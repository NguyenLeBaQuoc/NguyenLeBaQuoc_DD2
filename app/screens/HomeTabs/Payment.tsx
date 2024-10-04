import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button, ScrollView, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Payment = () => {
  const navigation = useNavigation();
  const [profiterolCount, setProfiterolCount] = useState(8);
  const [espressoCount, setEspressoCount] = useState(2);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(''); // State to store selected payment method

  const total = (profiterolCount * 1) + (espressoCount * 2);

  const handleIncrement = (item: string) => {
    if (item === 'profiterol') setProfiterolCount(profiterolCount + 1);
    else if (item === 'espresso') setEspressoCount(espressoCount + 1);
  };

  const handleDecrement = (item: string) => {
    if (item === 'profiterol' && profiterolCount > 0) setProfiterolCount(profiterolCount - 1);
    else if (item === 'espresso' && espressoCount > 0) setEspressoCount(espressoCount - 1);
  };

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method); // Set the selected payment method
    setModalVisible(false); // Close modal after selection
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <MaterialCommunityIcons name='chevron-left-circle' size={40} style={{ marginLeft: 20}} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>YOUR ORDER:</Text>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Product</Text>
          <Text style={styles.tableHeaderText}>Price</Text>
          <Text style={styles.tableHeaderText}>Quantity</Text>
          <Text style={styles.tableHeaderText}>Actions</Text>
        </View>

        {/* Profiterol Row */}
        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Image
              source={require('../../../assets/images/a4.png')}
              style={styles.image}
            />
            <Text>Profiterol</Text>
          </View>
          <Text style={styles.tableCell}>1$</Text>
          <Text style={styles.tableCell}>{profiterolCount}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => handleDecrement('profiterol')}>
              <Text style={styles.counterButton}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleIncrement('profiterol')}>
              <Text style={styles.counterButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Espresso Row */}
        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Image
              source={require('../../../assets/images/a3.png')}
              style={styles.image}
            />
            <Text>Espresso</Text>
          </View>
          <Text style={styles.tableCell}>2$</Text>
          <Text style={styles.tableCell}>{espressoCount}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => handleDecrement('espresso')}>
              <Text style={styles.counterButton}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleIncrement('espresso')}>
              <Text style={styles.counterButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.location}>
          <MaterialCommunityIcons name="map-marker" size={20} color="brown" />
          <Text style={styles.address}>Tuy Hoa, Phu Yen</Text>
        </View>

        {/* Payment Method Button */}
        <View style={styles.paymentMethod}>
          <Text>Payment method:</Text>
          <Button
            title={selectedPaymentMethod ? selectedPaymentMethod : "Choose Payment Method"}
            onPress={() => setModalVisible(true)} 
          />
        </View>

        <Text style={styles.total}>Total: {total}$</Text>
      </ScrollView>

      {/* Fixed Create Order Button */}
      <TouchableOpacity style={styles.createOrderButton} onPress={() => navigation.navigate('OrderConfirmation')}>
        <Text style={styles.createOrderText}>Create Order</Text>
      </TouchableOpacity>

      {/* Modal for Payment Methods */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal on request
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* ApplePay Option */}
            <TouchableOpacity 
              style={styles.paymentOption} 
              onPress={() => handlePaymentMethodSelect('ApplePay')}
            >
              <FontAwesome name="apple" size={24} color="black" />
              <Text style={styles.paymentText}>ApplePay</Text>
            </TouchableOpacity>

            {/* VISA/MasterCard Option */}
            <TouchableOpacity 
              style={styles.paymentOption} 
              onPress={() => handlePaymentMethodSelect('VISA/MasterCard')}
            >
              <MaterialIcons name="credit-card" size={24} color="black" />
              <Text style={styles.paymentText}>VISA/MasterCard</Text>
            </TouchableOpacity>

            {/* Cash Option */}
            <TouchableOpacity 
              style={styles.paymentOption} 
              onPress={() => handlePaymentMethodSelect('Cash')}
            >
              <FontAwesome name="money" size={24} color="green" />
              <Text style={styles.paymentText}>Cash</Text>
            </TouchableOpacity>

            {/* Ngân hàng Option */}
            <TouchableOpacity 
              style={styles.paymentOption} 
              onPress={() => handlePaymentMethodSelect('Ngân hàng')}
            >
              <MaterialCommunityIcons name="bank" size={24} color="blue" />
              <Text style={styles.paymentText}>Ngân hàng</Text>
            </TouchableOpacity>

            {/* Ví điện tử Option */}
            <TouchableOpacity 
              style={styles.paymentOption} 
              onPress={() => handlePaymentMethodSelect('Ví điện tử')}
            >
              <MaterialCommunityIcons name="wallet" size={24} color="orange" />
              <Text style={styles.paymentText}>Ví điện tử</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CB8A58',
  },
  tableCell: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    fontSize: 20,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  location: {
    marginTop: 20,
    flexDirection: 'row',
  },
  paymentMethod: {
    marginTop: 20,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  createOrderButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 0, // No rounding on the button
    alignItems: 'center',
  },
  createOrderText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    marginLeft: 10,
    color: 'brown',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  paymentText: {
    marginLeft: 20,
    fontSize: 18,
  },
});

export default Payment;
