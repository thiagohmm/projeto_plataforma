import axios from 'axios';
import React, { Component } from 'react';

class plataforma_service {
  
  salvar = (plataforma) => {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios
      .post(
        '/plataforma/create',
        JSON.stringify(plataforma)
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  lplataforma = async () => {
    let dados = [];
    await axios
      .get(`/plataforma`)
      .then((res) => {
        //console.log(res.data);
        dados = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return dados;
    console.log(dados);
  };

  listaplataformaProj = async (id) => {
    let dados = [];
    await axios
      .get(`/plataforma/projeto/${id}`)
      .then((res) => {
        //console.log(res.data);
        dados = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return dados;
    console.log(dados);
  };




  buscaplataforma = async (search) => {
    let dados = [];
    await axios
      .get(`/plataforma/api/busca?search=${search}`)
      .then((res) => {
        //console.log(res.data);
        dados = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return dados;
    console.log(dados);
  };



  listaplataformaProjAll = async (id) => {
    let dados = [];
    await axios
      .get(`/plataforma/projetoall/${id}`)
      .then((res) => {
        //console.log(res.data);
        dados = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return dados;
    console.log(dados);
  };

  getplataformaName = async (id) => {
    let dados = [];
    await axios
      .get(`/plataforma/${id}`)
      .then((res) => {
        console.log(res.data);
        dados = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return dados;
    console.log(dados);
  };



  excluir = async (id,idprojeto) => {
    console.log('id para ser deletado', id);
    await axios.delete(`/plataforma/delete/${id}`).catch((err) => {
      console.log(err);
    });
    return this.listaplataformaProjAll(idprojeto) ;
  };



  updatePlataforma = (plataforma) => {
    axios.put(`/plataforma/update/${plataforma.id}`, plataforma)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        // alert('Contato salvo com sucesso');
      })
      .catch((err) => {
        console.log(err);
      });
}



}

export default plataforma_service;
