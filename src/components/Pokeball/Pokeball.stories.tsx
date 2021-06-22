import { Meta, Story } from '@storybook/react/types-6-0';
import { Pokeball, PokeballProps } from './Pokeball';

export default {
  title: 'Components/Pokeball',
  component: Pokeball
} as Meta<PokeballProps>;

export const pokeball: Story<PokeballProps> = args => (
  <Pokeball
    style={{ width: 'var(--spacing-10)', height: 'var(--spacing-10)' }}
    {...args}
  />
);
