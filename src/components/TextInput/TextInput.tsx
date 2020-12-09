import styled from 'styled-components/macro';

export type TextInputProps = {
  isInvalid?: boolean;
};

export const TextInput = styled.input<TextInputProps>`
  width: 300px;
  padding: 0 var(--spacing-sm);
  font-family: var(--font-base);
  font-size: var(--font-size-base);
  font-weight: 900;
  line-height: var(--spacing-lg);
  background-color: var(--color-white);
  box-shadow: ${({ isInvalid }) =>
    isInvalid ? `0 0 0 var(--spacing-xs) var(--color-error)` : 'none'};
  border: none;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 var(--spacing-xs) var(--color-secondary);
  }
  ::placeholder {
    color: var(--color-gray);
    text-transform: uppercase;
  }
`;
