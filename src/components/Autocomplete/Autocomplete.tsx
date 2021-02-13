import type { ComponentPropsWithRef, FunctionComponent } from 'react';
import cx from 'classnames';

export const Autocomplete: FunctionComponent<ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => (
  <div className={cx('flex', 'flex-col', 'h-full', className)} {...props} />
);

export const AutocompleteDropdown: FunctionComponent<
  ComponentPropsWithRef<'div'>
> = ({ className, ...props }) => (
  <div
    className={cx(
      'flex-grow',
      'flex-shrink-0',
      'w-full',
      'bg-white',
      'descendents:w-full',
      className
    )}
    {...props}
  />
);
