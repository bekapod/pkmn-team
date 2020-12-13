import type { ButtonHTMLAttributes } from 'react';
import { always, cond, equals, T } from 'lodash/fp';
import styled from 'styled-components/macro';
import { css } from 'styled-components';
import type { StyledComponent } from 'styled-components';
import { radialIn } from '~/lib/animations';
import { media } from '~/lib/media';

export type CtaProps = {
  secondary?: boolean;
  size?: 'default' | 'small' | 'tiny';
};

const not = (value: unknown): boolean => !value;

const styles = css`
  display: block;
  width: 100%;
  padding: ${({ size = 'default' }: CtaProps) =>
    cond([
      [equals('small'), always(`var(--spacing-sm) var(--spacing-md)`)],
      [equals('tiny'), always(`var(--spacing-xs) var(--spacing-sm)`)],
      [T, always(`var(--spacing-md) var(--spacing-lg)`)]
    ])(size)};
  color: var(--color-white);
  font-family: var(--font-base);
  font-size: ${({ size }: CtaProps) =>
    cond([
      [equals('small'), always(`var(--font-size-sm)`)],
      [equals('tiny'), always(`var(--font-size-xs)`)],
      [T, always(`var(--font-size-md)`)]
    ])(size)};
  font-weight: ${({ size = 'default' }: CtaProps) =>
    cond([
      [equals('tiny'), always(700)],
      [T, always(900)]
    ])(size)};
  line-height: ${({ size }: CtaProps) =>
    cond([
      [equals('small'), always(`var(--spacing-md)`)],
      [equals('tiny'), always(`var(--spacing-sm)`)],
      [T, always(`var(--spacing-md)`)]
    ])(size)};
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

export const CtaInternalLink: StyledComponent<'a', CtaProps> = styled.a`
  ${styles};
`;

export const CtaButton: StyledComponent<
  'button',
  Record<string, unknown>,
  CtaProps & ButtonHTMLAttributes<HTMLButtonElement>
> = styled.button`
  ${styles};
`;
