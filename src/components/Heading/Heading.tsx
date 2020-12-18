import type { FunctionComponent, ComponentPropsWithRef } from 'react';
import cx from 'classnames';
import styles from './Heading.module.css';

export const Heading: FunctionComponent<ComponentPropsWithRef<'h1'>> = ({
  className,
  ...props
}) => <h1 className={cx(styles.base, className)} {...props} />;
