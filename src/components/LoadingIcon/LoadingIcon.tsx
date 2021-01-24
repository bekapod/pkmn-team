import type { ComponentPropsWithRef, FunctionComponent } from 'react';
import cx from 'classnames';
import styles from './LoadingIcon.module.css';

export type LoadingIconProps = {
  isSpinner?: boolean;
  isSmall?: boolean;
  isCentered?: boolean;
};

const loadingText = 'Loading';

export const LoadingIcon: FunctionComponent<
  ComponentPropsWithRef<'div'> & LoadingIconProps
> = ({ isSpinner, isSmall, isCentered, className, ...props }) =>
  isSpinner ? (
    <div
      className={cx(
        styles.spinner,
        {
          [styles['is-small']]: isSmall,
          [styles['is-centered']]: isCentered
        },
        className
      )}
      data-testid="loading-spinner"
      role="img"
      aria-label={loadingText}
      {...props}
    />
  ) : (
    <div className={cx(styles.text, className)}>{loadingText}</div>
  );
