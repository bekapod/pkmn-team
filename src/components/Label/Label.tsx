import type { FunctionComponent, ComponentPropsWithRef } from 'react';
import cx from 'classnames';
import styles from './Label.module.css';

export const Label: FunctionComponent<ComponentPropsWithRef<'span'>> = ({
  className,
  ...props
}) => <span className={cx(styles.base, className)} {...props} />;
