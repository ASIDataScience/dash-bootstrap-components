import React from 'react';
import {render} from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
  test('renders a div with class "card"', () => {
    const card = render(<Card />);

    expect(card.container.querySelector('div.card')).not.toBe(null);
  });

  test('renders its content', () => {
    const card = render(<Card>Some card content</Card>);

    expect(card.container).toHaveTextContent('Some card content');
  });

  test('applies contextual colors with "color" prop', () => {
    const {
      container: {firstChild: cardPrimary},
    } = render(<Card color="primary" />);
    const {
      container: {firstChild: cardSuccess},
    } = render(<Card color="success" />);
    const {
      container: {firstChild: cardDark},
    } = render(<Card color="dark" />);

    expect(cardPrimary).toHaveClass('bg-primary');
    expect(cardSuccess).toHaveClass('bg-success');
    expect(cardDark).toHaveClass('bg-dark');
  });

  test('applies outline styles with "outline" prop', () => {
    const {
      container: {firstChild: cardPrimary},
    } = render(<Card color="primary" outline />);
    const {
      container: {firstChild: cardSuccess},
    } = render(<Card color="success" outline />);
    const {
      container: {firstChild: cardDark},
    } = render(<Card color="dark" outline />);

    expect(cardPrimary).toHaveClass('border-primary');
    expect(cardSuccess).toHaveClass('border-success');
    expect(cardDark).toHaveClass('border-dark');
  });

  test('applies card-body class with "body" prop', () => {
    const {
      container: {firstChild: cardBody},
    } = render(<Card body />);

    expect(cardBody).toHaveClass('card-body');
  });

  test('applies text-white class with "inverse" prop', () => {
    const {
      container: {firstChild: cardInverse},
    } = render(<Card inverse />);

    expect(cardInverse).toHaveClass('text-white');
  });
});
