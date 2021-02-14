import type { ComponentPropsWithRef, FunctionComponent } from 'react';
import classNames from 'classnames';

export const Autocomplete: FunctionComponent<ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => (
  <div
    className={classNames('flex', 'flex-col', 'h-full', className)}
    {...props}
  />
);

export const AutocompleteDropdown: FunctionComponent<
  ComponentPropsWithRef<'div'>
> = ({ className, ...props }) => (
  <div
    className={classNames(
      'flex-grow',
      'flex-shrink-0',
      'w-full',
      'bg-white',
      'children:w-full',
      className
    )}
    {...props}
  />
);
