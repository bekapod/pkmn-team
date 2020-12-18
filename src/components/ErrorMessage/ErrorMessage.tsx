import type { ComponentPropsWithRef, FunctionComponent } from 'react';
import cx from 'classnames';
import styles from './ErrorMessage.module.css';

export type ErrorMessageProps = {
  isBig?: boolean;
};

export const ErrorMessage: FunctionComponent<
  ComponentPropsWithRef<'div'> & ErrorMessageProps
> = ({ isBig, className, children, ...props }) => (
  <div
    role="alert"
    className={cx(styles.base, className, { [styles['is-big']]: isBig })}
    {...props}
  >
    {children}
  </div>
);
