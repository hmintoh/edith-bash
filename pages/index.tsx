import Head from "next/head";
import useSWR from "swr";

import Sparkle from "react-sparkle";
import { fetcher } from "../utils/fetcher";
import { IDetailItem } from "../utils/types";
import { Registry } from "../components/registry";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { data } = useSWR("/api/get-details", fetcher);

  const processedData =
    data &&
    data.data.results
      .filter((item: any) => item.type === "quote")
      .map((item: any) =>
        Object.assign(
          {},
          {
            detail: item.quote.rich_text[0].text.content,
          }
        )
      );

  return (
    processedData && (
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
            {processedData.map((item: IDetailItem, key: number) => (
              <p key={key}>{item.detail}</p>
            ))}
          </div>

          <div className={styles.section}>
            <Registry />
          </div>
        </main>

        <footer className={styles.footer}>
          © {new Date().getFullYear()} by hmintoh, made with ♡ in sg.
        </footer>
      </div>
    )
  );
}
