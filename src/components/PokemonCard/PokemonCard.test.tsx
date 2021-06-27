import { render, screen } from '@testing-library/react';
import { pikachu } from '~/mocks/Pokemon';
import { setupResizeObserverMock } from '~/test-helpers';
import { composeStory } from '@storybook/testing-react';
import Meta, { pokemonCard, withActions } from './PokemonCard.stories';

const PokemonCard = composeStory(pokemonCard, Meta);
const PokemonCardWithActions = composeStory(withActions, Meta);

describe('PokemonCard', () => {
  beforeAll(() => {
    setupResizeObserverMock([]);
  });

  it('renders information about the pokemon', () => {
    render(<PokemonCard />);
    expect(
      screen.getByText(`#${pikachu.pokedexId} ${pikachu.name}`)
    ).toBeInTheDocument();
    expect(screen.getByAltText(`${pikachu.name} sprite`)).toHaveAttribute(
      'src',
      `/sprites/${pikachu.sprite}`
    );
    expect(
      screen.getByText(pikachu.types.edges?.[0]?.node?.name as string)
    ).toBeInTheDocument();
  });

  it('renders card actions', () => {
    render(<PokemonCardWithActions />);
    expect(screen.getByText('Some action')).toBeInTheDocument();
  });
});
