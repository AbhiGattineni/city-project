import { useEffect } from "react";
import { Map } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import CityData from "../../Data/Poi.json";

import dynamic from "next/dynamic";
// import OpenStreetMap from '../component/OpenStreetMap'
const OpenStreetMap = dynamic(() => import("../../Data/Poi.json"), {
  ssr: false,
});

export const MapComponent = () => {
  useEffect(() => {
    console.log(CityData);
  }, []);
  return (
    <div>
      <Map style={{ height: "80vh" }}></Map>
      <OpenStreetMap />
    </div>
  );
};
