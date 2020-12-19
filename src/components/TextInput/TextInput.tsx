import type { ComponentPropsWithRef, FunctionComponent } from 'react';
import cx from 'classnames';
import styles from './TextInput.module.css';

export type TextInputProps = ComponentPropsWithRef<'input'> & {
  isInvalid?: boolean;
};

export const TextInput: FunctionComponent<TextInputProps> = ({
  isInvalid,
  className,
  ...props
}) => (
  <input
    type="text"
    className={cx(styles.base, className)}
    aria-invalid={isInvalid ? true : undefined}
    {...props}
  />
);
