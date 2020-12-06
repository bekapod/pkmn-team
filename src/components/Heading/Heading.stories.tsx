import { Meta } from '@storybook/react/types-6-0';
import { Heading } from './Heading';

export default {
  title: 'Components/Heading',
  component: Heading
} as Meta;

export const Standard = (): JSX.Element => (
  <Heading>Cupcake ipsum dolor sit amet</Heading>
);
