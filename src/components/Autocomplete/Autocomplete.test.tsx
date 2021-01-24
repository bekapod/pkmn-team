import { render } from '@testing-library/react';
import { Autocomplete, AutocompleteDropdown } from '.';

describe(Autocomplete, () => {
  it("renders it's children", () => {
    const { getByText } = render(<Autocomplete>hello</Autocomplete>);
    expect(getByText('hello')).toBeInTheDocument();
  });

  it('adds additional class names', () => {
    const { getByText } = render(
      <Autocomplete className="some-custom-class">hello</Autocomplete>
    );
    expect(getByText('hello')).toHaveClass('some-custom-class');
  });
});

describe(AutocompleteDropdown, () => {
  it("renders it's children", () => {
    const { getByText } = render(
      <AutocompleteDropdown>hello</AutocompleteDropdown>
    );
    expect(getByText('hello')).toBeInTheDocument();
  });

  it('adds additional class names', () => {
    const { getByText } = render(
      <AutocompleteDropdown className="some-custom-class">
        hello
      </AutocompleteDropdown>
    );
    expect(getByText('hello')).toHaveClass('some-custom-class');
  });
});
