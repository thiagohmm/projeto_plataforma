import React , { useState,  useEffect } from 'react';
import UserService from '../../controller/usuarios_service'
import { withRouter } from 'react-router-dom';

function GerenciaUsuarios(props) {
  const [Usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  let [id, setId] = useState();
  let [nome, setNome] = useState();
  const service = new UserService();

  useEffect (  () => {
    async function load(){
    const usuarios_load = await service.lusuarios();
    setUsuarios(usuarios_load)
   
    }
    load();
   
  },[])

  function excluir(obj){
    setShowModal(true)
    setId(obj.id_user)
    setNome(obj.user_user)
    

  }

 
  async function handleExcluir(id){
    setShowModal(false)
    const usuarios_load = await service.excluir(id);
    setUsuarios(usuarios_load)
  }
  



  return (
    <div>
      <h2>Gerenciamento de Usuários</h2>
      <br/>
      {showModal == true ?(
     <div className="modal-dialog" role="document">
     <div className="modal-content">
       <div className="modal-header">
         <h5 className="modal-title">Exclusão de Usuarios</h5>
         <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
           <span aria-hidden="false">&times;</span>
         </button>
       </div>
       <div className="modal-body">
   <p>Deseja mesmo excluir o projeto {nome} de id {id} ? Essa ação excluirá todas as plataformas e nodesVinculadas a ele e não tem volta</p>
       </div>
       <div className="modal-footer">
         <button type="button" className="btn btn-primary" onClick={() => handleExcluir(id)}>Excluir</button>
         <button type="button" className="btn btn-secondary" data-dismiss="modal"onClick={() => setShowModal(false)} >Close</button>
       </div>
     </div>
   </div>):("")
}
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Nome Usuário</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          {Usuarios.map((v) => { return (
          <tr key={v.id_user}>
            <th scope="row">{v.user_user}</th>
            { v.user_user === "Admin" ?("")
            :(
            <td>
            <button type="button" className="btn btn-danger" onClick={() => excluir(v)}>Deletar</button></td>
            )
            }
          </tr>
           ) })}
        </tbody>
      </table>
    </div>
  );
}
export default  withRouter(GerenciaUsuarios);
