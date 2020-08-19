import * as React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ScreenContainer } from 'react-native-screens';

import { AuthContext } from '../context';

//{
//    "email": "usuario@teste.com",
//    "password": "usuario_test_@@"
//}

export const SignIn = () => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  /**url da API */
  const url = "https://delivery.leaderaplicativos.com.br/"

  /**captura o token providenciado pela API */
  async function login() {

    let user = {
      email: email,
      password: password
    }

    try {
      let response = await fetch
        (url + "api/api-token-auth/", {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json());

      await storageToken(response.token);
      
    } catch (e) {

      alert(e);

    }

  }

  /**captura o token providenciado pela API e salva no local storage */
  async function storageToken(token) {

        await AsyncStorage.setItem('token', JSON.stringify(token));

  }

  async function entrar (){
    await login();
    signIn();
  }

  const { signIn } = React.useContext(AuthContext);
  return (
    <ScreenContainer style={styles.Container}>

      <TextInput style={styles.FormInput}
        placeholder="E-mail"
        onChangeText={(email) => setEmail(email)}
      />

      <TextInput style={styles.FormInput}
        placeholder="Senha"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <TouchableOpacity style={styles.FormButton}
        title="Entrar" onPress={() => entrar()}>
        <Text style={styles.FormButtonText} >
          Entrar
        </Text>
      </TouchableOpacity>

    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  FormInput: {
    width: 295,
    backgroundColor: 'black',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: 'black',
    marginVertical: 12,
    borderColor: 'white',
    borderWidth: 1,
    color: 'white'
  },
  FormButton: {
    width: 300,
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
    borderColor: 'white',
    borderWidth: 1,
  },
  FormButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',

  }
})