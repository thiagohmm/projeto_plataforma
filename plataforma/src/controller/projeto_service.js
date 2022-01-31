import axios from 'axios';
import React, { Component } from 'react';

class projeto_service {
  salvar = (projeto) => {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios
      .post('/projetos/create', JSON.stringify(projeto))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  lprojetos = async () => {
    let dados = [];
    await axios
      .get(`/projetos`)
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


  excluir = async (id) => {
    console.log('id para ser deletado', id);
    await axios.delete(`/projetos/delete/${id}`).catch((err) => {
      console.log(err);
    });
    return this.lprojetos();
  };


  buscaProjeto = async (id) => {
    let dados = null;
    await axios
      .get(`/projetos/${id}`)
      .then((res) => {
        dados = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  
    return dados;
  };

  updateProjeto = (projeto) => {
    axios.put(`/projetos/update/${projeto.id}`, projeto)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        // alert('Contato salvo com sucesso');
      })
      .catch((err) => {
        console.log(err);
      });
  };



}





export default projeto_service;
