import GoogleMapReact from "google-map-react";

import { LocationPin } from "../LocationPin/LocationPin";

export const GoogleMapComponent = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
    address: "home",
  };
  return (
    <div className="map">
      <h2 className="map-h2">Come Visit Us At Our Campus</h2>

      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAtM-jn7A0XVb_WPibPltWwRsAF2lUWOhw" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <LocationPin
            lat={59.955413}
            lng={30.337844}
            text={defaultProps.address}
          />
        </GoogleMapReact>
      </div>
    </div>
  );
};
