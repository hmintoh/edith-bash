import Head from "next/head";
import { IRegistryItem } from "../utils/types";
import { fetcher } from "../utils/fetcher";
import useSWR from "swr";

import Sparkle from "react-sparkle";
import { Registry } from "../components/registry";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { data } = useSWR("/api/get-registry", fetcher);

  const processData = (data: any): IRegistryItem[] => {
    return data.map(
      (item: any): IRegistryItem =>
        Object.assign(
          {},
          {
            id: item.id,
            name: item.properties.name.title[0].plain_text,
            url: item.properties.url.url,
            price: item.properties.price.number,
            choped: item.properties.choped.checkbox,
            imgSrc: item.properties.image.files[0]?.file.url,
          }
        )
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>boo, i'm two!</title>
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

        {!data ? (
          <h2>uno momento...</h2>
        ) : (
          <>
            <div className={styles.section}>
              <h1>boo, i'm two!</h1>
              <h2>join us to celebrate edith's 730 days on this earth 🤍</h2>
              <img src={"/selfie.jpg"} alt="selfie" className={styles.image} />
              <p>tbc</p>
              <br />
            </div>

            <div className={styles.section}>
              <h3>
                if you would like to get a gift, here are some suggestions -
              </h3>

              <Registry registry={processData(data.data)} />
            </div>
          </>
        )}
      </main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} by hmintoh. made with ♡ in singapore.
      </footer>
    </div>
  );
}
