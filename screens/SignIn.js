import * as React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ScreenContainer } from 'react-native-screens';

//{
//    "email": "usuario@teste.com",
//    "password": "usuario_test_@@"
//}
//sadasasdas
export function SignIn() {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  /**url da API */
  var url = "https://delivery.leaderaplicativos.com.br/api/api-token-auth/"


  /**captura o token providenciado pela API */
  async function apiLogin() {

    let user = {
      email: email,
      password: password
    }

    try {
      let response = await fetch
        (url, {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json());

      storageToken(response.token);

    } catch (e) {
      alert(e);
    }
    
  }
  /**captura o token providenciado pela API e salva no local storage */
  async function storageToken(token) {

    if (token != undefined)
      await AsyncStorage.setItem('token', JSON.stringify(token));

  }

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
        title="Entrar" onPress={(apiLogin)}>
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