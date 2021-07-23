import "./ModalWindow.scss";
import { withRouter } from "react-router";
import { toggleModalOff } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const ModalWindow = ({ history }) => {
  const dispatch = useDispatch();
  const redirect = useSelector((state) => state.modal.redirect);
  const text = useSelector((state) => state.modal.text);

  const onClose = () => {
    dispatch(
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
