import React , { useState,  useEffect } from 'react';
import ProjetoService from '../../controller/projeto_service'
import PlataformaService from '../../controller/plataforma_service'
import { withRouter } from 'react-router-dom';
import Modal from '../../components/modal';


function GerenciaPlataforma(props){

  const [projeto, setProjeto] = useState([]);
  const [plataforma, setPlataforma]  = useState([]);
  const [showModal, setShowModal] = useState(false);
  let [id, setId] = useState();
  let [nome, setNome] = useState();
  let [host_projt_id, sethost_projt_id] = useState()

  const Projetoservice = new ProjetoService();
  const Plataformaservice= new PlataformaService();




  useEffect (  () => {
    async function load(){
    const projetos = await Projetoservice.lprojetos();
    setProjeto(projetos)
   
    }
    load();
   
  },[])

 

  const carregaPlataforma =  async () => {
    let e = document.getElementById('projectSelect');
    let value = e.options[e.selectedIndex].value;
      const plataformas = await Plataformaservice.listaplataformaProjAll(value);
      setPlataforma(plataformas)
      console.log(plataforma)
  }
    
  async function handleExcluir(id,host_projt_id){
    setShowModal(false)
    const plataforma = await Plataformaservice.excluir(id,host_projt_id);
    setPlataforma(plataforma)
  }
  
  const preparaEditar  = (id) => {
    console.log('editar para editar:', id);
    
    props.history.push(`/cadastro-plataforma/${id}`);
  };

  function excluir(obj){
    console.log(obj)
    setShowModal(true)
    setId(obj.id)
    setNome(obj.nome_plataforma)
    sethost_projt_id(obj.host_projt_id)
    console.log(id)

  }

  const updateStatus = (status) => {
    setShowModal(status)

  }
 

  return (
    <div>
      <h2>Gerenciamento de Plataformas</h2>
      <br/>
      {showModal == true ?( 
      <Modal showModal={showModal}
      updateStatus={updateStatus}
      id={id}
      hostplatID={host_projt_id}
      handleExcluir={handleExcluir}
      texto="plataforma"   /> 
                 
          
     ):("")}
      <div className="form-group">
      <label htmlFor="exampleSelect1">Projeto</label>
      <select
      name="host_projt_id"
      onClick={() => carregaPlataforma()}
      className="form-control"
      id="projectSelect">
        <option value="N/A"></option>
      {projeto.map((v) => { return ( 
         <option value={v.id_projeto}>
         {v.nome_projeto}
       </option>
      )})}
      </select>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Nome Plataforma</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          {plataforma.map((v) => { return (
          <tr key={v.id }>
            <th scope="row">{v.nome_plataforma}</th>
            <td><button type="button" className="btn btn-info" onClick={() => preparaEditar(v.id)}>Atualizar</button>
            <button type="button" className="btn btn-danger" onClick={() => excluir(v)}>Deletar</button></td>
          </tr>
           ) })}
        </tbody>
      </table>
    </div>


    

     
   
  )

}

export default withRouter (GerenciaPlataforma);