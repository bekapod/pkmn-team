import type {
  ComponentPropsWithoutRef,
  ElementType,
  FunctionComponent,
  ReactNode
} from 'react';
import classNames from 'classnames';
import { Label } from '../Label';
import { ErrorMessage } from '../ErrorMessage';

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
  <div
    className={classNames('flex', 'flex-col', 'w-full', className)}
    {...props}
  >
    <Label as="label" htmlFor={id} className="mb-1">
      {label}
    </Label>
    {children}
    {!!error && <ErrorMessage className="mt-2">{error}</ErrorMessage>}
  </div>
);
