import { ComponentPropsWithRef, forwardRef, FunctionComponent } from 'react';
import classNames from 'classnames';

export type TextInputProps = ComponentPropsWithRef<'input'> & {
  isInvalid?: boolean;
};

// eslint-disable-next-line react/display-name
export const TextInput: FunctionComponent<TextInputProps> = forwardRef(
  ({ isInvalid, className, ...props }, ref) => (
    <input
      ref={ref}
      type="text"
      className={classNames('input-text', className)}
      aria-invalid={isInvalid ? true : undefined}
      {...props}
    />
  )
);
