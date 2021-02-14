import { render, screen } from '@testing-library/react';
import { Autocomplete, AutocompleteDropdown } from '.';

describe(Autocomplete, () => {
  it("renders it's children", () => {
    render(<Autocomplete>hello</Autocomplete>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('adds additional class names', () => {
    render(<Autocomplete className="some-custom-class">hello</Autocomplete>);
    expect(screen.getByText('hello')).toHaveClass('some-custom-class');
  });
});

describe(AutocompleteDropdown, () => {
  it("renders it's children", () => {
    render(<AutocompleteDropdown>hello</AutocompleteDropdown>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('adds additional class names', () => {
    render(
      <AutocompleteDropdown className="some-custom-class">
        hello
      </AutocompleteDropdown>
    );
    expect(screen.getByText('hello')).toHaveClass('some-custom-class');
  });
});
