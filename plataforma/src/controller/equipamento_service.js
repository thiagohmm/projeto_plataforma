import axios from 'axios';
import React, { Component } from 'react';

class equipamento_service {
  
  salvar = (equip) => {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios
      .post('/equip/create', JSON.stringify(equip))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  lequip = async () => {
    let dados = [];
    await axios
      .get(`/equip`)
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

  listaequipById = async (id) => {
    let dados = [];
    await axios
      .get(`/equip/${id}`)
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



  listaequipPlataforma = async (id) => {
    let dados = [];
    await axios
      .get(`/equip/plataforma/${id}`)
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



  excluir = async (id,idplataforma) => {
    console.log('id para ser deletado', id);
    await axios.delete(`/equip/delete/${id}`).catch((err) => {
      console.log(err);
    });
    return this.listaequipPlataforma(idplataforma) ;
  };


  updateEquipamentos = (equipamentos) => {
    axios.put(`/equip/update/${equipamentos.id}`, equipamentos)
      .then((res) => {
       
       
      })
      .catch((err) => {
        console.log(err);
      });
}

}

export default equipamento_service;
