import "./ExploreBtn.scss";

const ExploreBtn = ({ PlotObservations }) => {
  return (
    <button onClick={PlotObservations} className='explore'>
      EXPLORE!
    </button>
  );
};
export default ExploreBtn;
