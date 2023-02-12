import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

import { UserOutlined } from "@ant-design/icons";

import { LocationPin } from "../LocationPin/LocationPin";
import CityData from "../../Data/Poi.json";
import { PropertyDropdown, SwitchComponent } from "..";
import { CityOwnedComponent } from "../CityOwnedComponent/CityOwnedComponent";

export const GoogleMapComponent = () => {
  const [displaySelectedData, setdisplaySelectedData] = useState([]);
  const [selectedDropdown, setSelectedDropdown] = useState({
    label: "All",
    shortlabel: "All",
    key: 0,
    icon: <UserOutlined />,
  });
  const [cityOwned, setCityOwned] = useState("All");

  useEffect(() => {
    let selectedData = [];
    CityData.features.map((item) => {
      if (selectedDropdown.shortlabel === "All" && cityOwned === "All") {
        selectedData.push(item.properties);
      } else if (
        selectedDropdown.shortlabel === "All" &&
        cityOwned === item.properties["CITY_OWNED"]
      ) {
        selectedData.push(item.properties);
      } else if (
        selectedDropdown.shortlabel === item.properties["TYPECODE"] &&
        cityOwned === "All"
      ) {
        selectedData.push(item.properties);
      } else if (
        selectedDropdown.shortlabel === item.properties["TYPECODE"] &&
        cityOwned === item.properties["CITY_OWNED"]
      ) {
        selectedData.push(item.properties);
      }
    });
    setdisplaySelectedData(selectedData);
  }, [selectedDropdown, cityOwned]);

  return (
    <div className="mt-3">
      <div className="google-map">
        <div className="grid grid-cols-2 md:grid-cols-6 justify-items-center my-3">
          <PropertyDropdown
            setSelectedDropdown={(e) => setSelectedDropdown(e)}
          />
          <CityOwnedComponent setCityOwned={(e) => setCityOwned(e)} />
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
