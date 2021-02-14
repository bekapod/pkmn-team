import type { FunctionComponent, ComponentPropsWithRef } from 'react';
import classNames from 'classnames';

export const FullWidthContainer: FunctionComponent<
  ComponentPropsWithRef<'div'>
> = ({ className, ...props }) => (
  <div className={classNames('mx-4', 'md:mx-6', className)} {...props} />
);
