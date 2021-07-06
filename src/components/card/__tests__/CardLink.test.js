import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardLink from '../CardLink';

describe('CardLink', () => {
  test('renders an anchor with class "card-link"', () => {
    const cardLink = render(<CardLink />);

    expect(cardLink.container.querySelector('a.card-link')).not.toBe(null);
  });

  test('renders its content', () => {
    const cardLink = render(<CardLink>Some card link content</CardLink>);

    expect(cardLink.container).toHaveTextContent('Some card link content');
  });

  test('tracks clicks with n_clicks', () => {
    const mockSetProps = jest.fn();
    const cardLink = render(
      <CardLink setProps={mockSetProps}>Clickable</CardLink>
    );

    expect(mockSetProps.mock.calls).toHaveLength(0);

    userEvent.click(cardLink.getByText('Clickable'));

    expect(mockSetProps.mock.calls).toHaveLength(1);
    expect(mockSetProps.mock.calls[0][0].n_clicks).toBe(1);
  });

  test("doesn't track clicks if disabled", () => {
    const mockSetProps = jest.fn();
    const cardLink = render(
      <CardLink setProps={mockSetProps} disabled>
        Clickable
      </CardLink>
    );

    expect(mockSetProps.mock.calls).toHaveLength(0);

    userEvent.click(cardLink.getByText('Clickable'));

    expect(mockSetProps.mock.calls).toHaveLength(0);
  });

  test('relative links are internal by default', () => {
    const cardLink = render(<CardLink href="/relative">Clickable</CardLink>);

    const mockEventListener = jest.fn();
    window.addEventListener('_dashprivate_pushstate', mockEventListener);
    window.scrollTo = jest.fn();

    expect(mockEventListener.mock.calls).toHaveLength(0);
    userEvent.click(cardLink.getByText('Clickable'));
    expect(mockEventListener.mock.calls).toHaveLength(1);
  });

  test('relative links are external with external_link=true', () => {
    const cardLink = render(
      <CardLink href="/relative" external_link>
        Clickable
      </CardLink>
    );

    const mockEventListener = jest.fn();
    window.addEventListener('_dashprivate_pushstate', mockEventListener);
    window.scrollTo = jest.fn();

    expect(mockEventListener.mock.calls).toHaveLength(0);
    userEvent.click(cardLink.getByText('Clickable'));
    expect(mockEventListener.mock.calls).toHaveLength(0);
  });
});
