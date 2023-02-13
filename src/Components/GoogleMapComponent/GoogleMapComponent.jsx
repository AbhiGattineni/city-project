import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

import { UserOutlined } from "@ant-design/icons";

import { LocationPin } from "../LocationPin/LocationPin";
import CityData from "../../Data/Poi.json";
import { Loading, PropertyDropdown, SwitchComponent } from "..";
import { CityOwnedComponent } from "../CityOwnedComponent/CityOwnedComponent";
import { Row, Col } from "antd";

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
      <div style={{ width: "100%", height: "80vh" }}>
        {!loaded && <Loading className="" />}
        <Row justify="center" gutter={16} style={{ margin: "10px" }}>
          <Col span={8}>
            <CityOwnedComponent setCityOwned={(e) => setCityOwned(e)} />
          </Col>
          <Col span={8}>
            <PropertyDropdown
              setSelectedDropdown={(e) => setSelectedDropdown(e)}
            />
          </Col>
        </Row>

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
