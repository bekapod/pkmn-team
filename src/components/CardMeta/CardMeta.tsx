import type { FunctionComponent } from 'react';
import { Label } from '../Label';
import styles from './CardMeta.module.css';

export type CardMetaProps = {
  id: string;
  items?: {
    label: string;
    value: string | number;
  }[];
};

export const CardMeta: FunctionComponent<CardMetaProps> = ({
  id,
  items = []
}) => (
  <div className={styles.wrapper} data-testid={`card-meta-${id}`}>
    {items.map(({ label, value }) => (
      <div className={styles.item} key={label}>
        <Label className={styles.label}>{label}</Label>
        <span className={styles.value}>{value}</span>
      </div>
    ))}
  </div>
);
