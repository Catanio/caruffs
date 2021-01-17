import Modal from "@material-ui/core/Modal";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import UnnamedImg from "../../unnamed.png";
import "./styles.css";

const ViewRideModal = ({ open, marker, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="view-ride-modal">
        <button className="back-modal" onClick={handleClose}>
          <KeyboardReturnIcon />
        </button>

        <h3>Informações de Carona e Contato</h3>

        <div className="view-ride-info">
          <div
            className="view-ride-image"
            style={{ backgroundImage: `url(${UnnamedImg})` }}
          />

          <h4 className="view-ride-info-name">{marker.user?.name}</h4>

          <p className="view-ride-info-description">{marker.user?.bio}</p>

          <hr />

          <div className="view-ride-info-contact">
            <h4>Contatos</h4>

            <p>{marker.user?.email}</p>
            <p>{marker.user?.phone}</p>
          </div>
        </div>

        <div className="rider-profile">
          <hr />

          <div className="day-container">Segunda</div>

          <div className="button-container">
            <button
              style={{ backgroundColor: "#f37d1d" }}
              onClick={handleClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewRideModal;
