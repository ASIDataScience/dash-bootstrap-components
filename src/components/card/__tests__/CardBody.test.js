import React from 'react';
import {render} from '@testing-library/react';
import CardBody from '../CardBody';

describe('CardBody', () => {
  test('renders a div with class "card-body"', () => {
    const cardBody = render(<CardBody />);

    expect(cardBody.container.querySelector('div.card-body')).not.toBe(null);
  });

  test('renders its content', () => {
    const cardBody = render(<CardBody>Some card body content</CardBody>);

    expect(cardBody.container).toHaveTextContent('Some card body content');
  });
});
