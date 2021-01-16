import Maps from "./containers/Maps/Maps";
import "./App.css";
import { useState } from "react";
import PersonIcon from "@material-ui/icons/Person";

import UnnamedImg from "./unnamed.png";

const dayName = {
  mon: "Seg",
  tue: "Ter",
  wed: "Qua",
  thu: "Qui",
  fri: "Sex",
  sat: "Sab",
  sun: "Dom",
};

function App() {
  const [nav, setNav] = useState(false);
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
    <main>
      <button className="header-button">Procurar/Oferecer</button>

      <button className="open-nav" onClick={() => setNav(true)}>
        <PersonIcon />
      </button>

      <nav className={nav ? "opened" : ""}>
        <button className="close-nav" onClick={() => setNav(false)}>
          &times;
        </button>

        <div className="nav-user">
          <div
            className="nav-user-image"
            style={{ backgroundImage: `url(${UnnamedImg})` }}
          />

          <p>User Name</p>
        </div>

        <ul className="nav-options">
          <li>Meu perfil</li>
          <li>Minhas Caronas</li>
          <li>Sair</li>
        </ul>
      </nav>

      <Maps />

      <footer>
        <div className={`filter-option ${rideFilter ? "active" : ""}`}>
          <button
            className="filter-button"
            onClick={() => setRideFilter(!rideFilter)}
          >
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
                  onClick={() =>
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
                  onClick={() =>
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
                  onClick={() =>
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
                  onClick={() =>
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
            {`${dayFilter ? "Salvar" : "Filtrar"}`} Dias
          </button>
          <div className="filter-select">
            <span>
              <input
                name="dayFilter"
                id="mon"
                type="checkbox"
                checked={daysSelected.mon}
                onClick={() =>
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
                onClick={() =>
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
                onClick={() =>
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
                onClick={() =>
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
                onClick={() =>
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
                onClick={() =>
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
                onClick={() =>
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
    </main>
  );
}

export default App;
