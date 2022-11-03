import Confetti from "react-confetti";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useWindowSize } from "../utils/useWindowSize";

export default function Home() {
  const size = useWindowSize();

  return (
    <div className={styles.container}>
      <Head>
        <title>edith</title>
        <meta name="description" content="edith's birthday bash" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {size.width && (
          <Confetti
            width={size.width}
            height={size.height}
            numberOfPieces={80}
            opacity={0.3}
          />
        )}

        <div className={styles.section}>
          <h1>edith is turning 1</h1>
          <p className={styles.description}>join us for a celebration 💛</p>
          <img src={"/selfie.jpg"} alt="selfie" className={styles.image} />
          <p>sat, 10 dec 2022</p>
          <p>11am to 2pm</p>
          <p>where: tbd</p>
        </div>
        <div className={styles.section}>
          <p className={styles.description}>
            if you would like to get her a gift, here are some suggestions!
          </p>
          <p>wip</p>
        </div>
      </main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} by hmintoh. made with ♡ in singapore.
      </footer>
    </div>
  );
}
