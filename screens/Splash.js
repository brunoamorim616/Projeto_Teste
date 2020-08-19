import * as React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ScreenContainer } from 'react-native-screens';
import * as SplashScreen from 'expo-splash-screen';

export function Splash() {

    return (
        <ScreenContainer style={styles.Container}>
            <Text> Splash </Text>
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