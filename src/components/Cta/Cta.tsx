import type {
  ComponentPropsWithRef,
  ComponentType,
  ElementType,
  FunctionComponent
} from 'react';
import cx from 'classnames';
import styles from './Cta.module.css';

export type CtaProps = {
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'small' | 'tiny';
};

const CtaBase: FunctionComponent<
  ComponentPropsWithRef<ElementType> &
    CtaProps & { as?: ComponentType | ElementType }
> = ({
  as: As = 'button',
  variant = 'secondary',
  size = 'default',
  className,
  ...props
}) => (
  <As
    className={cx(styles.base, className, {
      [styles['is-primary']]: variant === 'primary',
      [styles['is-small']]: size === 'small',
      [styles['is-tiny']]: size === 'tiny'
    })}
    {...props}
  />
);

export const CtaInternalLink: FunctionComponent<
  ComponentPropsWithRef<'a'> & CtaProps
> = props => <CtaBase as="a" {...props} />;

export const CtaButton: FunctionComponent<
  ComponentPropsWithRef<'button'> & CtaProps
> = props => <CtaBase {...props} />;
