import type { ComponentPropsWithRef, FunctionComponent } from 'react';
import classNames from 'classnames';

export type ErrorMessageProps = {
  isBig?: boolean;
};

export const ErrorMessage: FunctionComponent<
  ComponentPropsWithRef<'div'> & ErrorMessageProps
> = ({ isBig, className, children, ...props }) => (
  <div
    role="alert"
    className={classNames(
      'text-red-vivid-600',
      'text-base',
      'font-normal',
      className,
      {
        'my-4 text-lg text-center': isBig
      }
    )}
    {...props}
  >
    {children}
  </div>
);
