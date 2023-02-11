import React from "react";
import GoogleMapReact from "google-map-react";

import { LocationPin } from "../LocationPin/LocationPin";
import CityData from "../../Data/Poi.json";

export const GoogleMapComponent = () => {
  return (
    <div className="map">
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAtM-jn7A0XVb_WPibPltWwRsAF2lUWOhw" }}
          center={{
            lat: 36.86314,
            lng: -76.015778,
          }}
          zoom={13}
          yesIWantToUseGoogleMapApiInternals
        >
          {CityData.features.map((item) => {
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
