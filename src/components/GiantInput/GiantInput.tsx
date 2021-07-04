import { forwardRef, FunctionComponent } from 'react';
import classNames from 'classnames';
import { TextInput, TextInputProps } from '../TextInput';

export type GiantInputProps = TextInputProps & {
  isFullWidth?: boolean;
};

// eslint-disable-next-line react/display-name
export const GiantInput: FunctionComponent<GiantInputProps> = forwardRef(
  ({ isFullWidth, className, ...props }, ref) => (
    <TextInput
      ref={ref}
      className={classNames('px-4 h-8 text-lg', className, {
        'max-w-none': isFullWidth
      })}
      {...props}
    />
  )
);
