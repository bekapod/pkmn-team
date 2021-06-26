import { render, screen } from '@testing-library/react';
import { composeStory } from '@storybook/testing-react';
import Meta, { teamCard } from './TeamCard.stories';

const TeamCard = composeStory(teamCard, Meta);

describe('TeamCard', () => {
  it('renders as a link to the team', () => {
    const { container } = render(<TeamCard />);
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '/team/123');
  });

  it('renders the team name', () => {
    render(<TeamCard />);
    expect(screen.getByText(Meta.args?.name as string)).toBeInTheDocument();
  });

  it('renders the team meta data', () => {
    render(<TeamCard />);
    expect(screen.getByText('Pkmn').nextSibling).toHaveTextContent('3');
    expect(screen.getByText('Created').nextSibling).toHaveTextContent(
      '12/12/20'
    );
  });

  it('renders the team members', () => {
    render(<TeamCard />);
    Meta.args?.members?.edges?.forEach(member => {
      expect(
        screen.getByText(
          `#${member?.node?.pokemon.pokedexId} ${member?.node?.pokemon.name}`
        )
      ).toBeInTheDocument();
    });
  });
});
