import React from 'react';
import PlataformaService from '../../controller/plataforma_service';
import NodesService from '../../controller/node_service';
import EquipamentoService from '../../controller/equipamento_service';
import SearchBox from '../../components/searchbox';


import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from 'reactstrap';

import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

class listaNode extends React.Component {
  constructor(props) {
    super(props);
    this.plataformaservice = new PlataformaService();
    this.nodeservice = new NodesService();
    this.equipamentoservice = new EquipamentoService();

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      plataforma: [],
      nodes: [],
      equipamentos: [],
      searchfield: '',
      idparam: '',
    
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  conectToVnc = (event, ip, porta, nome) => {
    event.preventDefault();
    const alias = this.state.plataforma.alias_plataforma;
    const vnc = {
      nome: nome,
      porta: porta,
      prefix: alias,
      ip: ip,
     
    };
    this.nodeservice.vncConnect(vnc);
    // window.open(
    //   `http://localhost/novncp/vnc.html?host=localhost&port=6080&path=${nome}${porta}${alias}?show_dot=true`
    // );
    
    window.open(
      `http://${window.location.hostname}:8080/vnc/vnc.html?host=${window.location.hostname}&port=6080&path=${nome}${porta}${alias}?show_dot=true`
      
    );
  };

  conectToSSH = (event, ip, porta) => {
    event.preventDefault();
    //window.open(`http://localhost:2222/ssh/host/${ip}?port=${porta}`);
    window.open(`/ssh/host/${ip}?port=${porta}`);
  };

  async componentDidMount() {
   
    const id = this.props.match.params.id;
    this.setState({idparam: id})
    const getplataforma = await this.plataformaservice.getplataformaName(id);
    this.setState({ plataforma: getplataforma });

    const getnodes = await this.nodeservice.listanodesplataforma(id);
    this.setState({ nodes: getnodes });

    const equip = await this.equipamentoservice.listaequipPlataforma(id);
    this.setState({ equipamentos: equip });

   console.log(process.env.REACT_APP_IP_URL)
    
  }



  tentaRefresh = async () =>{
    const id = this.props.match.params.id;
    const getnodes = await this.nodeservice.listanodesplataforma(id);
    this.setState({ nodes: getnodes })
    const getplataforma = await this.plataformaservice.getplataformaName(id);
    this.setState({ plataforma: getplataforma });
    const equip = await this.equipamentoservice.listaequipPlataforma(id);
    this.setState({ equipamentos: equip });
    
  }

//   componentWillReceiveProps(props) {
//   //if (this.setState.idparam !== this.props.match.params.id) {
    
//     window.location.reload(false);
      
// }

componentDidUpdate(previousProps, previousState) {
  if (this.props.match.params.id !== previousProps.match.params.id) {

    console.log(this.props.match.params.id, "state", previousProps.match.params.id)
    this.tentaRefresh()
    
    ;
  }
}




  render() {
    const { nodes, searchfield } = this.state;
    const filteredNodes = nodes.filter((nodes) =>
      nodes.nome_node.toLowerCase().includes(searchfield.toLowerCase())
    );
    return (
      <div>
         <div className="alert alert-dismissible alert-warning">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <h4 className="alert-heading">Informações</h4>
        <p className="mb-0">{this.state.plataforma.inf_plataforma}</p>
        </div>
        
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => {
                this.toggle('1');
              }}
            >
              {this.state.plataforma.nome_plataforma}
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => {
                this.toggle('2');
              }}
            >
              Equipamentos
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            {this.state.activeTab == 1 ? (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Porta ssh</th>
                    <th scope="col">Porta vnc</th>
                    <th scope="col">IP</th>
                    <th scope="col">Conectar Usando</th>
                  </tr>
                </thead>
                <SearchBox
                  placeholder="Nome da posição"
                  handleChange={(event) =>
                    this.setState({ searchfield: event.target.value })
                  }
                />
                <tbody>
                  {filteredNodes.map((nodes) => {
                    return (
                      <tr>
                        <th scope="row">{nodes.nome_node}</th>
                        <td>{nodes.ssh_node}</td>
                        <td>{nodes.vnc_node}</td>
                        <td>{nodes.router_node}</td>
                        <td>
                          {nodes.vnc_node == '' ? (
                            <button type="button" className="btn btn-danger">
                              VNC
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={(event) =>
                                this.conectToVnc(
                                  event,
                                  nodes.router_node,
                                  nodes.vnc_node,
                                  nodes.nome_node
                                )
                              }
                            >
                              VNC
                            </button>
                          )}

                          {nodes.ssh_node == '' ? (
                            <button type="button" className="btn btn-danger">
                              SSH
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-info"
                              onClick={(event) =>
                                this.conectToSSH(
                                  event,
                                  nodes.router_node,
                                  nodes.ssh_node
                                )
                              }
                            >
                              SSH
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : null}
          </TabPane>
          <TabPane tabId="2">
            {this.state.activeTab == 2 ? (
              <div>
                {this.state.equipamentos.map((equipamentos) => {
                  return (
                    <Row>
                      <Col sm="6">
                        <Card body>
                          <CardTitle>
                            <h3>{equipamentos.nome_equip}</h3>
                          </CardTitle>
                          <CardText>
                            <h3>{equipamentos.inf_equip}</h3>
                          </CardText>
                          <span>
                            {' '}
                            <ul>
                              <li>
                                <h4>Tipo:</h4>
                                {equipamentos.tipo_equip}
                              </li>
                              <li>
                                <h4>Local:</h4>
                                {equipamentos.local_equip}
                              </li>
                            </ul>
                          </span>
                        </Card>
                      </Col>
                    </Row>
                  );
                })}
              </div>
            ) : null}
          </TabPane>
          
        </TabContent>
       

      </div>
    );
  }
}
export default withRouter(listaNode);
