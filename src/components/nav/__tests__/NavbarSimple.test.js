import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavbarSimple from '../NavbarSimple';
import NavItem from '../NavItem';

jest.useFakeTimers();

describe('NavbarSimple', () => {
  test('renders a nav with class "navbar"', () => {
    const {container} = render(<NavbarSimple />);

    expect(container.querySelector('nav.navbar')).not.toBe(null);
    expect(container.querySelector('.navbar-brand')).toBe(null);
  });

  test('renders its content', () => {
    const {
      container: {firstChild: navbar},
    } = render(<NavbarSimple>Some navbar content</NavbarSimple>);
    expect(navbar).toHaveTextContent('Some navbar content');
  });

  test('adds navbar brand with "brand" prop', () => {
    const {container} = render(
      <NavbarSimple
        brand="my navbar brand"
        brand_href="https://brand.com"
        brand_style={{backgroundColor: 'chocolate'}}
      />
    );
    const brand = container.querySelector('.navbar-brand');
    expect(brand).toHaveTextContent('my navbar brand');
    expect(brand.getAttribute('href')).toEqual('https://brand.com');
    expect(brand).toHaveStyle({backgroundColor: 'chocolate'});
  });

  test('applies additional CSS classes when props are set', () => {
    // dark and light navbars
    const {
      container: {firstChild: navbarDark},
    } = render(<NavbarSimple dark />);
    const {
      container: {firstChild: navbarLight},
    } = render(<NavbarSimple light />);

    expect(navbarDark).toHaveClass('navbar-dark');
    expect(navbarLight).toHaveClass('navbar-light');

    // sticky navbars
    const {
      container: {firstChild: navbarStickyTop},
    } = render(<NavbarSimple sticky="top" />);
    const {
      container: {firstChild: navbarStickyBottom},
    } = render(<NavbarSimple sticky="bottom" />);

    expect(navbarStickyTop).toHaveClass('sticky-top');
    expect(navbarStickyBottom).toHaveClass('sticky-bottom');

    // fixed navbars
    const {
      container: {firstChild: navbarFixedTop},
    } = render(<NavbarSimple fixed="top" />);
    const {
      container: {firstChild: navbarFixedBottom},
    } = render(<NavbarSimple fixed="bottom" />);

    expect(navbarFixedTop).toHaveClass('fixed-top');
    expect(navbarFixedBottom).toHaveClass('fixed-bottom');

    // navbar expand
    const {
      container: {firstChild: navbarExpandSm},
    } = render(<NavbarSimple expand="sm" />);
    expect(navbarExpandSm).toHaveClass('navbar-expand-sm');
    const {
      container: {firstChild: navbarExpandMd},
    } = render(<NavbarSimple expand="md" />);
    expect(navbarExpandMd).toHaveClass('navbar-expand-md');
    const {
      container: {firstChild: navbarExpandLg},
    } = render(<NavbarSimple expand="lg" />);
    expect(navbarExpandLg).toHaveClass('navbar-expand-lg');
    const {
      container: {firstChild: navbarExpandXl},
    } = render(<NavbarSimple expand="xl" />);
    expect(navbarExpandXl).toHaveClass('navbar-expand-xl');

    // fluid container
    const {
      container: {firstChild: navbarFluid},
    } = render(<NavbarSimple fluid />);
    expect(navbarFluid.querySelector('.container-fluid')).not.toBe(null);
  });

  test('applies contextual colors with "color" prop', () => {
    const {
      container: {firstChild: navbarPrimary},
    } = render(<NavbarSimple color="primary" />);
    const {
      container: {firstChild: navbarSuccess},
    } = render(<NavbarSimple color="success" />);
    const {
      container: {firstChild: navbarDark},
    } = render(<NavbarSimple color="dark" />);
    const {
      container: {firstChild: navbarCss},
    } = render(<NavbarSimple color="chocolate" />);
    const {
      container: {firstChild: navbarCustom},
    } = render(<NavbarSimple color="#123456" />);

    expect(navbarPrimary).toHaveClass('bg-primary');
    expect(navbarSuccess).toHaveClass('bg-success');
    expect(navbarDark).toHaveClass('bg-dark');
    expect(navbarCss).toHaveStyle({backgroundColor: 'chocolate'});
    expect(navbarCustom).toHaveStyle({backgroundColor: '#123456'});
  });

  test('navbar-toggler toggles the collapse', () => {
    const {
      container: {firstChild: navbar},
    } = render(
      <NavbarSimple>
        <NavItem>A nav item</NavItem>
      </NavbarSimple>
    );

    const button = navbar.querySelector('.navbar-toggler');
    const collapse = navbar.querySelector('.collapse.navbar-collapse');

    expect(collapse).not.toHaveClass('show');

    userEvent.click(button);
    jest.runAllTimers();

    expect(collapse).toHaveClass('show');

    userEvent.click(button);
    jest.runAllTimers();

    expect(collapse).not.toHaveClass('show');
  });
});
