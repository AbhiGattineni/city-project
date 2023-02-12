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
      <div className="grid  sm:grid-cols-2  bg-gray-300 rounded py-5">
        <div className="grid grid-cols-5 place-self-center sm:place-self-start  ml-3">
          <Image
            src="/icon.ico"
            alt="Logo"
            width={50}
            height={50}
            className="col-span-1"
          />
          <div className="text-2xl font-bold text-center col-span-4">
            City Of Virginia Beach
          </div>
        </div>
        <div className="grid justify-items-stretch my-5 sm:my-0">
          <div className="grid grid-cols-3">
            <div
              className={
                tab === "Table"
                  ? "text-xl mx-3  border-b-2 border-slate-500 text-center"
                  : "text-xl mx-3 cursor-pointer  text-center"
              }
              onClick={handleClick}
            >
              Table
            </div>
            <div
              className={
                tab === "Map"
                  ? "text-xl mx-3  border-b-2 border-slate-500 text-center"
                  : "text-xl mx-3 cursor-pointer  text-center"
              }
              onClick={handleClick}
            >
              Map
            </div>
            <div
              className={
                tab === "Chart"
                  ? "text-xl mx-3 border-b-2 border-slate-500 text-center"
                  : "text-xl mx-3 cursor-pointer text-center"
              }
              onClick={handleClick}
            >
              Chart
            </div>
          </div>
        </div>
      </div>
      {active}
    </div>
  );
}
