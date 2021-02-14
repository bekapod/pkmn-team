import type { FunctionComponent, ComponentPropsWithRef } from 'react';
import classNames from 'classnames';

export const InlineList: FunctionComponent<ComponentPropsWithRef<'ul'>> = ({
  className,
  ...props
}) => (
  <ul
    className={classNames(
      'flex',
      'flex-wrap',
      'children:not-last:mr-3',
      className
    )}
    {...props}
  />
);
