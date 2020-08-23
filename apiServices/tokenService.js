import AsyncStorage from '@react-native-community/async-storage';

/**url da API */
const apiUrl = "https://delivery.leaderaplicativos.com.br/";

/**captura o token providenciado pela API */
export async function loginHandler(email, password) {

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

    /**if (token != undefined || token != null)
      tokenInfo(token);*/

  } catch (e) {

    alert("E-mail ou Senha incorretos.");

  }

}

/**captura o token providenciado pela API e salva no local storage */
export async function storageToken(token) {

  await AsyncStorage.setItem('token', JSON.stringify(token));

}

/**export async function tokenInfo(token) {

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    var tokenContent = JSON.stringify(jsonPayload);
    console.log('content', tokenContent);

}*/
