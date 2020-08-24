import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { LoginScreen } from './screens/LoginScreen';
import { AuthContext } from './context';
import { HomeScreen } from './screens/HomeScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { OptionsScreen } from './screens/OptionsScreen';
import { MessagesScreen } from './screens/MessagesScreen';


/**Rotas */
const RootStack = createStackNavigator();

const RootStackScreen = ({ userToken }) => (

  <RootStack.Navigator headerMode="none" >

    {userToken ? (
      <RootStack.Screen
        component={Tabs}
        name="App"
        options={{
          animationEnabled: true,
        }}
      />
    ) : (
        <RootStack.Screen
          component={LoginScreen}
          name="Login"
          options={{
            animationEnabled: true,
          }}
        />
      )}

  </RootStack.Navigator>

);

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator tabBarOptions={{
    activeTintColor: 'white',
    inactiveTintColor: 'darkgrey',
    style: {
      backgroundColor: 'dimgrey',
    }
    }}>
    <Tab.Screen name="Principal" component={HomeScreen} 
    options={{
          animationEnabled: true,
          tabBarLabel: 'Principal',
       tabBarIcon: ({ color, size }) => (
         <Ionicons name="md-menu" color={color} size={size} />
       ),
        }}/>
    <Tab.Screen name="Mensagens" component={MessagesScreen}  
    options={{
          animationEnabled: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-people" color={color} size={size} />
          ),
        }}/>
    <Tab.Screen name="Perfil" component={ProfileScreen}  
    options={{
          animationEnabled: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-person" color={color} size={size} />
          ),
        }}/>
    <Tab.Screen name="Opções" component={OptionsScreen}  
    options={{
          animationEnabled: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-options" color={color} size={size} />
          ),
        }}/>
  </Tab.Navigator>
  );

export default () => {

  let [userToken, setUserToken] = React.useState(null);

  /**Carrega o token amazenado no local storage. */
  async function loadData() {
    try {

      let userToken = await AsyncStorage.getItem('token');

      setUserToken(userToken);
      //console.log(userToken);

    } catch (e) {

      alert(e)

    }

  }

  /**Remove o token do local storage. */
  async function signOutToken() {
    try {

      await AsyncStorage.removeItem('token');
      setUserToken(null);

    } catch (e) {

      alert(e);

    }
  }
  

  /**Este hook é acionado toda vez que o programa é iniciado
   * e seta a variável userToken à partir do valor/existência
   * do token no local storage.
   */
  React.useEffect(() => {
    loadData();
  }, []);

  const authContext = React.useMemo(() => {

    return {

      /**Realiza o login do usuario */
      signIn: () => {

        loadData();

      },

      /**Realiza o logout do usuario */
      signOut: () => {

        signOutToken();

      }
    }
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}


