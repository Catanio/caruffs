import Modal from "@material-ui/core/Modal";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import UnnamedImg from "../../unnamed.png";
import "./styles.css";

const dayName = {
  mon: "Segunda",
  tue: "Terça",
  wed: "Quarta",
  thu: "Quinta",
  fri: "Sexta",
  sat: "Sábado",
  sun: "Domingo",
};

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

        <h3>Horários</h3>

        {marker.ride
          ? Object.keys(marker.ride.days).map((key) => (
              <div className="day-container">
                {dayName[key]} | Ida:{" "}
                {marker.ride.days[key].going
                  ? marker.ride.days[key].going
                  : "--:--"}{" "}
                | Volta:{" "}
                {marker.ride.days[key].backing
                  ? marker.ride.days[key].backing
                  : "--:--"}{" "}
              </div>
            ))
          : ""}
      </div>
    </Modal>
  );
};

export default ViewRideModal;
