import { Meta } from '@storybook/react/types-6-0';
import { CtaInternalLink, CtaButton, CtaProps } from './Cta';

export default {
  title: 'Components/Cta',
  component: CtaButton
} as Meta<CtaProps>;

export const Link = (args: CtaProps): JSX.Element => (
  <CtaInternalLink {...args}>Dashboard</CtaInternalLink>
);
Link.args = { href: '#' };

export const Button = (args: CtaProps): JSX.Element => (
  <CtaButton {...args}>Create Team</CtaButton>
);
Button.args = { disabled: false };
