import styled from 'styled-components/macro';
import { getTypeColor } from '~/lib/general';

export type TypeTagProps = {
  type: string;
};

export const TypeTag = styled.span<TypeTagProps>`
  display: inline-block;
  padding: 0 var(--spacing-xs);
  color: var(--color-white);
  font-size: var(--font-size-xs);
  font-weight: 700;
  line-height: var(--spacing-md);
  text-shadow: 0 1px 0px var(--color-gray-darker),
    1px 0 0px var(--color-gray-dark);
  text-transform: uppercase;
  background-color: ${({ type }) => getTypeColor(type)};
  border-radius: var(--border-radius-sm) 0;
`;
