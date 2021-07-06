import React from 'react';
import {render} from '@testing-library/react';
import InputGroupText from '../InputGroupText';

describe('InputGroupAddon', () => {
  test('renders a span with class "input-group-text"', () => {
    const inputGroupText = render(<InputGroupText />);
    expect(
      inputGroupText.container.querySelector('span.input-group-text')
    ).not.toBe(null);
  });

  test('renders its content', () => {
    const {
      container: {firstChild: inputGroupText},
    } = render(<InputGroupText>Addon</InputGroupText>);

    expect(inputGroupText).toHaveTextContent('Addon');
    expect(inputGroupText).toHaveClass('input-group-text');
  });
});
