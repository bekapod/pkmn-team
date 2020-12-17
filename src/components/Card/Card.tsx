import {
  ComponentPropsWithRef,
  ComponentType,
  ElementType,
  FunctionComponent
} from 'react';
import cx from 'classnames';
import { Types } from '~/generated/graphql';
import { getTypeGradient } from '~/lib/gradients';

export const CardLink: FunctionComponent<
  ComponentPropsWithRef<'a'> & { as?: ComponentType | ElementType }
> = ({ as: As = 'a', className, ...props }) => (
  <As
    className={cx(
      'block',
      'transition-transform',
      'duration-300',
      'ease-out',
      'text-initial',
      'no-underline',
      'transform',
      'hover:scale-105',
      'focus:scale-105',
      className
    )}
    {...props}
  />
);

export const CardWrapper: FunctionComponent<
  ComponentPropsWithRef<'article'>
> = ({ className, ...props }) => (
  <article className={cx('flex', 'flex-col', 'h-full', className)} {...props} />
);

type CardHeaderProps = ComponentPropsWithRef<'header'> & {
  types: Pick<Types, 'name' | 'slug'>[];
};
export const CardHeader: FunctionComponent<CardHeaderProps> = ({
  types,
  className,
  ...props
}) => (
  <header
    className={cx(
      'overflow-hidden',
      '-mb-12',
      'px-4',
      'pb-8',
      'text-white',
      'rounded-tl-xl',
      'text-shadow-fancy',
      className
    )}
    style={{
      backgroundImage: getTypeGradient(types)
    }}
    {...props}
  />
);

export const CardHeading: FunctionComponent<ComponentPropsWithRef<'h2'>> = ({
  className,
  ...props
}) => (
  <h2
    className={cx(
      'overflow-hidden',
      'my-4',
      'text-xl',
      'text-center',
      'text-ellipsis',
      'font-bold',
      'whitespace-nowrap',
      className
    )}
    {...props}
  />
);

export const CardContent: FunctionComponent<ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => (
  <div
    className={cx(
      'flex',
      'flex-col',
      'flex-auto',
      'mx-2',
      'mt-4',
      'px-2',
      'bg-white',
      'rounded-br-xl',
      'zig-zag-top-white',
      className
    )}
    {...props}
  />
);
