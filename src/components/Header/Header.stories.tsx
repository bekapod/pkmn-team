import { Meta } from '@storybook/react/types-6-0';
import { Header, HeaderProps } from './Header';

export default {
  title: 'Components/Header',
  component: Header,
  args: {
    title: 'Cupcake ipsum dolor sit amet'
  }
} as Meta<HeaderProps>;

export const Standard = (args: HeaderProps): JSX.Element => (
  <Header {...args} />
);
