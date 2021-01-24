import { render } from '@testing-library/react';
import { Page } from '.';

describe(Page, () => {
  it('renders header', () => {
    const { getByText, getByRole } = render(
      <Page title="Some page" metaTitle="Some page" />
    );
    expect(getByRole('banner')).toBeInTheDocument();
    expect(getByText('Some page')).toBeInTheDocument();
  });

  it('renders content', () => {
    const { getByText, getByRole } = render(
      <Page title="Some page" metaTitle="Some page">
        Some page content
      </Page>
    );
    expect(getByRole('main')).toBeInTheDocument();
    expect(getByText('Some page content')).toBeInTheDocument();
  });

  it('adds custom class name', () => {
    const { getByRole } = render(
      <Page
        title="Some page"
        metaTitle="Some page"
        className="some-custom-class"
      >
        Some page content
      </Page>
    );
    expect(getByRole('main').parentElement).toHaveClass('some-custom-class');
  });
});
