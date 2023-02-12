import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

import { UserOutlined } from "@ant-design/icons";

import { LocationPin } from "../LocationPin/LocationPin";
import CityData from "../../Data/Poi.json";
import { Loading, PropertyDropdown, SwitchComponent } from "..";
import { CityOwnedComponent } from "../CityOwnedComponent/CityOwnedComponent";

export const GoogleMapComponent = () => {
  const [displaySelectedData, setdisplaySelectedData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState({
    label: "ALL",
    shortlabel: "ALL",
    key: 0,
    icon: <UserOutlined />,
  });
  const [cityOwned, setCityOwned] = useState("All");

  useEffect(() => {
    let selectedData = [];
    setLoaded(false);
    console.log(selectedDropdown.shortlabel === "ALL" && cityOwned === "All");
    CityData.features.map((item) => {
      if (selectedDropdown.shortlabel === "ALL" && cityOwned === "All") {
        selectedData.push(item.properties);
      } else if (
        selectedDropdown.shortlabel === "ALL" &&
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
    setLoaded(true);
  }, [selectedDropdown, cityOwned]);

  return (
    <div className="">
      <div className="google-map">
        <div className="grid grid-cols-2  justify-items-center m-2 md:m-3">
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
        >
          {loaded ? (
            displaySelectedData.map((item) => {
              return (
                <LocationPin
                  key={item["OBJECTID"]}
                  lat={item["LATITUDE"]}
                  lng={item["LONGITUDE"]}
                  text={item["NAME"]}
                />
              );
            })
          ) : (
            <Loading lat={"36.86314"} lng={"-76.015778"} />
          )}
        </GoogleMapReact>
      </div>
    </div>
  );
};
