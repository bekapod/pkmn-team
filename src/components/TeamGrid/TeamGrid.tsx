import type {
  FunctionComponent,
  ComponentPropsWithRef,
  ElementType
} from 'react';
import cx from 'classnames';
import styles from './TeamGrid.module.css';

export const TeamGrid: FunctionComponent<
  ComponentPropsWithRef<ElementType> & { as?: ElementType }
> = ({ as: As = 'div', className, ...props }) => (
  <As className={cx(styles.container, className)} {...props} />
);
