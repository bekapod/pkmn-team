import type { FunctionComponent, ComponentPropsWithRef } from 'react';
import cx from 'classnames';
import styles from './InlineList.module.css';

export const InlineList: FunctionComponent<ComponentPropsWithRef<'ul'>> = ({
  className,
  ...props
}) => <ul className={cx(styles.base, className)} {...props} />;
