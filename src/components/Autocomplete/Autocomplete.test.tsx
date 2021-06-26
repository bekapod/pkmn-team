import { render, screen } from '@testing-library/react';
import { composeStory } from '@storybook/testing-react';
import Meta, { autocomplete } from './Autocomplete.stories';

const Autocomplete = composeStory(autocomplete, Meta);

describe('Autocomplete', () => {
  it("renders it's children", () => {
    render(<Autocomplete />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('adds additional class names', () => {
    render(<Autocomplete className="some-custom-class" />);
    expect(screen.getByTestId('parent')).toHaveClass('some-custom-class');
  });
});
