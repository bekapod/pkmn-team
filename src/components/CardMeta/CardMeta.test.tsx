import { screen, render } from '@testing-library/react';
import { composeStory } from '@storybook/testing-react';
import Meta, { cardMeta } from './CardMeta.stories';

const CardMeta = composeStory(cardMeta, Meta);

describe('CardMeta', () => {
  it('renders as a <dl>', () => {
    render(<CardMeta />);
    expect(screen.getByRole('associationlist')).toBeInTheDocument();
  });

  it('renders labels as <dt>', () => {
    render(<CardMeta />);
    expect(
      screen.getByRole('associationlistitemkey', { name: 'Item 1' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('associationlistitemkey', { name: 'Item 2' })
    ).toBeInTheDocument();
  });

  it('renders values as <dd>', () => {
    render(<CardMeta />);
    expect(
      screen.getByRole('associationlistitemvalue', { name: 'Value 1' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('associationlistitemvalue', { name: '2' })
    ).toBeInTheDocument();
  });

  it('renders empty <dl> when no items are passed', () => {
    render(<CardMeta items={undefined} />);
    expect(screen.getByRole('associationlist')).toBeEmptyDOMElement();
  });
});
