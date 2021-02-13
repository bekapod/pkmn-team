import type {
  FunctionComponent,
  ComponentPropsWithRef,
  ReactNode
} from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { Pokeball } from '../Pokeball';

export type HeaderProps = ComponentPropsWithRef<'header'> & {
  title: ReactNode;
};

export const Header: FunctionComponent<HeaderProps> = ({
  className,
  title,
  ...props
}) => (
  <header
    className={cx(
      'flex',
      'items-center',
      'mb-5',
      'py-3',
      'px-4',
      'bg-indigo-700',
      'md:py-3',
      'md:px-6',
      className
    )}
    {...props}
  >
    <Link href="/">
      <a
        title="Dashboard"
        className={cx(
          'block',
          'mr-4',
          'transition-transform',
          'duration-300',
          'ease-out',
          'transform-gpu',
          'scale-100',
          'hover:scale-110',
          'focus:scale-110'
        )}
      >
        <Pokeball role="presentation" className={cx('block', 'w-8', 'h-8')} />
      </a>
    </Link>
    <h1 className={cx('m-0', 'text-xl', 'font-black', 'text-white')}>
      {title}
    </h1>
  </header>
);
