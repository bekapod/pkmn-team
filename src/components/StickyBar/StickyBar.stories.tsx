import { Meta } from '@storybook/react/types-6-0';
import { FullWidthContainer } from '../FullWidthContainer';
import { StickyBar } from './StickyBar';

export default {
  title: 'Components/StickyBar',
  component: StickyBar
} as Meta;

export const Standard = (): JSX.Element => (
  <FullWidthContainer>
    <StickyBar />
  </FullWidthContainer>
);
