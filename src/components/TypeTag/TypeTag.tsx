import type {
  FunctionComponent,
  ComponentPropsWithRef,
  ElementType,
  ComponentType
} from 'react';
import classNames from 'classnames';
import { getTypeColor } from '~/lib/general';

export type TypeTagProps = {
  typeSlug: string;
  as?: ComponentType | ElementType;
};

export const TypeTag: FunctionComponent<
  ComponentPropsWithRef<ElementType> & TypeTagProps
> = ({ as: As = 'span', className, typeSlug, ...props }) => (
  <As
    style={{ '--type-color': getTypeColor(typeSlug) }}
    className={classNames('type-tag', className)}
    {...props}
  />
);
