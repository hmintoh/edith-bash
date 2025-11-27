import React from "react";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";

import { fetcher } from "../utils/fetcher";
import { IRegistryItem } from "../utils/types";
import styles from "../styles/Registry.module.css";

const Registry = () => {
  const { data, mutate } = useSWR("/api/get-registry", fetcher);

  console.log(data);

  const processedData =
    data &&
    data.data.map((item: any) =>
      Object.assign(
        {},
        {
          id: item.id,
          name: item.properties.name.title[0].plain_text,
          price: item.properties.price.number,
          url: item.properties.url.url,
          reason: item.properties.reason.rich_text[0].plain_text,
          choped: item.properties.choped.checkbox,
          imgSrc: item.properties.image.files[0]?.file.url,
        }
      )
    );

  const handleUpdate = async (id: string) => {
    await axios.post("/api/update-registry", {
      id: id,
      isChoped: true,
    });
    mutate();
  };

  const ListCard = ({ item }: any) => {
    return (
      <div className={styles.card}>
        <a href={item.url} target="_blank">
          <img src={item.imgSrc} alt={item.name} />
        </a>
        <p>{item.name}</p>
        <p>{item.reason}</p>
        <p>${item.price}</p>

        {!item.choped && (
          <button onClick={() => handleUpdate(item.id)} value={item.id}>
            i'll get it!
          </button>
        )}
      </div>
    );
  };

  return (
    processedData && (
      <div>
        <h3>stuff i want that i totally need</h3>

        <ul className={styles.list}>
          {processedData
            .filter((item: IRegistryItem) => !item.choped)
            .map((item: IRegistryItem, key: number) => (
              <li key={key}>
                <ListCard item={item} />
              </li>
            ))}
        </ul>

        <h3>bagged and tagged</h3>

        <ul className={styles.list}>
          {processedData
            .filter((item: IRegistryItem) => item.choped)
            .map((item: IRegistryItem, key: number) => (
              <li key={key}>
                <ListCard item={item} />
              </li>
            ))}
        </ul>
      </div>
    )
  );
};

export { Registry };
