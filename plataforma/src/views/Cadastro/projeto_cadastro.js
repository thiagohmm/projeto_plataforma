import React from 'react';
import ProjetoService from '../../controller/projeto_service';
import { withRouter } from 'react-router-dom';
import Cancelar from '../../components/cancelar'

const estadoInicial = {
  id: '',
  nome: '',
  sucesso: false,
  atualizando: false,
  isError: false,
};

class CadastroProjeto extends React.Component {
  constructor(props) {
    super(props);
    this.service = new ProjetoService();
  }

  state = estadoInicial;

  onchange = (event) => {
    const valor = event.target.value;
    const nomeDoCampo = event.target.name;
    this.setState({ [nomeDoCampo]: valor });

  };

  onSubmit = (event) => {
    event.preventDefault();

if(this.state.nome === ''){
  this.setState({ isError: true });

}else{



    const projeto = {
      id: this.state.id,
      nome: this.state.nome,
    };
    
    
    if (projeto.id === '') {
      this.service.salvar(projeto);
    } else {
      this.service.updateProjeto(projeto);
    }

    console.log(this.state);
    this.limpaCampos();
    this.setState({ sucesso: true });
  }
  };

  limpaCampos = () => {
    this.setState(estadoInicial);

  
  };


  async componentDidMount() {
    const id = this.props.match.params.id;
    
    if (id){
    const projeto = await this.service.buscaProjeto(id);
    console.log(projeto)
    this.setState({nome: projeto.nome_projeto})
    this.setState({id: id });
    
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">Cadastro de Projetos</div>
        <div className="card-body">
          {this.state.sucesso ? (
            <div className="alert alert-dismissible alert-success">
              <button type="button" className="close" data-dismiss="alert">
                &times;
              </button>
              <strong>Projeto gravado com Sucesso</strong>
            </div>
          ) : (
            <> </>
          )}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label style={{ color: this.state.isError ? '#f70d1a':'black' , }} >Nome Projeto:*</label>
                <input
                  type="text"
                  name="nome"
                  onChange={this.onchange}
                  value={this.state.nome}
                  className="form-control"
                  style={{ background: this.state.isError ?  '#FFCCCB': 'white' , }}
                />
              </div>
            </div>
          </div>
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

export default  withRouter(CadastroProjeto);
