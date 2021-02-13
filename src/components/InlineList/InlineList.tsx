import type { FunctionComponent, ComponentPropsWithRef } from 'react';
import cx from 'classnames';

export const InlineList: FunctionComponent<ComponentPropsWithRef<'ul'>> = ({
  className,
  ...props
}) => (
  <ul
    className={cx('flex', 'flex-wrap', 'children:not-last:mr-3', className)}
    {...props}
  />
);
