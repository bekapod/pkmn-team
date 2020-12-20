import type {
  FunctionComponent,
  ComponentPropsWithRef,
  ElementType
} from 'react';
import cx from 'classnames';
import styles from './Label.module.css';

export type LabelProps = ComponentPropsWithRef<ElementType> & {
  as?: ElementType;
};

export const Label: FunctionComponent<LabelProps> = ({
  className,
  as: As = 'span',
  ...props
}) => <As className={cx(styles.base, className)} {...props} />;
