import type {
  ComponentPropsWithRef,
  ComponentType,
  ElementType,
  FunctionComponent
} from 'react';
import type { IconType } from 'react-icons';
import cx from 'classnames';
import styles from './Cta.module.css';

export type CtaProps = {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  size?: 'default' | 'small' | 'tiny';
  icon?: IconType;
};

const CtaBase: FunctionComponent<
  ComponentPropsWithRef<ElementType> &
    CtaProps & { as?: ComponentType | ElementType }
> = ({
  as: As = 'button',
  variant = 'secondary',
  size = 'default',
  icon: Icon,
  className,
  children,
  ...props
}) => (
  <As
    className={cx(styles.base, className, {
      [styles['is-primary']]: variant === 'primary',
      [styles['is-tertiary']]: variant === 'tertiary',
      [styles['is-destructive']]: variant === 'destructive',
      [styles['is-small']]: size === 'small',
      [styles['is-tiny']]: size === 'tiny'
    })}
    {...props}
  >
    {Icon && <Icon role="presentation" className={styles.icon} />}
    {children}
  </As>
);

export const CtaInternalLink: FunctionComponent<
  ComponentPropsWithRef<'a'> & CtaProps
> = props => <CtaBase as="a" {...props} />;

export const CtaButton: FunctionComponent<
  ComponentPropsWithRef<'button'> & CtaProps
> = props => <CtaBase {...props} />;
