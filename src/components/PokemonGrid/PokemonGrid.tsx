import type { FunctionComponent, ComponentPropsWithRef } from 'react';
import cx from 'classnames';

export const PokemonGrid: FunctionComponent<ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => (
  <div
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
