import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Home } from './screens/Home';
import { SignIn } from './screens/SignIn';
import { AuthContext } from './context';

/**Rotas */
const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken != null ? (
      <RootStack.Screen
        name="Home"
        component={Home}
        options={{
          animationEnabled: false
        }}
      />
    ) : (
        <RootStack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            animationEnabled: false
          }}
        />
      )}
  </RootStack.Navigator>
);

export default () => {

  const [isLoading, setIsLoading] = React.useState(true);
  var [userToken, setUserToken] = React.useState(null);

  /**Este hook é acionado toda vez que o progrmaa é iniciado
   * e seta a variável userToken à partir do valor/existência
   * do token no local storage.
   */
  React.useEffect(() => {
    loadData();
  }, []);

  /**Carrega o token amazenado no local storage. */
  async function loadData(){
    try {

      let userToken = await AsyncStorage.getItem('token');
      await setUserToken(userToken);

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
      await setUserToken(null);

      console.log(userToken);
      /**alert('Token Atualizou: ', userToken);*/

    } catch (e) {

      alert(e);

    }

  }
  
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

