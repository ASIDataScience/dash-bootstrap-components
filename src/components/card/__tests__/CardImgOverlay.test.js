import React from 'react';
import {render} from '@testing-library/react';
import CardImgOverlay from '../CardImgOverlay';

describe('CardImgOverlay', () => {
  test('renders a div with class "card-img-overlay"', () => {
    const cardImgOverlay = render(<CardImgOverlay />);

    expect(
      cardImgOverlay.container.querySelector('div.card-img-overlay')
    ).not.toBe(null);
  });

  test('renders its content', () => {
    const cardImgOverlay = render(
      <CardImgOverlay>Some card image overlay content</CardImgOverlay>
    );

    expect(cardImgOverlay.container).toHaveTextContent(
      'Some card image overlay content'
    );
  });
});
