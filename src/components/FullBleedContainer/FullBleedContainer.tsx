import type { FunctionComponent, ComponentPropsWithRef } from 'react';
import classNames from 'classnames';

export const FullBleedContainer: FunctionComponent<
  ComponentPropsWithRef<'div'>
> = ({ className, ...props }) => (
  <div className={classNames('-mx-4 md:-mx-6', className)} {...props} />
);
