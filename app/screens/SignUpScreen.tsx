import { StyleSheet, Text, TextInput, View, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';  // Import axios

const SignUp = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');  // Thêm firstname
  const [lastname, setLastname] = useState('');  // Thêm lastname
  const [city, setCity] = useState('');  // Thêm city
  const [street, setStreet] = useState('');  // Thêm street
  const [zipcode, setZipcode] = useState('');  // Thêm zipcode
  const [phone, setPhone] = useState('');  // Thêm phone
  const [loading, setLoading] = useState(false);  // Trạng thái loading

  // Hàm xử lý đăng ký
  const handleSignUp = async () => {
    if (username === '' || email === '' || password === '' || firstname === '' || lastname === '' || city === '' || street === '' || zipcode === '' || phone === '') {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    setLoading(true);  // Bắt đầu loading

    try {
      const response = await axios.post('https://fakestoreapi.com/users', {  // Gọi Fake Store API
        email: email,
        username: username,
        password: password,
        name: {
          firstname: firstname,
          lastname: lastname,
        },
        address: {
          city: city,
          street: street,
          number: 3,
          zipcode: zipcode,
          geolocation: {
            lat: '-37.3159',
            long: '81.1496',
          },
        },
        phone: phone,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Sign Up successful');
        navigation.replace('SignIn');  // Điều hướng đến màn hình SignIn nếu thành công
      } else {
        Alert.alert('Sign Up failed', 'Please try again');
      }
    } catch (error) {
      console.error('Error during Sign Up:', error);
      Alert.alert('Error', 'Something went wrong, please try again');
    } finally {
      setLoading(false);  // Kết thúc loading
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/Background.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={{ fontSize: 40, fontWeight: 'bold' }}>Welcome!</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 20, opacity: 0.5, marginRight: 80 }}>Sign Up to your account</Text>
        <Text style={styles.title}>Sign Up</Text>

        <Text style={{ marginRight: 190, fontSize: 15 }}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstname}
          onChangeText={setFirstname}
        />

        <Text style={{ marginRight: 190, fontSize: 15 }}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastname}
          onChangeText={setLastname}
        />

        <Text style={{ marginRight: 190, fontSize: 15 }}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={{ marginRight: 190, fontSize: 15 }}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={{ marginRight: 190, fontSize: 15 }}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={{ marginRight: 190, fontSize: 15 }}>City</Text>
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />

        <Text style={{ marginRight: 190, fontSize: 15 }}>Street</Text>
        <TextInput
          style={styles.input}
          placeholder="Street"
          value={street}
          onChangeText={setStreet}
        />

        <Text style={{ marginRight: 190, fontSize: 15 }}>Zipcode</Text>
        <TextInput
          style={styles.input}
          placeholder="Zipcode"
          value={zipcode}
          onChangeText={setZipcode}
        />

        <Text style={{ marginRight: 190, fontSize: 15 }}>Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSignUp}  // Gọi hàm handleSignUp khi nhấn nút
          disabled={loading}  // Vô hiệu hóa nút khi đang loading
        >
          <Text style={styles.buttonText}>{loading ? 'Signing Up...' : 'Sign Up'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.replace('SignIn')}>
          <Text style={styles.linkText}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#CB8A58',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#CB8A58',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#CB8A58',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#CB8A58',
    marginTop: 20,
  },
});
