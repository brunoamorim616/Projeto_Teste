import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Home } from './screens/Home';
import { SignIn } from './screens/SignIn';
import { AuthContext } from './context';

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

  React.useEffect(() => {
    loadData();
    console.log('Token Atualizou');
    alert(userToken);
  }, []);

  async function loadData(){
    try {

      let userToken = await AsyncStorage.getItem('token');
      alert(userToken);
      await setUserToken(userToken);
      

      } catch (e) {

      alert(e)

    }
    
  }
  
  /**Remove o token do local storage */
  async function signOutToken() {
    try {

      await AsyncStorage.removeItem('token');
      await setUserToken(null);
      alert(userToken);

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
        /*if (userToken != null) {
          console.log('Logou com o TOKEN: ', signInToken());
        } else {
          console.log('Nao Logou: ', signInToken());
        }
        */

      },
      /**Realiza o logout do usuario */
      signOut: () => {

        signOutToken();
        setIsLoading(false);
        /*console.log('Deslogou logo TOKEN: ', signOutToken());*/

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

