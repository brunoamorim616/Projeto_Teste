import AsyncStorage from '@react-native-community/async-storage';
 
 /**url da API */
  const apiUrl = "https://delivery.leaderaplicativos.com.br/";

  /**captura o token providenciado pela API */
  export async function login(email , password) {

    let user = {
      email: email,
      password: password
    }

    try {

      let response = await fetch
        (apiUrl + "api/api-token-auth/", {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json());

      await storageToken(response.token);
      
    } catch (e) {

      alert("E-mail ou Senha incorretos.");

    }

  }

  /**captura o token providenciado pela API e salva no local storage */
  export async function storageToken(token) {

        await AsyncStorage.setItem('token', JSON.stringify(token));

  }