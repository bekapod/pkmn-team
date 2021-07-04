import type { ComponentPropsWithRef, FunctionComponent } from 'react';
import classNames from 'classnames';
import { BiError } from 'react-icons/bi';

export const ErrorMessage: FunctionComponent<ComponentPropsWithRef<'div'>> = ({
  className,
  children,
  ...props
}) => (
  <div
    role="alert"
    className={classNames(
      'text-red-vivid-600',
      'text-lg',
      'font-normal',
      'flex items-center',
      className
    )}
    {...props}
  >
    <BiError className="mr-3" />
    {children}
  </div>
);
