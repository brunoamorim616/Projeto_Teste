import * as React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import icon from '../assets/icon.png';

export const OptionsScreen = () => {

  return (
    <ScreenContainer style={styles.Container}>

      <View style={styles.View}>
        <Image source={icon} style={styles.IconLogo}/>
        <Text style={styles.HomeText}>
          Tela de Opções
        </Text>
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
    HomeText: {
      color: 'white',
      marginTop: 10,
      marginBottom: 10,
      textAlign: "center",
      fontSize: 17
    },
    View: {
      marginTop: 100,
      marginBottom: 255,
      textAlign: "center",
    },
    IconLogo: {
      width: 200,
      height: 200,
      marginBottom: 10,
    },
  })