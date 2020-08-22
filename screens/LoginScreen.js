import * as React from 'react';
import { Image, Text, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import { login } from '../apiServices/loginService';

import { AuthContext } from '../context';
import icon from '../assets/icon.png';


export const LoginScreen = () => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { signIn } = React.useContext(AuthContext); 

  async function entrar (){
    if (email == '' || password == '') {
      alert("Preencha TODOS os campos!");
    }else {
    await login(email, password);
    await signIn();
    }
  }

   

  return (
    <ScreenContainer style={styles.Container}>
      

      <Image source={icon} style={styles.IconLogo}/>
      <View style={styles.Form}>
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
      </View>
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
    color: 'white',
  },
  FormButton: {
    width: 300,
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
    borderColor: '#57cd7b',
    borderWidth: 2,
  },
  FormButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
    
  },
  IconLogo: {
    width: 100,
    height: 100,
    marginBottom: 45,
  },
  Form: {
    height: 325,
  } 
})