import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavLink from '../NavLink';

describe('NavLink', () => {
  test('renders an anchor with class "nav-link"', () => {
    const navLink = render(<NavLink />);

    expect(navLink.container.querySelector('a.nav-link')).not.toBe(null);
  });

  test('renders its content', () => {
    const navLink = render(<NavLink>Some nav link content</NavLink>);

    expect(navLink.container).toHaveTextContent('Some nav link content');
  });

  test('passes href to the anchor', () => {
    const href = '/test-href';
    const {
      container: {firstChild: navLink},
    } = render(<NavLink href={href} />);
    expect(navLink.getAttribute('href')).toBe(href);
  });

  test('applies "active" class with "active" prop', () => {
    const {
      container: {firstChild: navLink},
    } = render(<NavLink active />);

    expect(navLink).toHaveClass('active');
  });

  test('tracks clicks with n_clicks', () => {
    const mockSetProps = jest.fn();
    const navLink = render(
      <NavLink setProps={mockSetProps}>Clickable</NavLink>
    );

    expect(mockSetProps.mock.calls).toHaveLength(0);

    userEvent.click(navLink.getByText('Clickable'));

    expect(mockSetProps.mock.calls).toHaveLength(1);
    expect(mockSetProps.mock.calls[0][0].n_clicks).toBe(1);
  });

  test("doesn't track clicks if disabled", () => {
    const mockSetProps = jest.fn();
    const navLink = render(
      <NavLink setProps={mockSetProps} disabled>
        Clickable
      </NavLink>
    );
    expect(navLink.getByText('Clickable')).toHaveClass('disabled');

    expect(mockSetProps.mock.calls).toHaveLength(0);

    userEvent.click(navLink.getByText('Clickable'));

    expect(mockSetProps.mock.calls).toHaveLength(0);
  });

  test('relative links are internal by default', () => {
    const navLink = render(<NavLink href="/relative">Clickable</NavLink>);

    const mockEventListener = jest.fn();
    window.addEventListener('_dashprivate_pushstate', mockEventListener);
    window.scrollTo = jest.fn();

    expect(mockEventListener.mock.calls).toHaveLength(0);
    userEvent.click(navLink.getByText('Clickable'));
    expect(mockEventListener.mock.calls).toHaveLength(1);
  });

  test('relative links are external with external_link=true', () => {
    const navLink = render(
      <NavLink href="/relative" external_link>
        Clickable
      </NavLink>
    );

    const mockEventListener = jest.fn();
    window.addEventListener('_dashprivate_pushstate', mockEventListener);
    window.scrollTo = jest.fn();

    expect(mockEventListener.mock.calls).toHaveLength(0);
    userEvent.click(navLink.getByText('Clickable'));
    expect(mockEventListener.mock.calls).toHaveLength(0);
  });
});
