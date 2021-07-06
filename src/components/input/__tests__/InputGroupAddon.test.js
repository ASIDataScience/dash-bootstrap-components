import React from 'react';
import {render} from '@testing-library/react';
import Button from '../../Button';
import DropdownMenu from '../../dropdownmenu/DropdownMenu';
import DropdownMenuItem from '../../dropdownmenu/DropdownMenuItem';
import InputGroupAddon from '../InputGroupAddon';
import InputGroupText from '../InputGroupText';

describe('InputGroupAddon', () => {
  test('renders a div with class "input-group-prepend" or "input-group-append"', () => {
    const inputGroupPrepend = render(<InputGroupAddon addon_type="prepend" />);
    const inputGroupAppend = render(<InputGroupAddon addon_type="append" />);

    expect(
      inputGroupPrepend.container.querySelector('div.input-group-prepend')
    ).not.toBe(null);
    expect(
      inputGroupAppend.container.querySelector('div.input-group-append')
    ).not.toBe(null);
  });

  test('renders its content', () => {
    const {
      container: {firstChild: inputGroupAddonString},
    } = render(<InputGroupAddon>Addon</InputGroupAddon>);

    expect(inputGroupAddonString).toHaveTextContent('Addon');
    expect(inputGroupAddonString).toHaveClass('input-group-prepend');
    expect(inputGroupAddonString.firstChild).toHaveClass('input-group-text');

    const {
      container: {firstChild: inputGroupAddonText},
    } = render(
      <InputGroupAddon>
        <InputGroupText>Addon text</InputGroupText>
      </InputGroupAddon>
    );
    expect(inputGroupAddonText).toHaveTextContent('Addon text');
    expect(inputGroupAddonText).toHaveClass('input-group-prepend');
    expect(inputGroupAddonText.firstChild).toHaveClass('input-group-text');

    const {
      container: {firstChild: inputGroupAddonButton},
    } = render(
      <InputGroupAddon>
        <Button>Addon button</Button>
      </InputGroupAddon>
    );
    expect(inputGroupAddonButton).toHaveTextContent('Addon button');
    expect(inputGroupAddonButton).toHaveClass('input-group-prepend');
    expect(inputGroupAddonButton.firstChild).toHaveClass('btn btn-secondary');

    const {
      container: {firstChild: inputGroupAddonDropdown},
    } = render(
      <InputGroupAddon>
        <DropdownMenu label="Addon dropdown">
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenu>
      </InputGroupAddon>
    );
    expect(inputGroupAddonDropdown).toHaveTextContent('Addon dropdown');
    expect(inputGroupAddonDropdown).toHaveClass('input-group-prepend');
    expect(inputGroupAddonDropdown.firstChild).toHaveClass('dropdown');
    expect(inputGroupAddonDropdown.firstChild.firstChild).toHaveClass(
      'dropdown-toggle btn btn-secondary'
    );
  });
});
