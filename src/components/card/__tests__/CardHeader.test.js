import React from 'react';
import {render} from '@testing-library/react';
import CardHeader from '../CardHeader';

describe('CardHeader', () => {
  test('renders a div with class "card-header"', () => {
    const cardHeader = render(<CardHeader />);

    expect(cardHeader.container.querySelector('div.card-header')).not.toBe(
      null
    );
  });

  test('renders its content', () => {
    const cardHeader = render(
      <CardHeader>Some card header content</CardHeader>
    );

    expect(cardHeader.container).toHaveTextContent('Some card header content');
  });
});
