import { Meta, Story } from '@storybook/react/types-6-0';
import { Autocomplete, AutocompleteDropdown } from './Autocomplete';

export default {
  title: 'Components/Autocomplete',
  component: Autocomplete
} as Meta;

export const autocomplete: Story = () => (
  <Autocomplete>
    <AutocompleteDropdown>
      <div>Item 1</div>
      <div>Item 2</div>
    </AutocompleteDropdown>
  </Autocomplete>
);
