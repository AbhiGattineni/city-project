import React, { useEffect } from "react";
import GoogleMapReact from "google-map-react";

import { LocationPin } from "../LocationPin/LocationPin";
import CityData from "../../Data/Poi.json";
import { PropertyDropdown } from "..";

export const GoogleMapComponent = () => {
  const [displaySelectedData, setdisplaySelectedData] = React.useState([]);
  const [selectedDropdown, setSelectedDropdown] = React.useState([]);

  useEffect(() => {
    let allData = [];
    CityData.features.map((item) => allData.push(item.properties));
    setdisplaySelectedData(allData);
  }, []);

  useEffect(() => {
    let selectedData = [];
    console.log(selectedDropdown.shortlabel === "ALL");
    console.log(selectedDropdown.length === 0);
    if (
      selectedDropdown.shortlabel === "ALL" ||
      selectedDropdown.length === 0
    ) {
      CityData.features.map((item) => selectedData.push(item.properties));
    } else {
      CityData.features.map((item) => {
        if (item.properties["TYPECODE"] === selectedDropdown.shortlabel) {
          selectedData.push(item.properties);
        }
      });
    }
    setdisplaySelectedData(selectedData);
  }, [selectedDropdown]);

  return (
    <div className="mt-3">
      <div className="google-map">
        <div className="grid grid-cols-2 md:grid-cols-6 justify-items-center my-3">
          <PropertyDropdown
            setSelectedDropdown={(e) => setSelectedDropdown(e)}
          />
          <div>This is Toggle Componenet</div>
        </div>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          center={{
            lat: 36.86314,
            lng: -76.015778,
          }}
          zoom={10}
          yesIWantToUseGoogleMapApiInternals
        >
          {displaySelectedData.map((item) => {
            return (
              <LocationPin
                key={item["OBJECTID"]}
                lat={item["LATITUDE"]}
                lng={item["LONGITUDE"]}
                text={item["NAME"]}
              />
            );
          })}
        </GoogleMapReact>
      </div>
    </div>
  );
};
