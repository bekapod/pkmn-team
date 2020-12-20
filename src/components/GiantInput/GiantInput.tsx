import { forwardRef, FunctionComponent } from 'react';
import cx from 'classnames';
import { TextInput, TextInputProps } from '../TextInput';
import styles from './GiantInput.module.css';

export type GiantInputProps = TextInputProps & {
  fullWidth?: boolean;
};

export const GiantInput: FunctionComponent<GiantInputProps> = forwardRef(
  ({ fullWidth, className, ...props }, ref) => (
    <TextInput
      ref={ref}
      className={cx(styles.base, className, {
        [styles['is-full-width']]: fullWidth
      })}
      {...props}
    />
  )
);
