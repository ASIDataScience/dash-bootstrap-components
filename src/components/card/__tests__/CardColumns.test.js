import React from 'react';
import {render} from '@testing-library/react';
import CardColumns from '../CardColumns';

describe('CardColumns', () => {
  test('renders a div with class "card-columns"', () => {
    const cardColumns = render(<CardColumns />);

    expect(cardColumns.container.querySelector('div.card-columns')).not.toBe(
      null
    );
  });

  test('renders its content', () => {
    const cardColumns = render(
      <CardColumns>Some card columns content</CardColumns>
    );

    expect(cardColumns.container).toHaveTextContent(
      'Some card columns content'
    );
  });
});
