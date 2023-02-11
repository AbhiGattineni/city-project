import "../styles/globals.css";
import "../Components/GoogleMapComponent/map.css";
import styles from "../../dist/output.css";

export default function App({ Component, pageProps }) {
  return <Component className={styles.active} {...pageProps} />;
}
