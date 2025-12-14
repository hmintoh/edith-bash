import React, { useState } from "react";
import axios from "axios";
import useSWR from "swr";

import { fetcher } from "../utils/fetcher";
import { IRegistryItem } from "../utils/types";
import styles from "../styles/Registry.module.css";

const Registry = () => {
  const { data, mutate } = useSWR("/api/get-registry", fetcher);
  const untaggedItems: IRegistryItem[] = [];
  const taggedItems: IRegistryItem[] = [];

  const processData =
    data &&
    data.data.map((item: any) =>
      item.properties.choped.checkbox
        ? taggedItems.push({
            id: item.id,
            name: item.properties.name.title[0].plain_text,
            price: item.properties.price.number,
            url: item.properties.url.url,
            reason: item.properties.reason.rich_text[0].plain_text,
            choped: item.properties.choped.checkbox,
            imgSrc: item.properties.image.files[0]?.file.url,
          })
        : untaggedItems.push({
            id: item.id,
            name: item.properties.name.title[0].plain_text,
            price: item.properties.price.number,
            url: item.properties.url.url,
            reason: item.properties.reason.rich_text[0].plain_text,
            choped: item.properties.choped.checkbox,
            imgSrc: item.properties.image.files[0]?.file.url,
          })
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
        <img src={item.imgSrc} alt={item.name} />
        <a href={item.url} target="_blank">
          <p> {item.name}</p>
        </a>
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
    processData && (
      <div>
        <h2>
          totally optional, but if you're feeling generous, here is a list of{" "}
          <i>stuff i want that i definitely need</i>
        </h2>

        {untaggedItems.length === 0 ? (
          <div className={styles.empty}>thank you, i have all i need!</div>
        ) : (
          <ul className={styles.list}>
            {untaggedItems.map((item: IRegistryItem, key: number) => (
              <li key={key}>
                <ListCard item={item} />
              </li>
            ))}
          </ul>
        )}

        <h2>bagged and tagged</h2>

        {taggedItems.length === 0 ? (
          <div>-</div>
        ) : (
          <ul className={styles.list}>
            {taggedItems.map((item: IRegistryItem, key: number) => (
              <li key={key}>
                <ListCard item={item} />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  );
};

export { Registry };
