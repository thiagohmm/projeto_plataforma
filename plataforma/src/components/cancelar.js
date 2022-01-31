import React from 'react';
import { useHistory } from "react-router-dom";


const Cancelar = (props)=> {
  let history = useHistory();
  return(

    <button className="btn btn-danger" onClick={() =>history.goBack()}>Cancelar</button>


  );

}

export default Cancelar;