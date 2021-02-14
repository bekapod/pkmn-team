import { screen, render } from '@testing-library/react';
import { CardMeta } from '.';

describe(CardMeta, () => {
  const setup = () =>
    render(
      <CardMeta
        id="test"
        items={[
          { label: 'Item 1', value: 'Value 1' },
          { label: 'Item 2', value: 'Value 2' }
        ]}
      />
    );

  it('renders each item', () => {
    setup();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Value 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Value 2')).toBeInTheDocument();
  });

  it('renders as a <dl>', () => {
    setup();
    expect(screen.getByTestId('card-meta-test').tagName).toBe('DL');
  });

  it('renders labels as <dt>', () => {
    setup();
    expect(screen.getByText('Item 1').tagName).toBe('DT');
    expect(screen.getByText('Item 2').tagName).toBe('DT');
  });

  it('renders values as <dd>', () => {
    setup();
    expect(screen.getByText('Value 1').tagName).toBe('DD');
    expect(screen.getByText('Value 2').tagName).toBe('DD');
  });

  it('renders empty <dl> when no items are passed', () => {
    render(<CardMeta id="test" />);
    expect(screen.getByTestId('card-meta-test')).toBeEmptyDOMElement();
  });
});
