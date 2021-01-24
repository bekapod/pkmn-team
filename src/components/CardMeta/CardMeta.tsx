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
  <dl className={styles.wrapper} data-testid={`card-meta-${id}`}>
    {items.map(({ label, value }) => (
      <div className={styles.item} key={label}>
        <Label className={styles.label} as="dt">
          {label}
        </Label>
        <dd className={styles.value}>{value}</dd>
      </div>
    ))}
  </dl>
);
