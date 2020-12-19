import type { FunctionComponent, ComponentPropsWithRef } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import styles from './Header.module.css';
import { Pokeball } from '../Pokeball';

export type HeaderProps = ComponentPropsWithRef<'header'> & { title: string };

export const Header: FunctionComponent<HeaderProps> = ({
  className,
  title,
  ...props
}) => (
  <header className={cx(styles.container, className)} {...props}>
    <Link href="/">
      <a title="Dashboard" className={styles['logo-link']}>
        <Pokeball role="presentation" className={styles.logo} />
      </a>
    </Link>
    <h1 className={styles.title}>{title}</h1>
  </header>
);
