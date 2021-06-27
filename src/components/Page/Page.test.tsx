import { render, screen } from '@testing-library/react';
import { Page } from '.';

describe(Page, () => {
  it('renders header', () => {
    render(<Page title="Some page" metaTitle="Some page" />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('Some page')).toBeInTheDocument();
  });

  it('renders content', () => {
    render(
      <Page title="Some page" metaTitle="Some page">
        Some page content
      </Page>
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('Some page content')).toBeInTheDocument();
  });

  it('adds custom class name', () => {
    render(
      <Page
        title="Some page"
        metaTitle="Some page"
        className="some-custom-class"
      >
        Some page content
      </Page>
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole('main').parentElement).toHaveClass(
      'some-custom-class'
    );
  });
});
