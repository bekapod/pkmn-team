import { Meta, Story } from '@storybook/react/types-6-0';
import { ComponentProps } from 'react';
import { Pokeball } from './Pokeball';

export default {
  title: 'Components/Pokeball',
  component: Pokeball
} as Meta<ComponentProps<typeof Pokeball>>;

export const pokeball: Story<ComponentProps<typeof Pokeball>> = args => (
  <Pokeball
    style={{ width: 'var(--spacing-10)', height: 'var(--spacing-10)' }}
    {...args}
  />
);
