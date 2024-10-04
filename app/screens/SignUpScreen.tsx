import { StyleSheet, Text, TextInput, Button, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import React, { useState } from 'react';

const SignUp = ({navigation}: {navigation: any}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ImageBackground source={require('../../assets/images/Background.png')} style={styles.background}>
    <View style={styles.container}>
      <Text style={{fontSize: 40, fontWeight: 'bold'}} >Wecome back!</Text>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 20, opacity: 0.5 , marginRight: 80}}>LognUp to your account</Text>
      <Text style={styles.title}>Logn Up</Text>
      <Text style={{ marginRight: 190, fontSize: 15 }}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={{ marginRight: 220, fontSize: 15 }}>Email</Text>
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
      
      <TouchableOpacity style={styles.button} onPress={() => {
        // Add your sign-up logic here
        navigation.replace('SignIn');
      }}>
        <Text style={styles.buttonText}>Logn Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace('Forgot')}>
        <Text style={styles.linkText}>Forgot password</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
}

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
  link: {
    marginTop: 20,
  },
  linkText: {
    color: '#CB8A58',
    marginTop: 20,
  },
});
