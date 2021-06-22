import { Meta, Story } from '@storybook/react/types-6-0';
import { CardMeta, CardMetaProps } from './CardMeta';

export default {
  title: 'Components/Card Meta',
  component: CardMeta,
  args: {
    id: '1',
    items: [
      { label: 'Item 1', value: 'Value 1' },
      { label: 'Item 2', value: 2 }
    ]
  }
} as Meta<CardMetaProps>;

export const cardMeta: Story<CardMetaProps> = args => <CardMeta {...args} />;
