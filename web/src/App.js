import { useState } from "react";
import PersonIcon from "@material-ui/icons/Person";

import Maps from "./containers/Maps/Maps";
import Footer from "./containers/Footer/Footer";
import CreateRideModal from "./containers/CreateRide/CreateRideModal";

import "./App.css";

import UnnamedImg from "./unnamed.png";

function App() {
  const [nav, setNav] = useState(false);
  const [createRideModal, setCreateRideModal] = useState(false);
  // const [viewRideModal, setViewRideModal] = useState(false);

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

      <Maps />

      <CreateRideModal
        open={createRideModal}
        handleClose={() => setCreateRideModal(false)}
      />

      <Footer />
    </main>
  );
}

export default App;
