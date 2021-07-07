import "./ModalWindow.scss";
import { withRouter } from "react-router";

const ModalWindow = ({ setToggleModal, modalText, redirect, history }) => {
  const pageRedirect = () => {
    history.push(`${redirect}`);
  };
  return (
    <div className='modal'>
      <div className='modal__window'>
        <h3 className='modal__message'>{modalText}</h3>
        <button
          onClick={() => {
            setToggleModal(false);
            pageRedirect();
          }}
          className='modal__button'
        >
          Okay!
        </button>
      </div>
    </div>
  );
};

export default withRouter(ModalWindow);
