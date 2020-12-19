import type { ComponentPropsWithRef, FunctionComponent } from 'react';
import cx from 'classnames';
import Head from 'next/head';
import { Heading } from '../Heading';
import styles from './Page.module.css';

export type PageProps = ComponentPropsWithRef<'div'> & {
  title: string;
  metaTitle: string;
};

export const Page: FunctionComponent<PageProps> = ({
  className,
  title,
  metaTitle,
  children,
  ...props
}) => (
  <>
    <Head>
      <title>{metaTitle}</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://use.typekit.net/jdl7nve.css" />
    </Head>
    <div className={cx(styles.container, className)} {...props}>
      <Heading className={styles.heading}>{title}</Heading>
      <main className={styles.content}>{children}</main>
    </div>
  </>
);
