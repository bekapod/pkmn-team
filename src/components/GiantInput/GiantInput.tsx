import styled from 'styled-components/macro';
import { TextInput, TextInputProps } from '../TextInput';
import { media } from '~/lib/media';

export type GiantInputProps = TextInputProps & {
  fullWidth?: boolean;
};

export const GiantInput = styled(TextInput)<GiantInputProps>`
  width: 100%;
  padding: 0 var(--spacing-md);
  height: var(--spacing-xl);
  font-size: var(--font-size-lg);
  text-align: center;
  ${({ fullWidth }) => (fullWidth ? '' : media.medium`max-width: 600px;`)}
`;
