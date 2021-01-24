import { render } from '@testing-library/react';
import { TeamCard, TeamCardProps } from '.';
import { charmander, haunter, pikachu } from '~/mocks/Pokemon';
import { Pokemon } from '~/generated/graphql';

describe(TeamCard, () => {
  const pokemon: Pokemon[] = [charmander, pikachu, haunter];

  const team = {
    id: '123',
    created_at: '2020-12-12T22:50:59.766899+00:00',
    name: 'My super team!',
    team_members: [
      {
        id: '1',
        order: 1,
        pokemon: pokemon[0]
      },
      {
        id: '2',
        order: 2,
        pokemon: pokemon[1]
      },
      {
        id: '3',
        order: 3,
        pokemon: pokemon[2]
      }
    ]
  };

  const setup = (props: Partial<TeamCardProps> = {}) =>
    render(<TeamCard {...team} {...props} />);

  it('renders as a link to the team', () => {
    const { container } = setup();
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '/team/123');
  });

  it('renders the team name', () => {
    const { getByText } = setup();
    expect(getByText(team.name)).toBeInTheDocument();
  });

  it('renders the team meta data', () => {
    const { getByText } = setup();
    expect(getByText('Pkmn').nextSibling).toHaveTextContent('3');
    expect(getByText('Created').nextSibling).toHaveTextContent('12/12/20');
  });

  it('renders the team members', () => {
    const { getByText } = setup();
    expect(
      getByText(`#${pokemon[0].pokedex_id} ${pokemon[0].name}`)
    ).toBeInTheDocument();
    expect(
      getByText(`#${pokemon[1].pokedex_id} ${pokemon[1].name}`)
    ).toBeInTheDocument();
    expect(
      getByText(`#${pokemon[2].pokedex_id} ${pokemon[2].name}`)
    ).toBeInTheDocument();
  });
});
