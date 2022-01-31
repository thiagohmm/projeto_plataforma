import React from 'react';
import ProjetoService from '../../controller/projeto_service';
import { withRouter } from 'react-router-dom';

class home extends React.Component {
  constructor(props) {
    super(props);
    this.service = new ProjetoService();
  }
  state = {
    projetos: [],
  };

  async componentDidMount() {
    const projetos = await this.service.lprojetos();
    console.log(projetos);
    this.setState({ projetos: projetos });
  }

  listaPlataformaporProjeto = (id) => {
    this.props.history.push(`/listaPlataforma/${id}`);
  };
  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-3">Plataforma Unificada</h1>
        <p className="lead"></p>
        <hr className="my-4" />
        <div className="row">
          {this.state.projetos.map((projetos) => {
            return (
              <div
                style={{
                  height: 85,
                  margin: 5,
                  float: 'left',
                  backgroundColor: '#E8E8E8',
                  border: '1px solid #000000',
                }}
                className="card col-md-2"
              >
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{
                      alignContent: 'left',
                      font: 'small-caps bold 20px Georgia, serif',
                    }}
                  >
                    {projetos.nome_projeto}
                    <p className="card-text">
                      <span
                        style={{
                          float: 'right',
                        }}
                        className="badge badge-light"
                        onClick={() =>
                          this.listaPlataformaporProjeto(projetos.id_projeto)
                        }
                      >
                        Ir
                      </span>
                    </p>
                  </h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(home);
