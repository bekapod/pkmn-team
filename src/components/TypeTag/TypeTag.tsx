import type {
  FunctionComponent,
  ComponentPropsWithRef,
  ElementType,
  ComponentType
} from 'react';
import cx from 'classnames';
import { getTypeColor } from '~/lib/general';

export type TypeTagProps = {
  type: string;
  as?: ComponentType | ElementType;
};

export const TypeTag: FunctionComponent<
  ComponentPropsWithRef<ElementType> & TypeTagProps
> = ({ as: As = 'span', className, type, ...props }) => (
  <As
    style={{ '--type-color': getTypeColor(type) }}
    className={cx('type-tag', className)}
    {...props}
  />
);
