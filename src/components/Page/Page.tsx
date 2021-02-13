import type { ComponentPropsWithRef, FunctionComponent } from 'react';
import cx from 'classnames';
import Head from 'next/head';
import { Header } from '../Header';

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
    <div
      className={cx('flex', 'flex-col', 'min-h-screen', className)}
      {...props}
    >
      <Header className={cx('flex-grow-0', 'flex-shrink-0')} title={title} />
      <main className={cx('relative', 'flex-grow-1', 'flex-shrink-1')}>
        {children}
      </main>
    </div>
  </>
);
