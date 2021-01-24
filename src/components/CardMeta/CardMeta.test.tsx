import { render } from '@testing-library/react';
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
    const { getByText } = setup();
    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('Value 1')).toBeInTheDocument();
    expect(getByText('Item 2')).toBeInTheDocument();
    expect(getByText('Value 2')).toBeInTheDocument();
  });

  it('renders as a <dl>', () => {
    const { getByTestId } = setup();
    expect(getByTestId('card-meta-test').tagName).toBe('DL');
  });

  it('renders labels as <dt>', () => {
    const { getByText } = setup();
    expect(getByText('Item 1').tagName).toBe('DT');
    expect(getByText('Item 2').tagName).toBe('DT');
  });

  it('renders values as <dd>', () => {
    const { getByText } = setup();
    expect(getByText('Value 1').tagName).toBe('DD');
    expect(getByText('Value 2').tagName).toBe('DD');
  });

  it('renders empty <dl> when no items are passed', () => {
    const { getByTestId } = render(<CardMeta id="test" />);
    expect(getByTestId('card-meta-test')).toBeEmptyDOMElement();
  });
});
