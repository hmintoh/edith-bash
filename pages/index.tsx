import Head from "next/head";

import Sparkle from "react-sparkle";
import { Registry } from "../components/registry";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>boo, i'm 3!</title>
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
          <h1>boo, i'm three!</h1>
          <h2>it's my birthday and you are invited 🤍</h2>
          <img src={"/selfie.jpg"} alt="selfie" className={styles.image} />
          <p>tbc</p>
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
