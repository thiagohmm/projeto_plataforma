import React , { useState,  useEffect } from 'react';
import ProjetoService from '../../controller/projeto_service'
import { withRouter } from 'react-router-dom';
import Modal from '../../components/modal'

function GerenciaProjeto(props) {
  const [projeto, setProjeto] = useState([]);
  const [showModal, setShowModal] = useState(false);
  let [id, setId] = useState();
  let [nome, setNome] = useState();
  const service = new ProjetoService();

  useEffect (  () => {
    async function load(){
    const projetos = await service.lprojetos();
    setProjeto(projetos)
   
    }
    load();
   
  },[])

  function excluir(obj){
    setShowModal(true)
    setId(obj.id_projeto)
    setNome(obj.nome_projeto)
    console.log(id)

  }

  const preparaEditar  = (id) => {
    console.log('editar para editar:', id);
    
    props.history.push(`/cadastro-projeto/${id}`);
  };

  async function handleExcluir(id){
    setShowModal(false)
    const projetos = await service.excluir(id);
    setProjeto(projetos)
  }
  
  const updateStatus = (status) => {
    setShowModal(status)

  }


  return (
    <div>
      <h2>Gerenciamento de Projetos</h2>
      <br/>
      {showModal == true ?( 
      <Modal showModal={showModal}
      updateStatus={updateStatus}
      id={id}
      handleExcluir={handleExcluir}
      texto="projeto"   /> 
                 
          
     ):("")}
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Nome Plataforma</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          {projeto.map((v) => { return (
          <tr key={v.id_projeto}>
            <th scope="row">{v.nome_projeto}</th>
            <td><button type="button" className="btn btn-info" onClick={() => preparaEditar(v.id_projeto)}>Atualizar</button>
            <button type="button" className="btn btn-danger" onClick={() => excluir(v)}>Deletar</button></td>
          </tr>
           ) })}
        </tbody>
      </table>
    </div>
  );
}
export default  withRouter( GerenciaProjeto);
