import { useState } from "react";
import PersonIcon from "@material-ui/icons/Person";

import Maps from "./containers/Maps/Maps";
import Footer from "./containers/Footer/Footer";

import "./App.css";

import UnnamedImg from "./unnamed.png";

function App() {
  const [nav, setNav] = useState(false);

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

      <Footer />
    </main>
  );
}

export default App;
