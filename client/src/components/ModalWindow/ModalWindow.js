import "./ModalWindow.scss";
import { withRouter } from "react-router";
import store from "../../redux/store";
import { toggleModalOff } from "../../redux/actions";

const ModalWindow = ({ history }) => {
  const state = store.getState();
  const { redirect, text } = state.modal;

  const onClose = () => {
    store.dispatch(
      toggleModalOff({
        toggleModal: false,
        redirect: "",
        text: "",
      })
    );
    history.push(`${redirect}`);
  };

  return (
    <div className='modal'>
      <div className='modal__window'>
        <h3 className='modal__message'>{text}</h3>
        <button onClick={onClose} className='modal__button'>
          Okay!
        </button>
      </div>
    </div>
  );
};

export default withRouter(ModalWindow);
