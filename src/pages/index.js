import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";

import {
  GoogleMapComponent,
  TableComponent,
  ChartComponent,
} from "@/Components";
import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState(<TableComponent />);
  const [tab, setTab] = useState("Table");
  const handleClick = (e) => {
    if (e.target.innerText === "Table") {
      setActive(<TableComponent />);
      setTab("Table");
    } else if (e.target.innerText === "Map") {
      setActive(<GoogleMapComponent />);
      setTab("Map");
    } else if (e.target.innerText === "Chart") {
      setActive(<ChartComponent />);
      setTab("Chart");
    }
  };
  return (
    <div style={{ height: "100vh" }}>
      <Head>
        <title>City Project</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/vblogo.ico" />
      </Head>
      <h2 className="text-2xl font-bold text-center mb-3 bg-gray-300 rounded py-2">
        City Of Virginia Beach
      </h2>
      <div className="grid justify-items-center">
        <div className="grid grid-cols-3 m-3">
          <div
            className={
              tab === "Table"
                ? "text-xl mx-3  border-2 border-slate-500 rounded-lg px-2"
                : "text-xl mx-3 cursor-pointer p-2"
            }
            onClick={handleClick}
          >
            Table
          </div>
          <div
            className={
              tab === "Map"
                ? "text-xl mx-3  border-2 border-slate-500 rounded-lg px-2"
                : "text-xl mx-3 cursor-pointer p-2"
            }
            onClick={handleClick}
          >
            Map
          </div>
          <div
            className={
              tab === "Chart"
                ? "text-xl mx-3  border-2 border-slate-500 rounded-lg p-2"
                : "text-xl mx-3 cursor-pointer p-2"
            }
            onClick={handleClick}
          >
            Chart
          </div>
        </div>
      </div>
      {active}
    </div>
  );
}
