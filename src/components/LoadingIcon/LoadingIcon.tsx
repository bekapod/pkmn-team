import type { ComponentPropsWithRef, FunctionComponent } from 'react';
import classNames from 'classnames';

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
      className={classNames(
        'spinner',
        {
          'spinner-small': isSmall,
          'absolute top-0 bottom-0 m-auto': isCentered
        },
        className
      )}
      data-testid="loading-spinner"
      role="img"
      aria-label={loadingText}
      {...props}
    />
  ) : (
    <div
      className={classNames(
        'my-5',
        'text-cool-grey-600',
        'font-sans',
        'text-md',
        'font-bold',
        'tracking-widest',
        'text-center',
        'uppercase',
        'animate-pulse-fade',
        className
      )}
    >
      {loadingText}
    </div>
  );
