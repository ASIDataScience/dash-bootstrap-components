import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Badge from '../Badge';

describe('Badge', () => {
  test('renders a span with class "badge"', () => {
    const badge = render(<Badge />);

    expect(badge.container.querySelector('span.badge')).not.toBe(null);
  });

  test('renders its content', () => {
    const badge = render(<Badge>Some badge content</Badge>);

    expect(badge.container).toHaveTextContent('Some badge content');
  });

  test('applies contextual colors with "color" prop', () => {
    const {
      container: {firstChild: badgeSecondary},
    } = render(<Badge />);
    const {
      container: {firstChild: badgePrimary},
    } = render(<Badge color="primary" />);
    const {
      container: {firstChild: badgeSuccess},
    } = render(<Badge color="success" />);
    const {
      container: {firstChild: badgeDark},
    } = render(<Badge color="dark" />);

    expect(badgeSecondary).toHaveClass('badge-secondary');
    expect(badgePrimary).toHaveClass('badge-primary');
    expect(badgeSuccess).toHaveClass('badge-success');
    expect(badgeDark).toHaveClass('badge-dark');
  });

  test('applies pill styles with "pill" prop', () => {
    const {
      container: {firstChild: badge},
    } = render(<Badge pill />);

    expect(badge).toHaveClass('badge-pill');
  });

  test('render as a link when href is set', () => {
    const href = '/test-href';
    const {
      container: {firstChild: badge},
    } = render(<Badge href={href} />);
    expect(badge.getAttribute('href')).toBe(href);
  });

  test('tracks clicks with n_clicks', () => {
    const mockSetProps = jest.fn();
    const badge = render(<Badge setProps={mockSetProps}>Clickable</Badge>);

    expect(mockSetProps.mock.calls).toHaveLength(0);

    userEvent.click(badge.getByText('Clickable'));

    expect(mockSetProps.mock.calls).toHaveLength(1);
    expect(mockSetProps.mock.calls[0][0].n_clicks).toBe(1);
  });

  test('relative links are internal by default', () => {
    const badge = render(<Badge href="/relative">Clickable</Badge>);

    const mockEventListener = jest.fn();
    window.addEventListener('_dashprivate_pushstate', mockEventListener);
    window.scrollTo = jest.fn();

    expect(mockEventListener.mock.calls).toHaveLength(0);
    userEvent.click(badge.getByText('Clickable'));
    expect(mockEventListener.mock.calls).toHaveLength(1);
  });

  test('relative links are external with external_link=true', () => {
    const badge = render(
      <Badge href="/relative" external_link>
        Clickable
      </Badge>
    );

    const mockEventListener = jest.fn();
    window.addEventListener('_dashprivate_pushstate', mockEventListener);
    window.scrollTo = jest.fn();

    expect(mockEventListener.mock.calls).toHaveLength(0);
    userEvent.click(badge.getByText('Clickable'));
    expect(mockEventListener.mock.calls).toHaveLength(0);
  });
});
