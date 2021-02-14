import type {
  FunctionComponent,
  ComponentPropsWithRef,
  ElementType
} from 'react';
import classNames from 'classnames';

export type LabelProps = ComponentPropsWithRef<ElementType> & {
  as?: ElementType;
};

export const Label: FunctionComponent<LabelProps> = ({
  className,
  as: As = 'span',
  ...props
}) => (
  <As
    className={classNames(
      'text-indigo-400',
      'text-sm',
      'font-black',
      'uppercase',
      className
    )}
    {...props}
  />
);
