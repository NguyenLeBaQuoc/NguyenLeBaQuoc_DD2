import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const OrderStatusDetails = ({navigation}: {navigation: any}) => {
  const statusData = [
    { title: "Order Confirmed", date: "20-12-2022", time: "11.00 PM", icon: "package" },
    { title: "Order Processed", date: "20-12-2022", time: "10.00 PM", icon: "clock" },
    { title: "On Delivery", date: "20-12-2022", time: "12.00 PM", icon: "truck" },
    { title: "Order Completed", date: "20-12-2022", time: "------", icon: "check-circle" },
  ];

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <MaterialCommunityIcons name='chevron-left-circle' size={40} style={{ marginLeft: 20}} />
      </TouchableOpacity>
      <Text style={styles.header}>Order Status Details</Text>
      <View style={styles.timeline}>
        {statusData.map((item, index) => (
          <View key={index} style={styles.statusContainer}>
           <MaterialCommunityIcons name={item.icon as keyof typeof MaterialCommunityIcons.glyphMap} size={24} color="orange" />

            <View style={styles.statusDetails}>
              <Text style={styles.statusTitle}>{item.title}</Text>
              <Text style={styles.statusDate}>{item.date} {item.time}</Text>
            </View>
            {index < statusData.length - 1 && <View style={styles.line} />}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timeline: {
    marginTop: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusDetails: {
    flex: 1,
    marginLeft: 10,
    padding: 10,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusDate: {
    fontSize: 14,
    color: '#666',
  },
  line: {
    width: 2,
    height: 30,
    backgroundColor: '#ccc',
    marginLeft: 12,
  },
});

export default OrderStatusDetails;
