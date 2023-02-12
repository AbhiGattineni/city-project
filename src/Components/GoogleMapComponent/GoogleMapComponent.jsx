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
  const [opacity, setOpacity] = useState(1);
  const [selectedDropdown, setSelectedDropdown] = useState({
    label: "ALL",
    shortlabel: "ALL",
    key: 0,
    icon: <UserOutlined />,
  });
  const [cityOwned, setCityOwned] = useState("All");

  useEffect(() => {
    setTimeout(function () {
      setLoaded(true);
    }, 1000);
  }, []);

  useEffect(() => {
    let selectedData = [];
    console.log(selectedDropdown.shortlabel === "ALL" && cityOwned === "All");
    CityData.features.map((item) => {
      if (selectedDropdown.shortlabel === "ALL" && cityOwned === "All") {
        selectedData.push(item);
      } else if (
        selectedDropdown.shortlabel === "ALL" &&
        cityOwned === item.properties["CITY_OWNED"]
      ) {
        selectedData.push(item);
      } else if (
        selectedDropdown.shortlabel === item.properties["TYPECODE"] &&
        cityOwned === "All"
      ) {
        selectedData.push(item);
      } else if (
        selectedDropdown.shortlabel === item.properties["TYPECODE"] &&
        cityOwned === item.properties["CITY_OWNED"]
      ) {
        selectedData.push(item);
      }
    });
    setdisplaySelectedData(selectedData);
  }, [selectedDropdown, cityOwned]);

  const handleDrag = () => {
    setLoaded(false);
    setTimeout(function () {
      setLoaded(true);
    }, 1000);
  };

  return (
    <div className="">
      <div className="google-map ">
        {!loaded && <Loading className="place-self-center" />}
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
          onDrag={handleDrag}
          onZoomAnimationStart={handleDrag}
        >
          {loaded &&
            displaySelectedData.map((item) => {
              return (
                <LocationPin
                  key={item.properties["OBJECTID"]}
                  lat={item.geometry.coordinates[1]}
                  lng={item.geometry.coordinates[0]}
                  text={item.properties["NAME"]}
                  style={opacity}
                />
              );
            })}
        </GoogleMapReact>
      </div>
    </div>
  );
};
