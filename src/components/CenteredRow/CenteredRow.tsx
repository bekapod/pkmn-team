import type {
  ComponentPropsWithRef,
  ElementType,
  FunctionComponent
} from 'react';
import cx from 'classnames';
import styles from './CenteredRow.module.css';

export type CenteredRowProps = ComponentPropsWithRef<ElementType> & {
  stackVertically?: boolean;
  as?: ElementType;
};

export const CenteredRow: FunctionComponent<CenteredRowProps> = ({
  className,
  stackVertically,
  as: As = 'div',
  ...props
}) => (
  <As
    className={cx(styles.container, className, {
      [styles['is-vertical']]: stackVertically
    })}
    {...props}
  />
);
