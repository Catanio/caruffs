import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import RoomIcon from "@material-ui/icons/Room";

import calendar from "./calendar.png";
import "./styles.css";

const position = [51.505, -0.09];

const CreateRideModal = ({ open, handleClose }) => {
  let mapCenter = position;
  const [step, setStep] = useState(0);
  const [days, setDays] = useState({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
    sun: true,
  });
  const [startHours, setStartHours] = useState({
    mon: "",
    tue: "",
    wed: "",
    thu: "",
    fri: "",
    sat: "",
    sun: "",
  });
  const [endHours, setEndHours] = useState({
    mon: "",
    tue: "",
    wed: "",
    thu: "",
    fri: "",
    sat: "",
    sun: "",
  });

  const cleanModal = () => {
    handleClose();
    setStep(0);
    setDays({
      mon: true,
      tue: true,
      wed: true,
      thu: true,
      fri: true,
      sat: true,
      sun: true,
    });
    setStartHours({
      mon: "",
      tue: "",
      wed: "",
      thu: "",
      fri: "",
      sat: "",
      sun: "",
    });
    setEndHours({
      mon: "",
      tue: "",
      wed: "",
      thu: "",
      fri: "",
      sat: "",
      sun: "",
    });
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const saveRide = () => {
    let rideObj = {
      location: mapCenter,
      weekInfo: Object.keys(days)
        .filter((day) => days[day])
        .map((day) => ({
          going: startHours[day],
          backing: endHours[day],
        })),
    };

    mapCenter = position;

    console.log(rideObj);

    axios
      .post(`http://localhost:3333/ride`, rideObj)
      .then((res) => {
        console.log(res);
        cleanModal();
      })
      .catch((err) => {
        console.timeLog(err);
      });
  };

  function MapEvents() {
    const map = useMapEvents({
      moveend: () => {
        mapCenter = map.getCenter();
      },
    });
    return null;
  }

  return (
    <Modal open={open} onClose={cleanModal}>
      <div className="create-ride-modal">
        {step > 0 ? (
          <button className="back-modal" onClick={handleBack}>
            <KeyboardReturnIcon />
          </button>
        ) : (
          ""
        )}

        <div className={`step-one ${step !== 0 ? "hidden" : ""}`}>
          <h3>
            Adicionar local
            <br />
            Ponto de Carona
          </h3>

          <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={true}
            zoomControl={false}
            className="maps-container"
            style={{ width: "100%", height: "100vh", zIndex: 1 }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapEvents />
          </MapContainer>

          <div className="pin-map">
            <FullscreenExitIcon
              fontSize="inherit"
              style={{ color: "#3e3e3e" }}
            />
            <RoomIcon fontSize="inherit" style={{ color: "#3e3e3e" }} />
          </div>

          <button className="close-map-icon" onClick={cleanModal}>
            <CancelIcon fontSize="inherit" style={{ color: "red" }} />
          </button>

          <button className="save-map-icon" onClick={() => setStep(step + 1)}>
            <CheckCircleIcon fontSize="inherit" style={{ color: "green" }} />
          </button>
        </div>

        <div className={`step-two ${step !== 1 ? "hidden" : ""}`}>
          <img src={calendar} alt="Calendário" />

          <h3>Configurar Dias da Carona</h3>

          <hr />

          <div className="day-container">
            <FormControlLabel
              control={
                <Switch
                  name="monday"
                  checked={days.mon}
                  onChange={() =>
                    setDays({
                      ...days,
                      mon: !days.mon,
                    })
                  }
                  color="primary"
                />
              }
              labelPlacement="start"
              label="Segunda"
            />
          </div>
          <div className="day-container">
            <FormControlLabel
              control={
                <Switch
                  name="tuesday"
                  checked={days.tue}
                  onChange={() =>
                    setDays({
                      ...days,
                      tue: !days.tue,
                    })
                  }
                  color="primary"
                />
              }
              labelPlacement="start"
              label="Terça"
            />
          </div>
          <div className="day-container">
            <FormControlLabel
              control={
                <Switch
                  name="wednesday"
                  checked={days.wed}
                  onChange={() =>
                    setDays({
                      ...days,
                      wed: !days.wed,
                    })
                  }
                  color="primary"
                />
              }
              labelPlacement="start"
              label="Quarta"
            />
          </div>
          <div className="day-container">
            <FormControlLabel
              control={
                <Switch
                  name="thursday"
                  checked={days.thu}
                  onChange={() =>
                    setDays({
                      ...days,
                      thu: !days.thu,
                    })
                  }
                  color="primary"
                />
              }
              labelPlacement="start"
              label="Quinta"
            />
          </div>
          <div className="day-container">
            <FormControlLabel
              control={
                <Switch
                  name="friday"
                  checked={days.fri}
                  onChange={() =>
                    setDays({
                      ...days,
                      fri: !days.fri,
                    })
                  }
                  color="primary"
                />
              }
              labelPlacement="start"
              label="Sexta"
            />
          </div>
          <div className="day-container">
            <FormControlLabel
              control={
                <Switch
                  name="saturday"
                  checked={days.sat}
                  onChange={() =>
                    setDays({
                      ...days,
                      sat: !days.sat,
                    })
                  }
                  color="primary"
                />
              }
              labelPlacement="start"
              label="Sábado"
            />
          </div>
          <div className="day-container">
            <FormControlLabel
              control={
                <Switch
                  name="sunday"
                  checked={days.sun}
                  onChange={() =>
                    setDays({
                      ...days,
                      sun: !days.sun,
                    })
                  }
                  color="primary"
                />
              }
              labelPlacement="start"
              label="Domingo"
            />
          </div>

          <button className="white-button" onClick={() => setStep(0)}>
            Editar Local
          </button>

          <div className="button-container">
            <button style={{ backgroundColor: "#f37d1d" }} onClick={cleanModal}>
              Cancelar
            </button>
            <button
              style={{ backgroundColor: "#5fdc2a" }}
              onClick={() => setStep(2)}
            >
              Configurar Horas
            </button>
          </div>
        </div>

        <div className={`step-three ${step !== 2 ? "hidden" : ""}`}>
          <img src={calendar} alt="Calendário" />

          <h3>Configurar Horários da Carona</h3>

          <hr />

          {days.mon ? (
            <div className="day-container">
              <span>Segunda</span>

              <TextField
                value={startHours.mon}
                onChange={(e) =>
                  setStartHours({ ...startHours, mon: e.target.value })
                }
                type="time"
                label="Ida"
              />

              <TextField
                value={endHours.mon}
                onChange={(e) =>
                  setEndHours({ ...endHours, mon: e.target.value })
                }
                type="time"
                label="Volta"
              />
            </div>
          ) : (
            ""
          )}

          {days.tue ? (
            <div className="day-container">
              <span>Terça</span>

              <TextField
                value={startHours.tue}
                onChange={(e) =>
                  setStartHours({ ...startHours, tue: e.target.value })
                }
                type="time"
                label="Ida"
              />

              <TextField
                value={endHours.tue}
                onChange={(e) =>
                  setEndHours({ ...endHours, tue: e.target.value })
                }
                type="time"
                label="Volta"
              />
            </div>
          ) : (
            ""
          )}

          {days.wed ? (
            <div className="day-container">
              <span>Quarta</span>

              <TextField
                value={startHours.wed}
                onChange={(e) =>
                  setStartHours({ ...startHours, wed: e.target.value })
                }
                type="time"
                label="Ida"
              />

              <TextField
                value={endHours.wed}
                onChange={(e) =>
                  setEndHours({ ...endHours, wed: e.target.value })
                }
                type="time"
                label="Volta"
              />
            </div>
          ) : (
            ""
          )}
          {days.thu ? (
            <div className="day-container">
              <span>Quinta</span>

              <TextField
                value={startHours.thu}
                onChange={(e) =>
                  setStartHours({ ...startHours, thu: e.target.value })
                }
                type="time"
                label="Ida"
              />

              <TextField
                value={endHours.thu}
                onChange={(e) =>
                  setEndHours({ ...endHours, thu: e.target.value })
                }
                type="time"
                label="Volta"
              />
            </div>
          ) : (
            ""
          )}
          {days.fri ? (
            <div className="day-container">
              <span>Sexta</span>

              <TextField
                value={startHours.fri}
                onChange={(e) =>
                  setStartHours({ ...startHours, fri: e.target.value })
                }
                type="time"
                label="Ida"
              />

              <TextField
                value={endHours.fri}
                onChange={(e) =>
                  setEndHours({ ...endHours, fri: e.target.value })
                }
                type="time"
                label="Volta"
              />
            </div>
          ) : (
            ""
          )}

          {days.sat ? (
            <div className="day-container">
              <span>Sábado</span>

              <TextField
                value={startHours.sat}
                onChange={(e) =>
                  setStartHours({ ...startHours, sat: e.target.value })
                }
                type="time"
                label="Ida"
              />

              <TextField
                value={endHours.sat}
                onChange={(e) =>
                  setEndHours({ ...endHours, sat: e.target.value })
                }
                type="time"
                label="Volta"
              />
            </div>
          ) : (
            ""
          )}

          {days.sun ? (
            <div className="day-container">
              <span>Domingo</span>

              <TextField
                value={startHours.sun}
                onChange={(e) =>
                  setStartHours({ ...startHours, sun: e.target.value })
                }
                type="time"
                label="Ida"
              />

              <TextField
                value={endHours.sun}
                onChange={(e) =>
                  setEndHours({ ...endHours, sun: e.target.value })
                }
                type="time"
                label="Volta"
              />
            </div>
          ) : (
            ""
          )}

          <button className="white-button" onClick={() => setStep(0)}>
            Editar Local
          </button>

          <div className="button-container">
            <button style={{ backgroundColor: "#f37d1d" }} onClick={cleanModal}>
              Cancelar
            </button>
            <button style={{ backgroundColor: "#5fdc2a" }} onClick={saveRide}>
              Criar Carona
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateRideModal;
