import GoogleMapReact from "google-map-react";

import { LocationPin } from "../LocationPin/LocationPin";
import CityData from "../../Data/Poi.json";

export const GoogleMapComponent = () => {
  const firstFive = CityData.features.slice(0, 20);
  return (
    <div className="map">
      <h2 className="map-h2">City Of Virginia Beach</h2>

      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAtM-jn7A0XVb_WPibPltWwRsAF2lUWOhw" }}
          center={{
            lat: 36.86314,
            lng: -76.015778,
          }}
          zoom={10}
          yesIWantToUseGoogleMapApiInternals
        >
          {firstFive.map((item) => {
            return (
              <LocationPin
                key={item.properties["OBJECTID"]}
                lat={item.geometry.coordinates[1]}
                lng={item.geometry.coordinates[0]}
                text={item.properties["NAME"]}
              />
            );
          })}
        </GoogleMapReact>
      </div>
    </div>
  );
};
