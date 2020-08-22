import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { AuthContext } from './context';

/**Rotas */
const RootStack = createStackNavigator();

const RootStackScreen = ({ userToken }) => (

  <RootStack.Navigator headerMode="screen" >

    {userToken != null ? (
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          animationEnabled: true,
          headerStyle: {
            backgroundColor: '#57cd7b',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
    ) : (
        <RootStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            animationEnabled: true,
            headerStyle: {
              backgroundColor: 'black',
            }
          }}
        />
      )}

  </RootStack.Navigator>

);

export default () => {

  var [userToken, setUserToken] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  /**Carrega o token amazenado no local storage. */
  async function loadData(){
    try {

      let userToken = await AsyncStorage.getItem('token');
      setUserToken(userToken);

      console.log(userToken);
      /**alert('Token Atualizou: ', userToken);*/
      
      } catch (e) {

      alert(e)

    }
    
  }
  
  /**Remove o token do local storage. */
  async function signOutToken() {
    try {

      await AsyncStorage.removeItem('token');
      setUserToken(null);

      console.log(userToken);

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
        setIsLoading(false);

      },

      /**Realiza o logout do usuario */
      signOut: () => {

        signOutToken();
        setIsLoading(false);

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


