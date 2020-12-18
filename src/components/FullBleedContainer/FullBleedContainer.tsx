import type { FunctionComponent, ComponentPropsWithRef } from 'react';
import cx from 'classnames';
import styles from './FullBleedContainer.module.css';

export const FullBleedContainer: FunctionComponent<
  ComponentPropsWithRef<'div'>
> = ({ className, ...props }) => (
  <div className={cx(styles.container, className)} {...props} />
);
