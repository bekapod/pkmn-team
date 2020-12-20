import { ComponentPropsWithRef, forwardRef, FunctionComponent } from 'react';
import cx from 'classnames';
import { Types } from '~/generated/graphql';
import { getTypeGradient } from '~/lib/gradients';
import styles from './Card.module.css';

export const CardLink: FunctionComponent<
  ComponentPropsWithRef<'a'>
> = forwardRef(({ className, ...props }, ref) => (
  <a ref={ref} className={cx(styles.link, className)} {...props} />
));

export const CardWrapper: FunctionComponent<
  ComponentPropsWithRef<'article'>
> = ({ className, ...props }) => (
  <article className={cx(styles.wrapper, className)} {...props} />
);

export type CardHeaderProps = ComponentPropsWithRef<'header'> & {
  types?: Pick<Types, 'name' | 'slug'>[];
};
export const CardHeader: FunctionComponent<CardHeaderProps> = ({
  types = [],
  className,
  ...props
}) => (
  <header
    className={cx(styles.header, className)}
    style={{
      backgroundImage: getTypeGradient(types)
    }}
    {...props}
  />
);

export const CardHeading: FunctionComponent<ComponentPropsWithRef<'h2'>> = ({
  className,
  ...props
}) => <h2 className={cx(styles.heading, className)} {...props} />;

export const CardContent: FunctionComponent<ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => (
  <div
    className={cx(styles.content, 'u-zig-zag-top-white', className)}
    {...props}
  />
);
