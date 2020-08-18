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

  /** guarda os dados do usuario no localstorage do aparelho*/
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('login', value)
    } catch (e) {
      // saving error
    }
  }

  let user = {
    email: email,
    password: password,
    token: '',
  }

  /**captura o token providenciado pela API */
  async function apiHandler() {
    let response = await fetch
      (url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());

    user = {
      token: response,
    }

    console.log(user);
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
        title="Entrar" onPress={(apiHandler)}>
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