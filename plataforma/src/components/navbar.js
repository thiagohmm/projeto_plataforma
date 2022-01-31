import { wait } from '@testing-library/react';
import React , { useState,  useEffect } from 'react';
import { Link } from 'react-router-dom';
import Autentica_service from '../controller/authentication_service'
import {getToken, isAuthenticated, validateToken} from '../controller/auth'
import Busca from './busca';







function Navbar(props) {


  
  const [passwd, setPasswd] = useState('');
  const [user, setUser] = useState('');
  const [logado, setLogado] = useState(props.login)
  const service = new Autentica_service()
  const forceUpdate = React.useCallback(() => React.updateState({}), []);

  useEffect(() => {
    changeNAV1()
   
   }, [logado]);
 


  const logout =  () =>{
    localStorage.removeItem('app-token')
    setLogado(false)
  }

    const changeNAV1 = async () =>{
      if (await validateToken()){
      setLogado(true);
      }
      else{
        setLogado(false)
      }
    }

  //console.log(props.logado)
  //setLogado(props.logado)

  const onSubmit = async (event) => {
    event.preventDefault();
    
    

      const autenticacao = {
        usuario: user,
        passwd: passwd,
      };
     
      
      let status = await service.autentica(autenticacao)
      console.log(status)
      changeNAV1()
      //setLogado(props.login)
      //console.log(props.login)
      
    

  }

  
 

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      
    <img src={`${process.env.PUBLIC_URL}/../../logo_webplataforma.png`}  />
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    {logado ? (
    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link className="nav-link" to="/">Home
            <span className="sr-only">(current)</span>
          </Link>
        </li>


        {/* Esconde o menu de cadastro para quando logar não aparecer clickado gambiarra */}
        <li className="nav-item dropdown">
         
        </li>

        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" data-toggle="dropdown" to="#" role="button" aria-haspopup="true" aria-expanded="false">Cadastro</Link>
          <div className="dropdown-menu">
            <Link className="dropdown-item" to="/cadastro-projeto">Projeto</Link>
            <Link className="dropdown-item" to="/cadastro-plataforma">Plataforma</Link>
            <Link className="dropdown-item" to="/cadastro-nodes">Nodes</Link>
            <Link className="dropdown-item" to="/cadastro-equipamento">Equipamento</Link>
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" to="/cadastro-usuario">Usuários</Link>
            
          </div>
        </li>
       
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" data-toggle="dropdown" to="#" role="button" aria-haspopup="true" aria-expanded="false">Gerenciamento</Link>
          <div className="dropdown-menu">
            <Link className="dropdown-item" to="/gerenciaProjeto">Projeto</Link>
            <Link className="dropdown-item" to="/gerenciaPlataforma">Plataforma</Link>
            <Link className="dropdown-item" to="/gerenciaNodes">Nodes</Link>
            <Link className="dropdown-item" to="/gerenciaEquipamentos/">Equipamento</Link>
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" to="/gerenciaUsuarios">Usuários</Link>
          </div>
        </li>
       
        <li>
       <a className="nav-link" href="/" onClick={logout}>Logout</a>
       </li>

        </ul>
        </div>
        ):( 
        <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home
              <span className="sr-only">(current)</span>
            </Link>
          </li>


          <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Login</a>
        <div className="dropdown-menu">
          <form onSubmit={onSubmit}>
        <label style={{marginLeft: '5px'  }} >Usuario:</label>
        <input
              id="user"
              type="text"
              name="user"
              onChange={e => setUser(e.target.value)}
              className="form-control"
              style={{width: '150px', marginLeft: '5px', height: '30px'  }}
             />

        <label style={{marginLeft: '5px',  marginTop: '5px'  }}>Senha:</label>

          <input
              
              id="password"
              type="password"
              name="password"
              onChange={e => setPasswd(e.target.value)}
              className="form-control"
              style={{width: '150px', marginLeft: '5px', height: '30px'  }}
             
            />
         
        <button type="submit" className="btn btn-success" onClick={onSubmit} style={{float: 'right', padding: '4px', top: '5px',  marginTop: '8px', marginRight: '5px'}} >Login</button>
        </form>
        </div>
      </li>
          
          
          </ul>
          </div>
          )}
           
          
          <Busca forceUpdate={forceUpdate} />
          
         
    </nav>
    </div>

  );
}
export default Navbar;
