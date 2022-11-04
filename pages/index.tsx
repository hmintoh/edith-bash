import { useState, useEffect } from "react";
import Head from "next/head";
import Confetti from "react-confetti";
import Registry from "../components/registry";

import { getRegistry } from "../utils/notion";
import { useWindowSize } from "../utils/useWindowSize";
import { IRegistryItem } from "../utils/types";

import styles from "../styles/Home.module.css";

export default function Home({ data }: any) {
  const [registry, setRegistry] = useState<IRegistryItem[] | undefined>(
    undefined
  );
  const size = useWindowSize();

  useEffect(() => {
    const processData = data.map(
      (item: any): IRegistryItem =>
        Object.assign(
          {},
          {
            name: item.name.title[0].plain_text,
            url: item.url.url,
            price: item.price.number,
          }
        )
    );
    setRegistry(processData);
  }, []);

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
            if you would like to get a gift, here are some suggestions!
          </p>
          {registry && <Registry registry={registry} />}
        </div>
      </main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} by hmintoh. made with ♡ in singapore.
      </footer>
    </div>
  );
}

export const getServerSideProps = async () => {
  const registry = await getRegistry();
  const filtered = registry.map((item: any) => item.properties);

  return { props: { data: filtered } };
};
