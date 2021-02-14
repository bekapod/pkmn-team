import { render, screen } from '@testing-library/react';
import { Pokeball } from '.';

describe(Pokeball, () => {
  it('renders an svg', () => {
    render(<Pokeball aria-label="Pokeball" />);
    expect(screen.getByLabelText('Pokeball')).toBeInTheDocument();
    expect(screen.getByLabelText('Pokeball').tagName).toBe('svg');
  });
});
