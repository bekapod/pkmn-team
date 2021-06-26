import { Meta, Story } from '@storybook/react/types-6-0';
import { ComponentProps } from 'react';
import { TypeTag } from './TypeTag';

export default {
  title: 'Components/Type Tag',
  component: TypeTag,
  args: {
    typeSlug: 'electric'
  }
} as Meta<ComponentProps<typeof TypeTag>>;

export const typeTag: Story<ComponentProps<typeof TypeTag>> = args => (
  <TypeTag {...args}>Type name</TypeTag>
);
