import type {
  FunctionComponent,
  ComponentPropsWithRef,
  ElementType,
  ComponentType
} from 'react';
import cx from 'classnames';
import { getTypeColor } from '~/lib/general';
import styles from './TypeTag.module.css';

export type TypeTagProps = {
  type: string;
  as?: ComponentType | ElementType;
};

export const TypeTag: FunctionComponent<
  ComponentPropsWithRef<ElementType> & TypeTagProps
> = ({ as: As = 'span', className, type, ...props }) => (
  <As
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    style={{ '--type-color': getTypeColor(type) }}
    className={cx(styles.base, className)}
    {...props}
  />
);
