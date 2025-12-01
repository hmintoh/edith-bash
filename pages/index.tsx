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
          <h1>boo! im {new Date().getFullYear() - 2021}</h1>
          <br />
          <img src={"/selfie.jpg"} alt="selfie" className={styles.image} />
          <br />
          <p>13 Dec 2025, 2-5.30pm @ springdale function room</p>
          <p>
            there will be snacks, there will be chaos. please RSVP and don't
            forget your swimwear!
          </p>
        </div>

        <div className={styles.section}>
          <Registry />
        </div>
      </main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} by hmintoh, made with ♡ in sg.
      </footer>
    </div>
  );
}
