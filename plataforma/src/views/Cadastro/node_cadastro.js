import React from 'react';
import NodeService from '../../controller/node_service';
import PlataformaService from '../../controller/plataforma_service';
import { withRouter } from "react-router-dom";
import Cancelar from "../../components/cancelar"

const estadoInicial = {
  id_node:'',
  nome_node: '',
  ssh_node: '',
  vnc_node: '',
  router_node: '',
  host_plat_id: '',
  plataformas: [],
  sucesso: false,
  isError:false,
};

class CadastroNode extends React.Component {
  constructor(props) {
    super(props);
    this.plataformaService = new PlataformaService();
    this.nodeService = new NodeService();
  }
  state = estadoInicial;

  onchange = (event) => {
    const valor = event.target.value;
    const nomeDoCampo = event.target.name;
    this.setState({ [nomeDoCampo]: valor });
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id)
    const plataformas = await this.plataformaService.lplataforma();
    console.log(plataformas);
    this.setState({ plataformas: plataformas });

    if (id){
      const nodes = await this.nodeService.getNodeById(id)
     
      console.log(nodes)
      this.setState({id_node: nodes.id_node})
      this.setState({nome_node: nodes.nome_node})
      this.setState({ssh_node: nodes.ssh_node})
      this.setState({vnc_node: nodes.vnc_node})
      this.setState({router_node: nodes.router_node})
      this.setState({host_plat_id: nodes.host_plat_id})
      document.getElementById('plataformaSelect').value = nodes.host_plat_id

    }
  }
  getselect = () => {
    let e = document.getElementById('plataformaSelect');
    let value = e.options[e.selectedIndex].value;
    return value;
  };

  setCheck = () => {
    var selecionaIndex = document.getElementById('plataformaSelect').options;
    this.setState({ host_plat_id: selecionaIndex });
  };

  onSubmit = (event) => {
    event.preventDefault();
    if(this.state.nome_node === '' || this.state.router_node ==='' || this.state.host_plat_id ===''){
      this.setState({ isError: true });
    
    }else{

    const nodes = {
      
      nome: this.state.nome_node,
      ssh: this.state.ssh_node,
      vnc: this.state.vnc_node,
      router: this.state.router_node,
      host_plat_id: this.getselect(),
    };
    console.log("mostra o status do id " + this.state.id_node)
    if (this.state.id_node == ''){
    this.nodeService.salvar(nodes);}
    else{
      this.nodeService.updateNodes(nodes, this.state.id_node)
      this.props.history.push("/GerenciaNodes");
    
    }

    
    this.limpaCampos()

  }
  };

  limpaCampos = () => {
    this.setState(estadoInicial);
    this.componentDidMount();
  };
  render() {
    return (
      <div className="card">
        <div className="card-header">Cadastro de Nodes</div>
        <div className="card-body">
          {this.state.sucesso ? (
            <div className="alert alert-dismissible alert-success">
              <button type="button" className="close" data-dismiss="alert">
                &times;
              </button>
              <strong>Node gravado com Sucesso</strong>
            </div>
          ) : (
            <> </>
          )}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label style={{ color: this.state.isError ? '#f70d1a':'black' , }}>Nome Nodes:*</label>
                <input
                  type="text"
                  name="nome_node"
                  onChange={this.onchange}
                  value={this.state.nome_node}
                  className="form-control"
                  style={{ background: this.state.isError ?  '#FFCCCB': 'white' , }}
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group">
                <label>Porta SSH:</label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  name="ssh_node"
                  onChange={this.onchange}
                  value={this.state.ssh_node}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group ">
                <label>Porta VNC:</label>
                <input
                  class="form-control form-control-sm"
                  type="number"
                  id="inputSmall"
                  min="1"
                  max="6"
                  name="vnc_node"
                  onChange={this.onchange}
                  value={this.state.vnc_node}
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <div className="form-group">
                <label style={{ color: this.state.isError ? '#f70d1a':'black' , }} >Ip:*</label>
                <input
                  type="text"
                  name="router_node"
                  onChange={this.onchange}
                  value={this.state.router_node}
                  className="form-control"
                  style={{ background: this.state.isError ?  '#FFCCCB': 'white' , }}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label style={{ color: this.state.isError ? '#f70d1a':'black' , }} >Plataforma:*</label>
                <select
                  name="host_plat_id"
                  onChange={this.onchange}
                  className="form-control"
                  id="plataformaSelect"
                  style={{ background: this.state.isError ?  '#FFCCCB': 'white' , }}
                >
                  <option value=""></option>
                  {this.state.plataformas.map((plataformas) => {
                    return (
                      <option value={plataformas.id}>
                        {plataformas.nome_plataforma}
                      </option>
                    );
                  })}
                </select>
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

export default CadastroNode;
