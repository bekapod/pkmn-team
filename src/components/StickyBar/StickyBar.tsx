import type { FunctionComponent, ComponentPropsWithRef } from 'react';
import cx from 'classnames';

export const StickyBar: FunctionComponent<ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => <div className={cx('sticky-bar', className)} {...props} />;
