import type { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import cx from 'classnames';
import styles from './Pokeball.module.css';

export type PokeballProps = ComponentPropsWithoutRef<'svg'>;

export const Pokeball: FunctionComponent<PokeballProps> = ({
  className,
  ...props
}) => (
  <svg viewBox="0 0 112 112" version="1.1" {...props}>
    <g
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      transform="translate(2, 2)"
    >
      <path
        d="M104.877223,58.5 C104.245504,71.5712394 98.6868178,83.3496856 90.0182517,92.0182517 C80.8003772,101.236126 68.0660022,106.9375 54,106.9375 C39.9339978,106.9375 27.1996228,101.236126 17.9817483,92.0182517 C9.31318224,83.3496856 3.75449623,71.5712394 3.12277719,58.5 L3.12277719,58.5 Z"
        className={cx(styles.outline, styles.bottom)}
        fillRule="nonzero"
      ></path>
      <path
        d="M0.5625,54 C0.5625,24.4872837 24.4872837,0.5625 54,0.5625 C83.5127163,0.5625 107.4375,24.4872837 107.4375,54 L0.5625,54 Z"
        className={cx(styles.outline, styles.top)}
        strokeLinejoin="round"
      ></path>
      <circle
        className={cx(styles.outline, styles.bottom)}
        fillRule="nonzero"
        cx="54.5"
        cy="54.5"
        r="17.5"
      ></circle>
      <path
        d="M40.3466328,5 C38.0874276,6.6820113 35.9990109,8.58061366 34.1121228,10.665067 C33.0598159,11.8275549 32.0701891,13.0478467 31.1485743,14.3206104 C29.1814369,17.0372563 27.524153,19.992957 26.2285728,23.1358622 C25.6097447,24.6370566 25.0734376,26.1809609 24.6253016,27.7619248 C23.9941291,29.9886175 23.537862,32.2888254 23.2722866,34.6467622 C23.0923975,36.2439247 23,37.8675739 23,39.5128037"
        id="highlight"
      ></path>
      <use
        className={styles.highlight}
        strokeLinecap="round"
        transform="translate(31.673316, 22.256402) rotate(27.000000) translate(-31.673316, -22.256402) "
        xlinkHref="#highlight"
      ></use>
      <circle
        className={styles['highlight-blob']}
        cx="12"
        cy="41"
        r="2"
      ></circle>
      <circle className={styles.centre} cx="54.5" cy="54.5" r="9.5"></circle>
    </g>
  </svg>
);
