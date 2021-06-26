import { render, screen } from '@testing-library/react';
import { composeStory } from '@storybook/testing-react';
import Meta, { teamCard } from './TeamCard.stories';

const TeamCard = composeStory(teamCard, Meta);

describe('TeamCard', () => {
  it('renders a link to the team', () => {
    render(<TeamCard />);
    expect(screen.getByRole('link', { name: /My super team/ })).toHaveAttribute(
      'href',
      '/team/123'
    );
  });

  it('renders the team name', () => {
    render(<TeamCard />);
    expect(screen.getByText(Meta.args?.name as string)).toBeInTheDocument();
  });

  it('renders the team meta data', () => {
    render(<TeamCard />);
    expect(
      screen.getByRole('associationlistitemvalue', { name: '3' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('associationlistitemvalue', { name: '12/12/20' })
    ).toBeInTheDocument();
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
