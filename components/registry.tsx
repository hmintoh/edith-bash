import React from "react";
import axios from "axios";
import useSWR from "swr";

import { fetcher } from "../utils/fetcher";
import { IRegistryItem } from "../utils/types";
import styles from "../styles/Registry.module.css";

const Registry = () => {
  const { data } = useSWR("/api/get-registry", fetcher);

  const processedData =
    data &&
    data.data.map((item: any) =>
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

  const handleUpdate = async (id: string) => {
    await axios.post("/api/update-registry", {
      id: id,
      isChoped: true,
    });
  };

  const ListCard = ({ item }: any) => {
    return (
      <div className={styles.card}>
        <a href={item.url} target="_blank">
          <img src={item.imgSrc} alt={item.name} />
        </a>
        <strong>{item.name}</strong>
        <p>${item.price}</p>

        {!item.choped && (
          <button onClick={() => handleUpdate(item.id)} value={item.id}>
            i'll get it!
          </button>
        )}
      </div>
    );
  };

  return !processedData ? (
    <div>
      <h3>loading...</h3>
    </div>
  ) : (
    <div>
      <h3>if you would like to get a gift, here are some suggestions -</h3>

      <ul className={styles.list}>
        {processedData
          .filter((item: IRegistryItem) => !item.choped)
          .map((item: IRegistryItem, key: number) => (
            <li key={key}>
              <ListCard item={item} />
            </li>
          ))}
      </ul>

      <h3>reserved items</h3>

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
  );
};

export { Registry };
