import React from 'react';
import {render} from '@testing-library/react';
import Jumbotron from '../Jumbotron';

describe('Jumbotron', () => {
  test('renders a div with class "jumbotron"', () => {
    const jumbotron = render(<Jumbotron />);

    expect(jumbotron.container.querySelector('div.jumbotron')).not.toBe(null);
  });

  test('renders its content', () => {
    const jumbotron = render(<Jumbotron>Some jumbotron content</Jumbotron>);

    expect(jumbotron.container).toHaveTextContent('Some jumbotron content');
  });

  test('renders a fluid jumbotron if "fluid" is set', () => {
    const {
      container: {firstChild: jumbotron},
    } = render(<Jumbotron fluid />);

    expect(jumbotron).toHaveClass('jumbotron jumbotron-fluid');
  });
});
