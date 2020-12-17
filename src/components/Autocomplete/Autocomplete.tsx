import { ComponentPropsWithRef, FunctionComponent } from 'react';
import cx from 'classnames';

export const AutocompleteDropdown: FunctionComponent<
  ComponentPropsWithRef<'div'>
> = ({ className, ...props }) => (
  <div className={cx('flex-1', 'w-full', 'bg-white', className)} {...props} />
);

export const Autocomplete: FunctionComponent<ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => (
  <div className={cx('flex', 'flex-col', 'h-full', className)} {...props} />
);
