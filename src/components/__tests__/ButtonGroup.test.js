import React from 'react';
import {render} from '@testing-library/react';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

describe('ButtonGroup', () => {
  test('renders a div with class "btn-group"', () => {
    const buttonGroup = render(<ButtonGroup />);

    expect(buttonGroup.container.querySelector('div.btn-group')).not.toBe(null);
  });

  test('renders its content', () => {
    const buttonGroup = render(
      <ButtonGroup>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </ButtonGroup>
    );

    expect(buttonGroup.container).toHaveTextContent('Button 1');
    expect(buttonGroup.container).toHaveTextContent('Button 2');
  });

  test('applies vertical styles with "vertical" prop', () => {
    const {
      container: {firstChild: buttonGroup},
    } = render(<ButtonGroup vertical />);

    expect(buttonGroup).toHaveClass('btn-group-vertical');
  });

  test('applies sizing CSS classes', () => {
    // buttonGroup sizes
    const {
      container: {firstChild: buttonGroupSm},
    } = render(<ButtonGroup size="sm" />);
    const {
      container: {firstChild: buttonGroupLg},
    } = render(<ButtonGroup size="lg" />);

    expect(buttonGroupSm).toHaveClass('btn-group-sm');
    expect(buttonGroupLg).toHaveClass('btn-group-lg');
  });
});
