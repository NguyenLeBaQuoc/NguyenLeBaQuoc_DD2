import { StyleSheet, Text, TextInput, View, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import React, { useState } from 'react';

const SignInScreen = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState('johnd');
  const [password, setPassword] = useState('m38rmF$');  // Đổi từ phoneNumber thành password
  const [loading, setLoading] = useState(false);  // Thêm trạng thái loading

  // Hàm xử lý đăng nhập
  const handleLogin = async () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    setLoading(true);  // Bắt đầu loading

    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Login successful');
        console.log(jsonResponse);  // Log the response
        navigation.replace('Home');  // Điều hướng đến màn hình Home nếu đăng nhập thành công
      } else {
        Alert.alert('Login failed', 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error during Login:', error);
      Alert.alert('Error', 'Something went wrong, please try again');
    } finally {
      setLoading(false);  // Kết thúc loading
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/Background.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={{ fontSize: 40, fontWeight: 'bold' }}>Welcome back!</Text>
        <Text style={styles.title}>Login to your account</Text>
        <Text style={{ marginRight: 190, fontSize: 15 }}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={{ marginRight: 170, fontSize: 15 }}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry  // Để ẩn mật khẩu
        />
        
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Logging In...' : 'LogIn'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link}>
          <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
            <Text style={[styles.linkText, styles.textWithMargin]}>Don't have an account? Log Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.replace('Forgot')}>
            <Text style={styles.linkText}>Forgot password</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SignInScreen;

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
    fontSize: 20,
    opacity: 0.5,
    marginBottom: 50,
    marginRight: 50,
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
  link: {
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    color: '#CB8A58',
    marginBottom: 10,
    textAlign: 'center',
  },
  textWithMargin: {
    marginRight: 5,
  },
});
