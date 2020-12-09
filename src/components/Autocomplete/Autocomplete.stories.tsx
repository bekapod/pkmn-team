import { Meta } from '@storybook/react/types-6-0';
import { Autocomplete, AutocompleteDropdown } from './Autocomplete';

export default {
  title: 'Components/Autocomplete',
  component: Autocomplete
} as Meta;

export const Standard = (): JSX.Element => (
  <Autocomplete>
    <AutocompleteDropdown>
      <div>Item 1</div>
      <div>Item 2</div>
    </AutocompleteDropdown>
  </Autocomplete>
);
