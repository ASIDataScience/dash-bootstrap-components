import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavbarToggler from '../NavbarToggler';

describe('NavbarToggler', () => {
  test('renders a navbarToggler with class "navbar-toggler"', () => {
    const {container} = render(<NavbarToggler />);

    expect(container.querySelector('button.navbar-toggler')).not.toBe(null);
  });

  test('renders its content', () => {
    const {container} = render(
      <NavbarToggler>Some navbarToggler content</NavbarToggler>
    );

    expect(container).toHaveTextContent('Some navbarToggler content');
  });

  test('tracks clicks with n_clicks', () => {
    const mockSetProps = jest.fn();
    const navbarToggler = render(
      <NavbarToggler setProps={mockSetProps}>Clickable</NavbarToggler>
    );

    expect(mockSetProps.mock.calls).toHaveLength(0);

    userEvent.click(navbarToggler.getByText('Clickable'));

    expect(mockSetProps.mock.calls).toHaveLength(1);
    expect(mockSetProps.mock.calls[0][0].n_clicks).toBe(1);
  });
});
