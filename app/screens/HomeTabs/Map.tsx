import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Map = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Nút quay lại */}
      <TouchableOpacity onPress={() => navigation.navigate('Feed')} style={styles.backButtonContainer}>
        <MaterialCommunityIcons name='chevron-left-circle' size={40} color="black" />
      </TouchableOpacity>

      {/* Bản đồ hiển thị vị trí */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 10.830005053332693, // Tọa độ tại vị trí bạn đã cung cấp
          longitude: 106.77507959549333,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,  
        }}
      >
        <Marker
          coordinate={{ latitude: 10.830005053332693, longitude: 106.77507959549333 }}
          title="Vị trí bạn đã cung cấp"
          description="Địa chỉ: Cung cấp từ liên kết"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 50, // Điều chỉnh khoảng cách từ đầu màn hình
    left: 20, // Điều chỉnh khoảng cách từ cạnh trái màn hình
    zIndex: 100, // Đảm bảo nút hiển thị phía trên bản đồ
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Nền trắng mờ để làm rõ nút
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000', // Bóng cho nút (tùy chọn)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5, // Cho Android
  },
});

export default Map;
