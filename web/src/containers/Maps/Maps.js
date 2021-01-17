import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import ViewRideModal from "../ViewRide/ViewRideModal";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const position = [51.505, -0.09];

const Maps = ({ markers }) => {
  const [viewRideModal, setViewRideModal] = useState({
    open: false,
    marker: {},
  });

  return (
    <>
      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={false}
        className="maps-container"
        style={{ width: "100%", height: "100vh", zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((marker, key) => (
          <Marker
            position={[marker.ride.position.lat, marker.ride.position.lng]}
            key={key}
          >
            <Popup>
              <a
                onClick={() => setViewRideModal({ open: true, marker: marker })}
              >
                Ver Carona
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <ViewRideModal
        open={viewRideModal.open}
        marker={viewRideModal.marker}
        handleClose={() => setViewRideModal({ open: false, marker: {} })}
      />
    </>
  );
};

export default Maps;
