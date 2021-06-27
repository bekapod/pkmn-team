import { Meta, Story } from '@storybook/react/types-6-0';
import { ComponentProps } from 'react';
import { CardMeta } from './CardMeta';

export default {
  title: 'Components/Card Meta',
  component: CardMeta,
  args: {
    items: [
      { label: 'Item 1', value: 'Value 1' },
      { label: 'Item 2', value: 2 }
    ]
  }
} as Meta<ComponentProps<typeof CardMeta>>;

export const cardMeta: Story<ComponentProps<typeof CardMeta>> = args => (
  <CardMeta {...args} />
);
