import axios from 'axios';


class autenticacao {
  
  autentica =  async (autenticacao) => {

    await axios.post('/autenticacao/login', autenticacao)
            .then(function (resp)  {
                const { data } = resp
                            
                if ( data.token) 
                    localStorage.setItem('app-token', data.token);
                 
                
            })
            
            
  
          };

 
          

}





export default autenticacao;
