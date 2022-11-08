import React from "react";

import { IRegistryItem } from "../utils/types";
import styles from "../styles/Registry.module.css";

import axios from "axios";

interface RegistryProps {
  registry: IRegistryItem[];
}

const Registry = ({ registry }: RegistryProps) => {
  const handleUpdate = async (id: string) => {
    const { data } = await axios.post("/api/update-registry", {
      id: id,
      isChoped: true,
    });

    console.log(data);
  };

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {registry.map((item: IRegistryItem, key: number) => (
          <li key={key} className={styles.listItem}>
            <a className={styles.link} href={item.url} target="_blank">
              {item.name}
            </a>
            , ${item.price}
            <button onClick={() => handleUpdate(item.id)} value={item.id}>
              chope
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Registry;
