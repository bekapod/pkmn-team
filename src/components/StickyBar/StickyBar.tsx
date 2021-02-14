import type { FunctionComponent, ComponentPropsWithRef } from 'react';
import classNames from 'classnames';

export const StickyBar: FunctionComponent<ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => <div className={classNames('sticky-bar', className)} {...props} />;
