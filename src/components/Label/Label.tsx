import type {
  FunctionComponent,
  ComponentPropsWithRef,
  ElementType
} from 'react';
import cx from 'classnames';

export type LabelProps = ComponentPropsWithRef<ElementType> & {
  as?: ElementType;
};

export const Label: FunctionComponent<LabelProps> = ({
  className,
  as: As = 'span',
  ...props
}) => (
  <As
    className={cx(
      'text-indigo-400',
      'text-sm',
      'font-black',
      'uppercase',
      className
    )}
    {...props}
  />
);
