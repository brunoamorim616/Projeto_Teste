import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { LoginScreen } from './screens/LoginScreen';
import { AuthContext } from './context';
import { HomeScreen } from './screens/HomeScreen';

/**Rotas */
const RootStack = createStackNavigator();

const RootStackScreen = ({ userToken }) => (

  <RootStack.Navigator headerMode="none" >

    {userToken ? (
      <RootStack.Screen
        component={HomeScreen}
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


