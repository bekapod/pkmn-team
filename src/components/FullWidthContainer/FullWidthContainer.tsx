import styled from 'styled-components/macro';
import { media } from '~/lib/media';

export const FullWidthContainer = styled.div`
  margin-left: var(--gutter-page);
  margin-right: var(--gutter-page);

  ${media.medium`
    margin-left: var(--gutter-page-md);
    margin-right: var(--gutter-page-md);
  `}
`;
