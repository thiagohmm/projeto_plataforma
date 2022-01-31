import React , { useState,  useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import Navbar from './components/navbar';
import Rotas from './rotas';
import {validateToken} from './controller/auth'


function App() {
  const [login, setLogin] = useState(false)

  const changeNAV = async () =>{
    if (await validateToken())

    setLogin(true);

    else

    setLogin(false);

  }

  useEffect(() => {
   changeNAV()
   //console.log(login)
  }, [login]);

  return (
    <>
      <HashRouter>
        <div className="container">
          <link
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
            rel="stylesheet"
            media="all"
          />


 
          
          <Navbar login={login}></Navbar>
          <Rotas />
        </div>
      </HashRouter>
    </>
  );
}

export default App;
