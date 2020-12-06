import styled from 'styled-components/macro';

export type CenteredRowProps = {
  stackVertically?: boolean;
};

export const CenteredRow = styled.div<CenteredRowProps>`
  display: flex;
  flex-direction: ${({ stackVertically }) =>
    stackVertically ? 'column' : 'row'};
  justify-content: ${({ stackVertically }) =>
    stackVertically ? 'flex-start' : 'center'};
  align-items: ${({ stackVertically }) =>
    stackVertically ? 'center' : 'flex-start'};
  margin-bottom: var(--spacing-lg);
  & > * {
    margin-right: ${({ stackVertically }) =>
      stackVertically ? 0 : `var(--gutter-grid)`};
    margin-bottom: ${({ stackVertically }) =>
      stackVertically ? `var(--spacing-md)` : 0};
    &:last-child {
      margin-right: 0;
    }
  }
`;
