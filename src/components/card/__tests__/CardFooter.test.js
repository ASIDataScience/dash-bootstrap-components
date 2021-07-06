import React from 'react';
import {render} from '@testing-library/react';
import CardFooter from '../CardFooter';

describe('CardFooter', () => {
  test('renders a div with class "card-footer"', () => {
    const cardFooter = render(<CardFooter />);

    expect(cardFooter.container.querySelector('div.card-footer')).not.toBe(
      null
    );
  });

  test('renders its content', () => {
    const cardFooter = render(
      <CardFooter>Some card footer content</CardFooter>
    );

    expect(cardFooter.container).toHaveTextContent('Some card footer content');
  });
});
