import { FunctionComponent } from 'react';
import styled from 'styled-components/macro';
import { pulseFade, spin } from '~/lib/animations';

export type LoadingIconProps = {
  spinner?: boolean;
  small?: boolean;
};

const Styled = styled.div`
  animation: ${pulseFade} 2s linear infinite;
  margin: var(--spacing-xl) 0;
  color: var(--color-gray-dark);
  font-family: var(--font-base);
  font-size: var(--font-size-md);
  font-weight: 700;
  letter-spacing: var(--spacing--xxs);
  line-height: var(--spacing-md);
  text-align: center;
  text-transform: uppercase;
`;

const StyledSpinner = styled.div<LoadingIconProps>`
  position: relative;
  border: ${({ small }) =>
    `${small ? '5px' : '10px'} solid var(--color-secondary-transparent)`};
  border-left: ${({ small }) =>
    `${small ? '5px' : '10px'} solid var(--color-secondary)`};
  transform: translateZ(0);
  animation: ${spin} 1s linear infinite;
  &,
  &:after {
    width: ${({ small }) =>
      small ? 'var(--spacing-lg)' : 'var(--spacing-xl)'};
    height: ${({ small }) =>
      small ? 'var(--spacing-lg)' : 'var(--spacing-xl)'};
    border-radius: 50%;
  }
`;

const loadingText = 'Loading';

export const LoadingIcon: FunctionComponent<LoadingIconProps> = ({
  spinner,
  ...props
}) =>
  spinner ? (
    <StyledSpinner
      data-testid="loading-spinner"
      role="img"
      aria-label={loadingText}
      {...props}
    />
  ) : (
    <Styled>{loadingText}</Styled>
  );
