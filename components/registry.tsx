import React from "react";
import { IRegistryItem } from "../utils/types";
import styles from "../styles/Registry.module.css";

const Registry = ({ registry }: IRegistryItem[]) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {registry.map((item: IRegistryItem, key: number) => (
          <li key={key} className={styles.listItem}>
            <a className={styles.link} href={item.url} target="_blank">
              {item.name}
            </a>
            , ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Registry;
