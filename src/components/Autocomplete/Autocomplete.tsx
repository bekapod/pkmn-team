import type { ComponentPropsWithRef, FunctionComponent } from 'react';
import cx from 'classnames';
import styles from './Autocomplete.module.css';

export const Autocomplete: FunctionComponent<ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => <div className={cx(styles.container, className)} {...props} />;

export const AutocompleteDropdown: FunctionComponent<
  ComponentPropsWithRef<'div'>
> = ({ className, ...props }) => (
  <div className={cx(styles.dropdown, className)} {...props} />
);
