import React from 'react';
import PlataformaService from '../../controller/plataforma_service';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class listaPlataforma extends React.Component {
  constructor(props) {
    super(props);
    this.plataformaservice = new PlataformaService();
  }

  state = {
    plataforma: [],
  };

  async componentDidMount() {
    const idprojeto = this.props.match.params.id_projeto;
    const listplataformasProj = await this.plataformaservice.listaplataformaProj(
      idprojeto
    );
    this.setState({ plataforma: listplataformasProj });
  }

  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-6">Plataforma Unificada</h1>
        <p className="lead"></p>
        <hr className="my-3" />
        <div className="row">
          {this.state.plataforma.map((plataforma) => {
            return (
              <div className="col-md-4">
                <div className="form-group">
                  <div className="alert alert-dismissible alert-info">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                    ></button>
                    <p>
                      <strong> {plataforma.nome_plataforma}</strong>
                      <span
                        style={{
                          float: 'right',
                        }}
                        className="badge badge-dark"
                      >
                        <Link
                          to={{
                            pathname: `/listaNodes/${plataforma.id}`,
                          }}
                        >
                          Ir
                        </Link>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default withRouter(listaPlataforma);
