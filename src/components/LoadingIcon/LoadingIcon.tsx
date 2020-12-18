import type { ComponentPropsWithRef, FunctionComponent } from 'react';
import cx from 'classnames';
import styles from './LoadingIcon.module.css';

export type LoadingIconProps = {
  spinner?: boolean;
  small?: boolean;
};

const loadingText = 'Loading';

export const LoadingIcon: FunctionComponent<
  ComponentPropsWithRef<'div'> & LoadingIconProps
> = ({ spinner, small, className, ...props }) =>
  spinner ? (
    <div
      className={cx(className, styles.spinner, { [styles['is-small']]: small })}
      data-testid="loading-spinner"
      role="img"
      aria-label={loadingText}
      {...props}
    />
  ) : (
    <div className={styles.text}>{loadingText}</div>
  );
