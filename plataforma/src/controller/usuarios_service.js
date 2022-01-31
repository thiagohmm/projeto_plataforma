import axios from 'axios';
import React, { Component } from 'react';

class usuario_service {
  salvar = (usuario) => {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios
      .post('/usuarios/create', JSON.stringify(usuario))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  lusuarios = async () => {
    let dados = [];
    await axios
      .get(`/usuarios`)
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
    await axios.delete(`/usuarios/delete/${id}`).catch((err) => {
      console.log(err);
    });
    return this.lusuarios();
  };


  buscaUsuarios = async (id) => {
    let dados = null;
    await axios
      .get(`/usuarios/${id}`)
      .then((res) => {
        dados = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  
    return dados;
  };

  updateProjeto = (usuarios) => {
    axios.put(`/usuarios/update/${usuarios.id}`, usuarios)
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





export default usuario_service;
