import { FunctionComponent } from 'react';
import styled from 'styled-components/macro';

export type ErrorMessageProps = {
  isBig?: boolean;
  color?: string;
};

const StyledError = styled.div<ErrorMessageProps>`
  color: ${({ color }): string => color || 'var(--color-error)'};
  font-weight: 400;
  ${({ isBig }): string =>
    isBig
      ? `
    margin: var(--spacing-xl) 0;
    font-size: var(--font-size-md);
    line-height: var(--spacing-md);
    text-align: center;
  `
      : ''}

  &::before {
    content: '';
    width: 100%;
  }
`;

export const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({
  children,
  ...props
}) => (
  <StyledError role="alert" {...props}>
    {children}
  </StyledError>
);
