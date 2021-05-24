import { useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import { logout } from "../../services/auth";
import { Link } from "react-router-dom";

import Maps from "../Maps/Maps";
import Footer from "../Footer/Footer";
import CreateRideModal from "../CreateRide/CreateRideModal";

import "./styles.css";

import UnnamedImg from "../../unnamed.png";

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

function Dashboard() {
    const [nav, setNav] = useState(false);
    const [createRideModal, setCreateRideModal] = useState(false);
  
    return (
      <main>
        <button className="header-button" 
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
  
            <p>Usuário</p>
          </div>
  
          <ul className="nav-options">
            <li>Meu perfil</li>
            <li>Minhas Caronas</li>
            <li><Link to="/" onClick={() => logout} class="nav-button" >Sair</Link></li>
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
  
  export default Dashboard;