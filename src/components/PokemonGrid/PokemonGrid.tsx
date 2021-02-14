import type { FunctionComponent, ComponentPropsWithRef } from 'react';
import classNames from 'classnames';

export const PokemonGrid: FunctionComponent<ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => (
  <div
    className={classNames(
      'grid',
      'gap-5',
      'grid-cols-1',
      'w-full',
      'md:grid-cols-md',
      className
    )}
    {...props}
  />
);
