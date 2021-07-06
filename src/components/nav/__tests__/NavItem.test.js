import React from 'react';
import {render} from '@testing-library/react';
import NavItem from '../NavItem';

describe('NavItem', () => {
  test('renders a li with class "nav-item"', () => {
    const navbarBrand = render(<NavItem />);

    expect(navbarBrand.container.querySelector('li.nav-item')).not.toBe(null);
  });

  test('renders its content', () => {
    const navbarBrand = render(<NavItem>Some nav item content</NavItem>);

    expect(navbarBrand.container).toHaveTextContent('Some nav item content');
  });

  test('applies "active" class with "active" prop', () => {
    const {
      container: {firstChild: navItem},
    } = render(<NavItem active />);

    expect(navItem).toHaveClass('active');
  });
});
