import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

const Profile = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(false);
    navigation.replace('SignIn');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/images/path_to_avatar.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Nguyen Le Ba Quoc</Text>
        <TouchableOpacity style={styles.editButton}>
          <MaterialCommunityIcons name="pencil-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.settingsContainer}>
        <Text style={styles.sectionTitle}>Thông tin</Text>
        <View style={styles.setting}>
          <MaterialCommunityIcons name="phone-in-talk-outline" size={20} color="#000" />
          <Text style={styles.settingText}>+84 935465731</Text>
          <TouchableOpacity style={styles.editButton}>
            <MaterialCommunityIcons name="pencil-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.setting}>
          <MaterialCommunityIcons name="map-marker-radius-outline" size={20} color="#000" />
          <Text style={styles.settingText}>Thủ Đức, TP.HCM</Text>
          <TouchableOpacity style={styles.editButton}>
            <MaterialCommunityIcons name="pencil-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.setting}>
          <MaterialCommunityIcons name="cart-outline" size={20} color="#000" />
          <Text style={styles.settingText}>My Cart</Text>
          <TouchableOpacity style={styles.editButton}>
            <MaterialCommunityIcons name="pencil-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.setting}>
  <MaterialCommunityIcons name="truck" size={20} color="#000" />
  <Text style={styles.settingText}>Theo dõi đơn hàng</Text>
  <TouchableOpacity style={styles.editButton}>
    <MaterialCommunityIcons name="pencil-outline" size={20} color="#000" />
  </TouchableOpacity>
</View>

      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={() => setModalVisible(true)}>
        <MaterialCommunityIcons name="arrow-right-box" size={20} color="#a52a2a" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Hộp thoại xác nhận đăng xuất */}
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Xác nhận đăng xuất</Text>
          <Text style={styles.modalMessage}>Bạn có chắc chắn muốn đăng xuất không?</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
              <Text style={styles.modalButtonText}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  settingsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  settingText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 10,
  },
  logoutText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#a52a2a',
  },
  // Styles for the modal
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
