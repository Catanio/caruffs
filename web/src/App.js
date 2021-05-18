import { useState } from "react";
import PersonIcon from "@material-ui/icons/Person";

import Login from "./containers/Login/Login"
import Maps from "./containers/Maps/Maps";
import Footer from "./containers/Footer/Footer";
import CreateRideModal from "./containers/CreateRide/CreateRideModal";

import "./App.css";

import UnnamedImg from "./unnamed.png";

const MockMarkers = [
  {
    user: {
      name: "Maurício",
      bio:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      phone: "(49) 99999-9999",
      email: "mauri.catanio@yahoo.com.br",
    },
    ride: {
      position: [51.505, -0.09],
      days: {
        mon: {
          going: "12:30",
          backing: "18:30",
        },
        tue: {
          going: "10:30",
          backing: "18:30",
        },
      },
    },
  },
  {
    user: {
      name: "Murilo Benício",
      bio:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      phone: "(49) 99999-9999",
      email: "mauri.catanio@yahoo.com.br",
    },
    ride: {
      position: [51.56, -0.19],
      days: {
        mon: {
          going: "12:30",
          backing: "18:30",
        },
        tue: {
          going: "10:30",
          backing: "18:30",
        },
      },
    },
  },
];

function App() {
  const [nav, setNav] = useState(false);
  const [createRideModal, setCreateRideModal] = useState(false);
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <main>
      <button
        className="header-button"
        onClick={() => setCreateRideModal(true)}
      >
        Oferecer Carona!
      </button>

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

      <Maps markers={MockMarkers} />

      <CreateRideModal
        open={createRideModal}
        handleClose={() => setCreateRideModal(false)}
      />

      <Footer />
    </main>
  );
}

export default App;
