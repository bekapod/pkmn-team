import type { FunctionComponent, ComponentPropsWithRef } from 'react';
import cx from 'classnames';
import styles from './PokemonGrid.module.css';

export const PokemonGrid: FunctionComponent<ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => <div className={cx(styles.container, className)} {...props} />;
