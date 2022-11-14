import React from "react";
import axios from "axios";

import { IRegistryItem } from "../utils/types";
import styles from "../styles/Registry.module.css";

interface RegistryProps {
  registry: IRegistryItem[];
}

const Registry = ({ registry }: RegistryProps) => {
  const handleUpdate = async (id: string) => {
    const { data } = await axios.post("/api/update-registry", {
      id: id,
      isChoped: true,
    });
  };

  const ListCard = ({ item }: any) => {
    return (
      <div className={styles.card}>
        <img src={item.imgSrc} alt={item.name} />
        <a href={item.url} target="_blank">
          {item.name}
        </a>
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
    <div>
      <ul className={styles.list}>
        {registry
          .filter((item) => !item.choped)
          .map((item: IRegistryItem, key: number) => (
            <li key={key}>
              <ListCard item={item} />
            </li>
          ))}
      </ul>

      <h3>choped(?) items</h3>

      <ul className={styles.list}>
        {registry
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
