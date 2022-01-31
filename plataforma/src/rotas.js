import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './views/Cadastro/home';
import Projeto from './views/Cadastro/projeto_cadastro';
import Plataforma from './views/Cadastro/plataforma_cadastro';
import Equipamento from './views/Cadastro/equipamento_cadastro';
import Nodes from './views/Cadastro/node_cadastro';
import Usuarios from './views/Cadastro/usuarios_cadastro'
import ListaPlataforma from './views/Lista/plataforma_lista';
import listaNode from './views/Lista/nodes_lista';
import gerenciaProjeto from './views/Gerenciamento/gerencia_projeto';
import gerenciaPlataforma from './views/Gerenciamento/gerencia_plataforma'
import gerenciaNodes from './views/Gerenciamento/gerencia_nodes'
import gerenciaEquip from './views/Gerenciamento/gerencia_equipamentos'
import GerenciaUsuarios from './views/Gerenciamento/gerencia_usuarios'
import PrivateRoute from './components/PrivateRoute'
import NotFound from './components/NotFound'

export default () => {
  return (
    <Switch>
      <PrivateRoute exact={true} path="/cadastro-projeto/:id?" component={Projeto} />
      <PrivateRoute exact={true} path="/cadastro-plataforma/:id?" component={Plataforma} />
      <PrivateRoute exact={true} path="/cadastro-equipamento/:id?" component={Equipamento} />
      <PrivateRoute exact={true} path="/cadastro-usuario/" component={Usuarios} />


      <PrivateRoute
        exact={true}
        path="/cadastro-equipamento"
        component={Equipamento}
      />
      <PrivateRoute exact={true} path="/cadastro-nodes/:id?" component={Nodes} />
      <Route exact path="/" component={Home} />
      
      <Route
        exact
        path="/listaPlataforma/:id_projeto"
        component={ListaPlataforma}
      />
      <Route exact path="/listaNodes/:id" component={listaNode} />
      <PrivateRoute exact path="/gerenciaProjeto/" component={gerenciaProjeto} />
      <PrivateRoute exact path="/gerenciaPlataforma/" component={gerenciaPlataforma} />
      <PrivateRoute exact path="/gerenciaNodes/" component={gerenciaNodes} />
      <PrivateRoute exact path="/gerenciaEquipamentos/" component={gerenciaEquip} />
      <PrivateRoute exact path="/gerenciaUsuarios/" component={GerenciaUsuarios} />
      <PrivateRoute component={NotFound}/>
    </Switch>
  );
};
