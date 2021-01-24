import { render } from '@testing-library/react';
import { Pokeball } from '.';

describe(Pokeball, () => {
  it('renders an svg', () => {
    const { getByLabelText } = render(<Pokeball aria-label="Pokeball" />);
    expect(getByLabelText('Pokeball')).toBeInTheDocument();
    expect(getByLabelText('Pokeball').tagName).toBe('svg');
  });
});
