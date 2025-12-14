import Head from "next/head";
import useSWR from "swr";

import Sparkle from "react-sparkle";
import { fetcher } from "../utils/fetcher";
import { Registry } from "../components/registry";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { data } = useSWR("/api/get-details", fetcher);
  let coverPhoto: string = "";
  const details: string[] = [];

  const processedData =
    data &&
    data.data.results.map((item: any) => {
      switch (item.type) {
        case "image":
          coverPhoto = item.image.file.url;
          break;
        case "quote":
          details.push(item.quote.rich_text[0].text.content);
          break;
      }
    });

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
            <img src={coverPhoto} alt="selfie" className={styles.image} />
            <br />
            {details.map((item: string, key: number) => (
              <p key={key}>{item}</p>
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
