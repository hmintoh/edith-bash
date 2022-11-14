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
          }
        )
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>edith</title>
        <meta name="description" content="edith's birthday bash" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Sparkle
          color={"#866eb3"}
          flickerSpeed={"slowest"}
          fadeOutSpeed={30}
          minSize={7}
          maxSize={12}
        />

        {!data ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <div className={styles.section}>
              <h1>edith is turning 1!</h1>
              <h2>join us for a celebration 💛</h2>
              <img src={"/selfie.jpg"} alt="selfie" className={styles.image} />

              <p>sat, 10 dec 2022</p>
              <p>11am to 2pm</p>
              <p>5 wajek walk, s588087</p>
              <br />
              <p>please rsvp with tim or min by sat, 3 dec 2022</p>
            </div>

            <div className={styles.section}>
              <h2>
                if you would like to get a gift, here are some suggestions -
              </h2>

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
