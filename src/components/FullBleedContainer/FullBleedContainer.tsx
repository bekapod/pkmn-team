import type { FunctionComponent, ComponentPropsWithRef } from 'react';
import cx from 'classnames';

export const FullBleedContainer: FunctionComponent<
  ComponentPropsWithRef<'div'>
> = ({ className, ...props }) => (
  <div className={cx('-mx-4 md:-mx-6', className)} {...props} />
);
