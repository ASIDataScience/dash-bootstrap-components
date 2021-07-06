import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownMenu from '../DropdownMenu';
import DropdownMenuItem from '../DropdownMenuItem';

jest.mock('popper.js', () => {
  const PopperJS = jest.requireActual('popper.js');

  return class {
    static placements = PopperJS.placements;

    constructor() {
      return {
        destroy: () => {},
        scheduleUpdate: () => {},
      };
    }
  };
});

describe('DropdownMenu', () => {
  test('renders a button with class "dropdown-toggle"', () => {
    const dropdownMenu = render(
      <DropdownMenu label="toggle">
        <DropdownMenuItem>Item 1</DropdownMenuItem>
      </DropdownMenu>
    );

    expect(dropdownMenu.getByText('toggle')).toHaveClass('dropdown-toggle');
  });

  test('renders the children in order inside the ".dropdown-menu"', () => {
    const dropdownMenu = render(
      <DropdownMenu label="toggle">
        <DropdownMenuItem>Item 1</DropdownMenuItem>
        <DropdownMenuItem>Test item 2</DropdownMenuItem>
      </DropdownMenu>
    );

    expect(
      dropdownMenu.container.querySelector('.dropdown-menu').children[0]
    ).toHaveTextContent('Item 1');
    expect(
      dropdownMenu.container.querySelector('.dropdown-menu').children[1]
    ).toHaveTextContent('Test item 2');
  });

  test('clicking the toggle toggles the menu', () => {
    const dropdownMenu = render(
      <DropdownMenu label="toggle">
        <DropdownMenuItem>Item 1</DropdownMenuItem>
      </DropdownMenu>
    );

    expect(
      dropdownMenu.container.querySelector('.dropdown-menu')
    ).not.toHaveClass('show');

    userEvent.click(dropdownMenu.getByText('toggle'));
    expect(dropdownMenu.container.querySelector('.dropdown-menu')).toHaveClass(
      'show'
    );

    userEvent.click(dropdownMenu.getByText('toggle'));
    expect(
      dropdownMenu.container.querySelector('.dropdown-menu')
    ).not.toHaveClass('show');
  });

  test('renders toggle as nav_item if "nav" is true', () => {
    const dropdownMenu = render(
      <DropdownMenu label="toggle" nav>
        DropdownMenu content
      </DropdownMenu>
    );

    const dropdownToggle = dropdownMenu.container.querySelector('.dropdown');
    expect(dropdownToggle.tagName.toLowerCase()).toEqual('li');
    expect(dropdownToggle).toHaveClass('nav-item');
    expect(dropdownToggle.firstChild.tagName.toLowerCase()).toEqual('a');
    expect(dropdownToggle.firstChild).toHaveClass('nav-link');
  });

  test("clicking the toggle doesn't toggle the menu if 'disabled' is set", () => {
    const dropdownMenu = render(
      <DropdownMenu label="toggle" disabled>
        <DropdownMenuItem>Item 1</DropdownMenuItem>
      </DropdownMenu>
    );

    expect(dropdownMenu.getByText('toggle')).toHaveClass('disabled');

    expect(
      dropdownMenu.container.querySelector('.dropdown-menu')
    ).not.toHaveClass('show');

    userEvent.click(dropdownMenu.getByText('toggle'));
    expect(
      dropdownMenu.container.querySelector('.dropdown-menu')
    ).not.toHaveClass('show');
  });

  test("adds input-group classes if 'addon_type' is set", () => {
    const dropdownMenuPrepend = render(
      <DropdownMenu label="toggle" addon_type="prepend">
        <DropdownMenuItem>Item 1</DropdownMenuItem>
      </DropdownMenu>
    );
    const dropdownMenuAppend = render(
      <DropdownMenu label="toggle" addon_type="append">
        <DropdownMenuItem>Item 1</DropdownMenuItem>
      </DropdownMenu>
    );

    expect(dropdownMenuPrepend.container.firstChild).toHaveClass(
      'input-group-prepend'
    );
    expect(dropdownMenuAppend.container.firstChild).toHaveClass(
      'input-group-append'
    );
  });

  test('applies additional CSS classes when props are set', () => {
    // dropdownMenu sizes
    const dropdownMenuSm = render(
      <DropdownMenu bs_size="sm" label="toggle small">
        <DropdownMenuItem>Item 1</DropdownMenuItem>
      </DropdownMenu>
    );
    const dropdownMenuLg = render(
      <DropdownMenu bs_size="lg" label="toggle large">
        <DropdownMenuItem>Item 1</DropdownMenuItem>
      </DropdownMenu>
    );

    expect(dropdownMenuSm.getByText('toggle small').parentElement).toHaveClass(
      'btn-group-sm'
    );
    expect(dropdownMenuLg.getByText('toggle large').parentElement).toHaveClass(
      'btn-group-lg'
    );
  });
});
