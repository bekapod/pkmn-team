import type {
  ComponentPropsWithoutRef,
  ElementType,
  FunctionComponent,
  ReactNode
} from 'react';
import cx from 'classnames';
import { Label } from '../Label';
import { ErrorMessage } from '../ErrorMessage';
import styles from './FormField.module.css';

export type FormFieldProps = ComponentPropsWithoutRef<ElementType> & {
  label: ReactNode;
  id: string;
  error?: ReactNode;
};

export const FormField: FunctionComponent<FormFieldProps> = ({
  className,
  id,
  label,
  error,
  children,
  ...props
}) => (
  <div className={cx(styles.container, className)} {...props}>
    <Label as="label" htmlFor={id} className={styles.label}>
      {label}
    </Label>
    {children}
    {!!error && <ErrorMessage className={styles.message}>{error}</ErrorMessage>}
  </div>
);
