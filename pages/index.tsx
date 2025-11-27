import Head from "next/head";

import Sparkle from "react-sparkle";
import { Registry } from "../components/registry";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>boo!</title>
        <meta name="description" content="for edith" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Sparkle
          color={"#EAEFD3"}
          flickerSpeed={"slowest"}
          fadeOutSpeed={30}
          minSize={7}
          maxSize={12}
        />

        <div className={styles.section}>
          <h1>wow! im {new Date().getFullYear() - 2021}</h1>
          <img src={"/selfie.jpg"} alt="selfie" className={styles.image} />
          <br />
        </div>

        <div className={styles.section}>
          <Registry />
        </div>
      </main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} by hmintoh. made with ♡ in singapore.
      </footer>
    </div>
  );
}
