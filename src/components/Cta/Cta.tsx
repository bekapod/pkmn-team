import type { FunctionComponent } from 'react';
import { always, cond, T } from 'lodash/fp';
import styled, { css } from 'styled-components/macro';
import { radialIn } from '~lib/animations';
import { media } from '~lib/media';

export type CtaProps = {
  secondary?: boolean;
  small?: boolean;
};

const not = (value: unknown): boolean => !value;

const styles = css`
  display: block;
  width: 100%;
  padding: ${({ small }: CtaProps): string =>
    cond([
      [not, always(`var(--spacing-md) var(--spacing-lg)`)],
      [T, always(`var(--spacing-xs) var(--spacing-md)`)]
    ])(small)};
  color: var(--color-white);
  font-family: var(--font-base);
  font-size: ${({ small }: CtaProps): string =>
    cond([
      [not, always(`var(--font-size-md)`)],
      [T, always(`var(--font-size-sm)`)]
    ])(small)};
  font-weight: 900;
  line-height: var(--spacing-md);
  text-decoration: none;
  text-transform: uppercase;
  background-color: ${({ secondary }: CtaProps): string =>
    cond([
      [not, always(`var(--color-primary-dark)`)],
      [T, always(`var(--color-secondary-dark)`)]
    ])(secondary)};
  border: none;
  border-radius: var(--border-radius) 0;
  ${radialIn};
  &::before {
    background-color: ${({ secondary }: CtaProps): string =>
      cond([
        [not, always(`var(--color-primary)`)],
        [T, always(`var(--color-secondary)`)]
      ])(secondary)};
  }
  &[disabled] {
    &,
    &::before {
      background-color: var(--color-gray);
    }
  }
  ${media.medium`
    width: auto;
  `}
`;

export const CtaInternalLink: FunctionComponent<CtaProps> = styled.a`
  ${styles};
`;

export const CtaButton: FunctionComponent<CtaProps> = styled.button`
  ${styles};
`;
