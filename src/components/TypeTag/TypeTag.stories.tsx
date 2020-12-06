import { Meta } from '@storybook/react/types-6-0';
import { TypeTag, TypeTagProps } from './TypeTag';

export default {
  title: 'Components/TypeTag',
  component: TypeTag,
  args: {
    type: 'electric'
  }
} as Meta<TypeTagProps>;

export const Standard = (args: TypeTagProps): JSX.Element => (
  <TypeTag {...args}>Type name</TypeTag>
);
