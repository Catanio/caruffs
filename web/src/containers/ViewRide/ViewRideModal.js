import Modal from "@material-ui/core/Modal";
import { useState } from "react";

import "./styles.css";

const ViewRideModal = ({ open, handleClose }) => {
  const [step, setStep] = useState(0);

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="fullscreen-modal">
        <button onClick={step ? handleBack : handleClose}>Fechar</button>

        <div className="step-one">
          <button onClick={handleClose}>Close</button>
          <button onClick={() => setStep(step + 1)}>Close</button>
        </div>

        <div className="step-two"></div>

        <div className="step-three"></div>
      </div>
    </Modal>
  );
};

export default ViewRideModal;
