import styled from 'styled-components/macro';
import { media } from '~/lib/media';

export const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md) var(--gutter-page);
  color: var(--color-white);
  background-color: var(--color-secondary);

  ${media.medium`
    padding: var(--spacing-md) var(--gutter-page-md);
  `}
`;
