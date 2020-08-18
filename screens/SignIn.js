import * as React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ScreenContainer } from 'react-native-screens';

import * as Auth from '../keys/apiKey.json';
//{
//    "email": "usuario@teste.com",
//    "password": "usuario_test_@@"
//}

export function SignIn ({ navigation }) {

  const [state, setState] = React.useState({
    userEm: '',
    userPs: '',
  });


  return (
    <ScreenContainer style={styles.Container}>

      <TextInput style={styles.FormInput}
        placeholder="E-mail"
        value="userEm"
      />

      <TextInput style={styles.FormInput}
        placeholder="Senha"
        secureTextEntry={true}
        value="userPs"
      />

      <TouchableOpacity style={styles.FormButton}
        title="" onPress={() => setState(userEm,userPs)} >
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