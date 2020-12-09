import { Meta } from '@storybook/react/types-6-0';
import { Label } from './Label';

export default {
  title: 'Components/Label',
  component: Label
} as Meta;

export const Standard = (): JSX.Element => (
  <Label>Cupcake ipsum dolor sit amet</Label>
);
