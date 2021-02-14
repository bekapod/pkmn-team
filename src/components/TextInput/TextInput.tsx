import { ComponentPropsWithRef, forwardRef, FunctionComponent } from 'react';
import cx from 'classnames';

export type TextInputProps = ComponentPropsWithRef<'input'> & {
  isInvalid?: boolean;
};

export const TextInput: FunctionComponent<TextInputProps> = forwardRef(
  ({ isInvalid, className, ...props }, ref) => (
    <input
      ref={ref}
      type="text"
      className={cx('input-text', className)}
      aria-invalid={isInvalid ? true : undefined}
      {...props}
    />
  )
);
