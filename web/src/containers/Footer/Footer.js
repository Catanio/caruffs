import { useState } from "react";
import TuneIcon from "@material-ui/icons/Tune";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

import "./styles.css";

const dayName = {
  mon: "Seg",
  tue: "Ter",
  wed: "Qua",
  thu: "Qui",
  fri: "Sex",
  sat: "Sab",
  sun: "Dom",
};

function Footer() {
  const [rideFilter, setRideFilter] = useState(false);
  const [rideType, setRideType] = useState({
    giving: true,
    taking: true,
  });
  const [rideDirection, setRideDirection] = useState({
    going: true,
    backing: true,
  });
  const [dayFilter, setDayFilter] = useState(false);
  const [daysSelected, setDaysSelected] = useState({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
    sun: true,
  });

  return (
    <footer>
      <div className={`filter-option ${rideFilter ? "active" : ""}`}>
        <button
          className="filter-button"
          onClick={() => setRideFilter(!rideFilter)}
        >
          <TuneIcon />
          {`${rideFilter ? "Salvar" : "Filtrar"}`} Carona
        </button>

        <div className="filter-select">
          <div className="filter-select-section">
            <div>
              <input
                name="rideType"
                type="checkbox"
                id="giving"
                checked={rideType.giving}
                onChange={() =>
                  setRideType({ ...rideType, giving: !rideType.giving })
                }
              />

              <label htmlFor="giving">Oferecendo</label>
            </div>

            <div>
              <input
                name="rideType"
                type="checkbox"
                id="taking"
                checked={rideType.taking}
                onChange={() =>
                  setRideType({ ...rideType, taking: !rideType.taking })
                }
              />

              <label htmlFor="taking">Procurando</label>
            </div>
          </div>

          <div className="filter-select-section">
            <div>
              <input
                name="rideDirection"
                type="checkbox"
                id="going"
                checked={rideDirection.going}
                onChange={() =>
                  setRideDirection({
                    ...rideDirection,
                    going: !rideDirection.going,
                  })
                }
              />

              <label htmlFor="going">Indo</label>
            </div>

            <div>
              <input
                name="rideDirection"
                type="checkbox"
                id="backing"
                checked={rideDirection.backing}
                onChange={() =>
                  setRideDirection({
                    ...rideDirection,
                    backing: !rideDirection.backing,
                  })
                }
              />

              <label htmlFor="backing">Voltando</label>
            </div>
          </div>
        </div>

        <div className="filter-content">
          {rideType.giving ? "Oferecendo" : ""}
          {rideType.giving && rideType.taking ? " e " : ""}
          {rideType.taking ? "Procurando" : ""};&nbsp;
          {rideDirection.going ? "Ida" : ""}
          {rideDirection.going && rideDirection.backing ? " e " : ""}
          {rideDirection.backing ? "Volta" : ""}
        </div>
      </div>

      <div className={`filter-option ${dayFilter ? "active" : ""}`}>
        <button
          className="filter-button"
          onClick={() => setDayFilter(!dayFilter)}
        >
          <CalendarTodayIcon />
          {`${dayFilter ? "Salvar" : "Filtrar"}`} Dias
        </button>
        <div className="filter-select">
          <span>
            <input
              name="dayFilter"
              id="mon"
              type="checkbox"
              checked={daysSelected.mon}
              onChange={() =>
                setDaysSelected({ ...daysSelected, mon: !daysSelected.mon })
              }
            />
            <label htmlFor="mon">Seg</label>
          </span>

          <span>
            <input
              name="dayFilter"
              id="tue"
              type="checkbox"
              checked={daysSelected.tue}
              onChange={() =>
                setDaysSelected({ ...daysSelected, tue: !daysSelected.tue })
              }
            />
            <label htmlFor="tue">Ter</label>
          </span>

          <span>
            <input
              name="dayFilter"
              id="wed"
              type="checkbox"
              checked={daysSelected.wed}
              onChange={() =>
                setDaysSelected({ ...daysSelected, wed: !daysSelected.wed })
              }
            />
            <label htmlFor="wed">Qua</label>
          </span>

          <span>
            <input
              name="dayFilter"
              id="thu"
              type="checkbox"
              checked={daysSelected.thu}
              onChange={() =>
                setDaysSelected({ ...daysSelected, thu: !daysSelected.thu })
              }
            />
            <label htmlFor="thu">Qui</label>
          </span>

          <span>
            <input
              name="dayFilter"
              id="fri"
              type="checkbox"
              checked={daysSelected.fri}
              onChange={() =>
                setDaysSelected({ ...daysSelected, fri: !daysSelected.fri })
              }
            />
            <label htmlFor="fri">Sex</label>
          </span>

          <span>
            <input
              name="dayFilter"
              id="sat"
              type="checkbox"
              checked={daysSelected.sat}
              onChange={() =>
                setDaysSelected({ ...daysSelected, sat: !daysSelected.sat })
              }
            />
            <label htmlFor="sat">Sab</label>
          </span>

          <span>
            <input
              name="dayFilter"
              id="sun"
              type="checkbox"
              checked={daysSelected.sun}
              onChange={() =>
                setDaysSelected({ ...daysSelected, sun: !daysSelected.sun })
              }
            />
            <label htmlFor="sun">Dom</label>
          </span>
        </div>

        <div className="filter-content">
          {Object.keys(daysSelected)
            .filter((day) => daysSelected[day])
            .map((day) => dayName[day])
            .join(", ")}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
