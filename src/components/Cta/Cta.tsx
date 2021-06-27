import {
  ComponentPropsWithRef,
  ComponentType,
  ElementType,
  forwardRef,
  FunctionComponent
} from 'react';
import type { IconType } from 'react-icons';
import classNames from 'classnames';
import { LoadingIcon } from '../LoadingIcon';

export type CtaProps = {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  size?: 'default' | 'small' | 'tiny';
  icon?: IconType;
};

const CtaBase: FunctionComponent<
  ComponentPropsWithRef<ElementType> &
    CtaProps & { as?: ComponentType | ElementType }
  // eslint-disable-next-line react/display-name
> = forwardRef(
  (
    {
      as: As = 'button',
      variant = 'secondary',
      size = 'default',
      icon: Icon,
      className,
      children,
      ...props
    },
    ref
  ) => (
    <As
      ref={ref}
      className={classNames(
        'group',
        'relative',
        'inline-flex',
        'items-center',
        'w-auto',
        'overflow-hidden',
        'text-white',
        'font-sans',
        'text-center',
        'no-underline',
        'uppercase',
        'border-none',
        'rounded-tl-lg',
        'rounded-br-lg',
        'shadow',
        'perspective',
        'transition-colors',
        'duration-300',
        'ease-out',
        'disabled:bg-cool-grey-300',
        className,
        {
          'bg-pink-vivid-500': variant === 'primary',
          'bg-cyan-vivid-700': variant === 'secondary',
          'bg-indigo-900': variant === 'tertiary',
          'bg-red-vivid-700': variant === 'destructive',
          'min-h-8 px-6 text-lg font-black': size === 'default',
          'min-h-6 px-5 text-base font-black': size === 'small',
          'min-h-5 px-3 text-sm font-bold': size === 'tiny'
        }
      )}
      disabled={props['aria-busy']}
      {...props}
    >
      <span
        className={classNames(
          'block',
          'absolute',
          '-z-1',
          'top-0',
          'left-0',
          'right-0',
          'bottom-0',
          'rounded-full',
          'scale-200',
          'transform-gpu',
          'transition-transform',
          'duration-300',
          'ease-out',
          'group-hover:scale-0 group-focus:scale-0 group-active:scale-0',
          {
            'bg-pink-vivid-400': variant === 'primary',
            'bg-cyan-vivid-600': variant === 'secondary',
            'bg-indigo-700': variant === 'tertiary',
            'bg-red-vivid-500': variant === 'destructive'
          }
        )}
      />
      {props['aria-busy'] ? (
        <LoadingIcon
          role="alert"
          aria-label="Loading"
          isSpinner
          isSmall
          className="spinner-white"
        />
      ) : (
        <>
          {Icon && (
            <Icon
              role="presentation"
              className={classNames({
                '-ml-2 mr-3': size === 'default' || size === 'small',
                'mr-2': size === 'tiny'
              })}
            />
          )}
          {children}
        </>
      )}
    </As>
  )
);

export const CtaLink: FunctionComponent<ComponentPropsWithRef<'a'> & CtaProps> =
  // eslint-disable-next-line react/display-name
  forwardRef((props, ref) => <CtaBase ref={ref} as="a" {...props} />);

export const CtaButton: FunctionComponent<
  ComponentPropsWithRef<'button'> & CtaProps
  // eslint-disable-next-line react/display-name
> = forwardRef((props, ref) => <CtaBase ref={ref} {...props} />);
