import React from "react";
import "./ModalWindow.scss";
const ModalWindow = ({ setToggleModal, modalText }) => {
  return (
    <div className='modal'>
      <div className='modal__window'>
        <h3 className='modal__prompt'>{modalText}</h3>
        <button
          onClick={() => setToggleModal(false)}
          className='modal__button'
        ></button>
      </div>
    </div>
  );
};

export default ModalWindow;
