import * as React from 'react';
import * as firebase from 'firebase';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'

import { SignIn } from './screens/SignIn';
import { SignUp } from './screens/SignUp';
import { Home } from './screens/Home';

export function App() {

  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  </NavigationContainer>
}

