import React from 'react';
import PlataformaService from '../../controller/plataforma_service';
import ProjetoService from '../../controller/projeto_service';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Cancelar from "../../components/cancelar"

const estadoInicial = {
  id: '',
  nome_plataforma: '',
  alias_plataforma: '',
  active_plataforma: '1',
  inf_plataforma: '',
  host_projt_id: '',
  sucesso: false,
  projetos: [],
  isError: false,
  
};

class CadastroPlataforma extends React.Component {
  constructor(props) {
    super(props);
    this.service = new PlataformaService();
    this.projetoservice = new ProjetoService();
  }
  state = estadoInicial;

  onchange = (event) => {
    const valor = event.target.value;
    const nomeDoCampo = event.target.name;
    this.setState({ [nomeDoCampo]: valor });
  };

  setCheckVariable = (event) => {
    console.log(event.target.checked);
    if (event.target.checked == true) {
      this.setState({ active_plataforma: '1' });
    } else {
      this.setState({ active_plataforma: '0' });
    }
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    const projetos = await this.projetoservice.lprojetos();
    console.log(projetos);
    this.setState({ projetos: projetos });

    if (id){
      const plat = await this.service.getplataformaName(id);
     
      this.setState({nome_plataforma: plat.nome_plataforma})
      this.setState({alias_plataforma: plat.alias_plataforma})
      this.setState({active_plataforma: plat.active_plataforma})
      this.setState({inf_plataforma:plat.inf_plataforma})
      this.setState({ host_projt_id: plat.host_projt_id})
      this.setState({id: id});
      document.getElementById('projectSelect').value = plat.host_projt_id
      this.verifySelect();
     

      }

  }

verifySelect = () => {
  if (this.state.active_plataforma === 1){
    document.getElementById('active').checked = true
  }else{
    document.getElementById('active').checked = false
  }
}

  getselect = () => {
    let e = document.getElementById('projectSelect');
    let value = e.options[e.selectedIndex].value;
    return value;
  };

  setCheckVariable = () => {
    if (document.getElementById('active').checked === true) {
      this.setState({ active_plataforma: '1' });
    } else {
      
      this.setState({ active_plataforma: '0' });
    }
  };

  onSubmit = (event) => {
    event.preventDefault();

    if(this.state.nome_plataforma === '' || this.state.alias_plataforma ==="" || this.state.host_projt_id === ''){
      this.setState({ isError: true });
    
    }else{


    const lastoption = this.state.host_projt_id;
    const plataforma = {
      id: this.state.id,
      nome_plataforma: this.state.nome_plataforma,
      alias: this.state.alias_plataforma,
      active_plataforma: this.state.active_plataforma,
      inf_plataforma: this.state.inf_plataforma,
      host_projt_id: this.getselect(),
    };
    if (this.state.id == ''){
    this.service.salvar(plataforma);
    }else{
      this.service.updatePlataforma(plataforma)
     
    }
    
    this.limpaCampos();
    this.setState({ sucesso: true });

   // this.componentDidMount();
    this.setCheckVariable();
  }
  };

  limpaCampos = () => {
    this.setState(estadoInicial);
  };
  render() {
    return (
      <div className="card">
        <div className="card-header">Cadastro de Plataforma</div>
        <div className="card-body">
          {this.state.sucesso ? (
            <div className="alert alert-dismissible alert-success">
              <button type="button" className="close" data-dismiss="alert">
                &times;
              </button>
              <strong>Plataforma gravado com Sucesso</strong>
            </div>
          ) : (
            <> </>
          )}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label  style={{ color: this.state.isError ? '#f70d1a':'black' , }} >Nome Plataforma:*</label>
                <input
                  type="text"
                  name="nome_plataforma"
                  onChange={this.onchange}
                  value={this.state.nome_plataforma}
                  className="form-control"
                  style={{ background: this.state.isError ?  '#FFCCCB': 'white' , }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label  style={{ color: this.state.isError ? '#f70d1a':'black' , }} >Alias Plataforma:*</label>
                <input
                  type="text"
                  name="alias_plataforma"
                  onChange={this.onchange}
                  value={this.state.alias_plataforma}
                  className="form-control"
                  style={{ background: this.state.isError ?  '#FFCCCB': 'white' , }}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label   style={{ color: this.state.isError ? '#f70d1a':'black' , }} for="exampleSelect1">Projeto:*</label>

                <select
                  name="host_projt_id"
                  onChange={this.onchange}
                  className="form-control"
                  id="projectSelect"
                  style={{ background: this.state.isError ?  '#FFCCCB': 'white' , }}
                >
                  <option value="N/A"></option>
                  {this.state.projetos.map((projetos) => {
                    return (
                      <option value={projetos.id_projeto}>
                        {projetos.nome_projeto}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                
                  <label>Plataforma ativa:</label>
                  <Input
                    id="active"
                    type="checkbox"
                    name="active_plataforma"
                    value={this.active_plataforma}
                    defaultChecked
                    onClick={this.setCheckVariable}
                  />
                
              </div>
            </div>
           </div>

            
           <div className="row">
            <div className="col-md-12">
           
              <label>Informações</label>
              <textarea class="form-control" 
              id="exampleTextarea" rows="3" 
              name="inf_plataforma"
              onChange={this.onchange}
              value={this.state.inf_plataforma}></textarea>
            </div>
            </div>
          
          <br></br>

           <div className="row">
            <div className="col-md-1">
              <button className="btn btn-success" onClick={this.onSubmit}>
                Salvar
              </button>
            </div>

            <div className="col-md-1">
              <button className="btn btn-warning" onClick={this.limpaCampos}>
                Limpar
              </button>
            </div>

            <div className="col-md-1">
              <Cancelar></Cancelar>
            </div>

          </div>

        </div>
      </div>
      
    );
  }
}

export default CadastroPlataforma;
