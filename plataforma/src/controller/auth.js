import axios  from "axios";

export const TOKEN_KEY = "app-token";
export const isAuthenticated =  () =>  localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);


export const validateToken = async () => {

  if (await isAuthenticated()) {

  let dados = [];
  await axios
    .get(`/autenticacao`,  { headers: { 'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'x-access-token',
    'x-access-token': getToken() } } )
    .then((res) => {
     // console.log(res.data);
      dados = res.data;
     // console.log(dados.auth)

    })
    .catch((err) => {
      console.log(err);
      
    });
  return dados.auth;
  console.log(dados.auth);
  }
  else {
  return false
  }
};

