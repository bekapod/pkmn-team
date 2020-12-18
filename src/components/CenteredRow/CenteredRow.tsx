import { ComponentPropsWithRef, FunctionComponent } from 'react';
import cx from 'classnames';
import styles from './CenteredRow.module.css';

export type CenteredRowProps = {
  stackVertically?: boolean;
};

export const CenteredRow: FunctionComponent<
  ComponentPropsWithRef<'div'> & CenteredRowProps
> = ({ className, stackVertically, ...props }) => (
  <div
    className={cx(styles.container, className, {
      [styles['is-vertical']]: stackVertically
    })}
    {...props}
  />
);
