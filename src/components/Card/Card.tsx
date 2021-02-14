import { ComponentPropsWithRef, forwardRef, FunctionComponent } from 'react';
import classNames from 'classnames';
import { Types } from '~/generated/graphql';
import { getTypeGradient } from '~/lib/gradients';

export const CardLink: FunctionComponent<
  ComponentPropsWithRef<'a'>
> = forwardRef(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={classNames(
      'block',
      'transition-transform',
      'duration-300',
      'ease-out',
      'text-initial',
      'no-underline',
      'scale-100',
      'transform-gpu',
      'motion-safe:hover:scale-105 motion-safe:focus:scale-105',
      className
    )}
    {...props}
  />
));

export const CardWrapper: FunctionComponent<
  ComponentPropsWithRef<'article'>
> = ({ className, ...props }) => (
  <article
    className={classNames('flex', 'flex-col', 'h-full', className)}
    {...props}
  />
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
    className={classNames(
      'overflow-hidden',
      '-mb-5',
      'px-4',
      'pb-5',
      'text-white',
      'rounded-tl-xl',
      'shadow-text',
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
    className={classNames(
      'overflow-hidden',
      'my-4',
      'text-xl',
      'font-bold',
      'text-center',
      'overflow-ellipsis',
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
    className={classNames(
      'flex',
      'flex-col',
      'flex-grow',
      'flex-shrink',
      'mx-3',
      'mt-3',
      'px-3',
      'bg-white',
      'rounded-br-xl',
      'zig-zag-top-white',
      className
    )}
    {...props}
  />
);
