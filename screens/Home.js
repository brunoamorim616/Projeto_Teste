import * as React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ScreenContainer } from 'react-native-screens';

import { AuthContext } from '../context';

export const Home = () =>  {

    const { signOut } = React.useContext(AuthContext);


    return (
      <ScreenContainer style={styles.Container}>
  
        <TouchableOpacity style={styles.FormButton}
          title="Sair" onPress={() => signOut()}>
          <Text style={styles.FormButtonText} >
            Sair
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.FormButton}
          title="user" >
          <Text style={styles.FormButtonText} >
            user
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
        borderColor: '#57cd7b',
        borderWidth: 2,
    },
    FormButtonText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',

    }
})