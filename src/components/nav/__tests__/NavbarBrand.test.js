import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavbarBrand from '../NavbarBrand';

describe('NavbarBrand', () => {
  test('renders a span with class "navbar-brand"', () => {
    const navbarBrand = render(<NavbarBrand />);

    expect(navbarBrand.container.querySelector('span.navbar-brand')).not.toBe(
      null
    );
  });

  test('renders its content', () => {
    const navbarBrand = render(
      <NavbarBrand>Some navbar brand content</NavbarBrand>
    );

    expect(navbarBrand.container).toHaveTextContent(
      'Some navbar brand content'
    );
  });

  test('render as a link when href is set', () => {
    const href = '/test-href';
    const {
      container: {firstChild: navbarBrand},
    } = render(<NavbarBrand href={href} />);
    expect(navbarBrand.getAttribute('href')).toBe(href);
  });

  test('relative links are internal by default', () => {
    const navbarBrand = render(
      <NavbarBrand href="/relative">Clickable</NavbarBrand>
    );

    const mockEventListener = jest.fn();
    window.addEventListener('_dashprivate_pushstate', mockEventListener);
    window.scrollTo = jest.fn();

    expect(mockEventListener.mock.calls).toHaveLength(0);
    userEvent.click(navbarBrand.getByText('Clickable'));
    expect(mockEventListener.mock.calls).toHaveLength(1);
  });

  test('relative links are external with external_link=true', () => {
    const navbarBrand = render(
      <NavbarBrand href="/relative" external_link>
        Clickable
      </NavbarBrand>
    );

    const mockEventListener = jest.fn();
    window.addEventListener('_dashprivate_pushstate', mockEventListener);
    window.scrollTo = jest.fn();

    expect(mockEventListener.mock.calls).toHaveLength(0);
    userEvent.click(navbarBrand.getByText('Clickable'));
    expect(mockEventListener.mock.calls).toHaveLength(0);
  });
});
