import { Meta, Story } from '@storybook/react/types-6-0';
import { ComponentProps } from 'react';
import { BiHappyHeartEyes as Icon } from 'react-icons/bi';
import { CtaLink, CtaButton, CtaProps } from './Cta';

export default {
  title: 'Components/Cta',
  component: CtaButton
} as Meta<CtaProps>;

export const Link: Story<ComponentProps<typeof CtaLink>> = args => (
  <CtaLink {...args}>Dashboard</CtaLink>
);
Link.args = { href: '#' };

export const Button: Story<ComponentProps<typeof CtaButton>> = args => (
  <CtaButton {...args}>Create Team</CtaButton>
);
Button.args = { disabled: false };

export const WithIcon: Story<ComponentProps<typeof CtaButton>> = args => (
  <CtaButton {...args}>Create Team</CtaButton>
);
WithIcon.args = { icon: Icon };

export const IsBusy: Story<ComponentProps<typeof CtaButton>> = args => (
  <CtaButton {...args}>Create Team</CtaButton>
);
IsBusy.args = { 'aria-busy': true };
