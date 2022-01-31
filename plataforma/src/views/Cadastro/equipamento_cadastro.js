import React from 'react';
import PlataformaService from '../../controller/plataforma_service';
import EquipamentoService from '../../controller/equipamento_service';
import { withRouter } from "react-router-dom";
import Cancelar from '../../components/cancelar'

const estadoInicial = {
  id_equip: '',
  nome_equipamento: '',
  tipo_equipamento: '',
  local_equipamento: '',
  inf_equipamento: '',
  url_equipamento: '',
  equip_plat_id: '',
  plataformas: [],
  sucesso: false,
  isError: false,
};

class CadastroEquipamento extends React.Component {
  constructor() {
    super();
    this.plataformaService = new PlataformaService();
    this.equipamentoService = new EquipamentoService();
  }
  state = estadoInicial;

  onchange = (event) => {
    const valor = event.target.value;
    const nomeDoCampo = event.target.name;
    this.setState({ [nomeDoCampo]: valor });
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
   
    const plataformas = await this.plataformaService.lplataforma();
    console.log(plataformas);
    this.setState({ plataformas: plataformas });

    if (id){
      const equip = await this.equipamentoService.listaequipById(id);
     
      this.setState({nome_equipamento: equip.nome_equip})
      this.setState({tipo_equipamento: equip.tipo_equip})
      this.setState({local_equipamento: equip.local_equip})
      this.setState({inf_equipamento: equip.inf_equip})
      this.setState({equip_plat_id: equip.equip_plat_id})
      this.setState({id_equip: id});
      document.getElementById('tipoEquip').value = equip.tipo_equip
      document.getElementById('plataformaSelect').value = equip.equip_plat_id

     

      }
  }

  getselect = () => {
    let e = document.getElementById('plataformaSelect');
    let value = e.options[e.selectedIndex].value;
    return value;
  };

  onSubmit = (event) => {
    event.preventDefault();

    if(this.state.nome_equipamento === '' || this.state.local_equipamento ==="" || this.state.equip_plat_id === ''){
      this.setState({ isError: true });
    
    }else{
    

    const equip = {
      id: this.state.id_equip,
      nome: this.state.nome_equipamento,
      tipo: this.state.tipo_equipamento,
      local: this.state.local_equipamento,
      inf: this.state.inf_equipamento,
      equip_plat_id: this.getselect(),
     
    };
   
    if (this.state.id_equip === ''){
           this.equipamentoService.salvar(equip);
      }
      else{
        
          this.equipamentoService.updateEquipamentos(equip)
          this.props.history.push("/gerenciaEquipamentos");
      
      }
    this.limpaCampos();

    
    this.setState({ sucesso: true });
    }
  };

  limpaCampos = () => {
    this.setState(estadoInicial);
  };
  render() {
    return (
      <div className="card">
        <div className="card-header">Cadastro de Equipamentos</div>
        <div className="card-body">
          {this.state.sucesso ? (
            <div className="alert alert-dismissible alert-success">
              <button type="button" className="close" data-dismiss="alert">
                &times;
              </button>
              <strong>Equipamento gravado com Sucesso</strong>
            </div>
          ) : (
            <> </>
          )}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label style={{ color: this.state.isError ? '#f70d1a':'black' , }} >Nome Equipamento:*</label>
                <input
                  type="text"
                  name="nome_equipamento"
                  onChange={this.onchange}
                  value={this.state.nome_equipamento}
                  className="form-control"
                  style={{ background: this.state.isError ?  '#FFCCCB': 'white' , }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label for="exampleSelect1">Tipo Equipamento</label>
                <select
                  name="tipo_equipamento"
                  onChange={this.onchange}
                  className="form-control"
                  id="tipoEquip"
                >
                  <option value=""></option>
                  <option value="Servidor Discreto">Servidor Discreto</option>
                  <option value="Servidor Blade">Servidor Blade</option>
                  <option value="Workstation">Workstation</option>
                  <option value="Notebook">Notebook</option>
                  <option value="Switch">Switch</option>
                  <option value="Router">Router</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label style={{ color: this.state.isError ? '#f70d1a':'black' , }} >Local Equipamento:*</label>
                <input
                  type="text"
                  name="local_equipamento"
                  onChange={this.onchange}
                  value={this.state.local_equipamento}
                  className="form-control"
                  style={{ background: this.state.isError ?  '#FFCCCB': 'white' , }}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <div class="form-check">
                  <label for="exampleTextarea">Informação Equipamento</label>
                  <textarea
                    name="inf_equipamento"
                    value={this.state.inf_equipamento}
                    onChange={this.onchange}
                    className="form-control"
                    id="exampleTextarea"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label style={{ color: this.state.isError ? '#f70d1a':'black' , }}>Plataforma:*</label>
                <select
                  name="equip_plat_id"
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


            <div className="col-md-6">
              <div className="form-group">
                <div class="form-check">
                  <label for="exampleTextarea">Gerenciamento Externo (ILO ou IDRAC) </label>
                  <input
                    type='text'
                    name="url_equipamento"
                    value={this.state.url_equipmaento}
                    onChange={this.onchange}
                    className="form-control"
                    id="exampleTextarea"
                    placeholder='https://'
                  ></input>
                </div>
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

export default CadastroEquipamento;
