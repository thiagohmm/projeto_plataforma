import React, { useState, useEffect }  from 'react';

const Modal = (props) => {
  
  const [showModal, setshowModal] = useState();
 
  
  useEffect(() => {
    setshowModal(props.showModal);
  }, [props]);


  return (
    <>
   {showModal == true ?(
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" style={{position: 'fixed', bottom: '0', left: '0%', right: '0%'}}>
     <div className="modal-content">
       <div className="modal-header">
         <h5 className="modal-title">Exclusão</h5>
         <button type="button" className="close" data-dismiss="modal"  onClick={() => props.updateStatus(false)} aria-label="Close">
           <span aria-hidden="false">&times;</span>
         </button>
       </div>
       <div className="modal-body">
   <p> Essa ação excluirá o {props.texto} selecionado.<br/> Essa ação não tem volta.</p>
       </div>
       <div className="modal-footer">
         <button type="button" className="btn btn-primary" onClick={() => props.handleExcluir(props.id,props.hostplatID)}>Excluir</button>
         <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => props.updateStatus(false)}>Close</button>
       </div>
     </div>
   </div>):("")}
   
   </>
  );
};

export default Modal;
