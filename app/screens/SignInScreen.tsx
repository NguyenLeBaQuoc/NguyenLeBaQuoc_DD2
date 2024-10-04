import { StyleSheet, Text, TextInput, Button, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';

const SignInScreen = ({navigation}: {navigation: any}) => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <ImageBackground source={require('../../assets/images/Background.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={{fontSize: 40, fontWeight: 'bold'}} >Wecome back!</Text>
        <Text style={styles.title}>Login to your account</Text>
        <Text style={{ marginRight: 190, fontSize: 15 }}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={{ marginRight: 170, fontSize: 15 }}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        
        <TouchableOpacity style={styles.button} onPress={() => {
          navigation.replace('Home');
        }}>
            <Text style={styles.buttonText}>LogIn</Text>
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
}

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
    opacity: 0.5 ,
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
