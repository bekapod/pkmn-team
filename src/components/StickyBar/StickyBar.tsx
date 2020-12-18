import type { FunctionComponent, ComponentPropsWithRef } from 'react';
import cx from 'classnames';
import styles from './StickyBar.module.css';

export const StickyBar: FunctionComponent<ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => <div className={cx(styles.container, className)} {...props} />;
