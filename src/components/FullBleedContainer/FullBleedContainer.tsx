import styled from 'styled-components/macro';
import { media } from '~/lib/media';

export const FullBleedContainer = styled.div`
  margin-right: calc(var(--gutter-page) * -1);
  margin-left: calc(var(--gutter-page) * -1);

  ${media.medium`
    margin-right: calc(var(--gutter-page-md) * -1);
    margin-left: calc(var(--gutter-page-md) * -1);
  `}
`;
