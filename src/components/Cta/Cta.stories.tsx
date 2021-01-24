import { Meta } from '@storybook/react/types-6-0';
import { BiHappyHeartEyes as Icon } from 'react-icons/bi';
import { CtaLink, CtaButton, CtaProps } from './Cta';

export default {
  title: 'Components/Cta',
  component: CtaButton
} as Meta<CtaProps>;

export const Link = (args: CtaProps): JSX.Element => (
  <CtaLink {...args}>Dashboard</CtaLink>
);
Link.args = { href: '#' };

export const Button = (args: CtaProps): JSX.Element => (
  <CtaButton {...args}>Create Team</CtaButton>
);
Button.args = { disabled: false };

export const WithIcon = (args: CtaProps): JSX.Element => (
  <CtaButton {...args}>Create Team</CtaButton>
);
WithIcon.args = { icon: Icon };

export const IsBusy = (args: CtaProps): JSX.Element => (
  <CtaButton {...args}>Create Team</CtaButton>
);
IsBusy.args = { 'aria-busy': true };
