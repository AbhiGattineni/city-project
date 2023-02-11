import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { GoogleMapComponent, TableComponent } from "@/Components";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div style={{ height: "100vh" }}>
      <Head>
        <title>City Project</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/vblogo.ico" />
      </Head>
      <h2 className="map-h2">City Of Virginia Beach</h2>
      <div class="map-h2">
        <div>Table</div>
        <div>Map</div>
      </div>
      <TableComponent />
      <GoogleMapComponent />
    </div>
  );
}
