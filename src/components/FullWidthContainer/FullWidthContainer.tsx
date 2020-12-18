import type { FunctionComponent, ComponentPropsWithRef } from 'react';
import cx from 'classnames';
import styles from './FullWidthContainer.module.css';

export const FullWidthContainer: FunctionComponent<
  ComponentPropsWithRef<'div'>
> = ({ className, ...props }) => (
  <div className={cx(styles.container, className)} {...props} />
);
