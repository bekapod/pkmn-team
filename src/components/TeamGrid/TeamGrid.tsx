import type {
  FunctionComponent,
  ComponentPropsWithRef,
  ElementType
} from 'react';
import classNames from 'classnames';

export const TeamGrid: FunctionComponent<
  ComponentPropsWithRef<ElementType> & { as?: ElementType }
> = ({ as: As = 'div', className, ...props }) => (
  <As
    className={classNames(
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
