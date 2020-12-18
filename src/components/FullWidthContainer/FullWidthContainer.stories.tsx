import { FullBleedContainer } from '../FullBleedContainer';
import { FullWidthContainer } from './FullWidthContainer';

export default {
  title: 'Components/FullWidthContainer',
  component: FullWidthContainer
};

export const Standard = (): JSX.Element => (
  <FullBleedContainer>
    <FullWidthContainer>A section of content</FullWidthContainer>
  </FullBleedContainer>
);
