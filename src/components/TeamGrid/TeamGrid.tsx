import type {
  FunctionComponent,
  ComponentPropsWithRef,
  ElementType
} from 'react';
import cx from 'classnames';

export const TeamGrid: FunctionComponent<
  ComponentPropsWithRef<ElementType> & { as?: ElementType }
> = ({ as: As = 'div', className, ...props }) => (
  <As
    className={cx(
      'grid',
      'gap-5',
      'grid-cols-1',
      'w-full',
      'md:auto-cols-min',
      className
    )}
    {...props}
  />
);
