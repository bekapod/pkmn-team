import { ComponentPropsWithRef, forwardRef, FunctionComponent } from 'react';
import cx from 'classnames';
import styles from './TextInput.module.css';

export type TextInputProps = ComponentPropsWithRef<'input'> & {
  isInvalid?: boolean;
};

export const TextInput: FunctionComponent<TextInputProps> = forwardRef(
  ({ isInvalid, className, ...props }, ref) => (
    <input
      ref={ref}
      type="text"
      className={cx(styles.base, className)}
      aria-invalid={isInvalid ? true : undefined}
      {...props}
    />
  )
);
