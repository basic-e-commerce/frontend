import "./ManuelOption.scss";
import PropTypes from "prop-types";

const ManuelOption = ({ setActiveStep }) => {
  return (
    <div className="manuelOptionContainer">
      <button onClick={() => setActiveStep(1)}>Anlaşmalı Kargo</button>
      <button onClick={() => setActiveStep(2)}>Manuel Kargo</button>
      <button onClick={() => setActiveStep(3)}>Direkt Kargo</button>
    </div>
  );
};

ManuelOption.propTypes = {
  setActiveStep: PropTypes.func.isRequired,
};

export default ManuelOption;
