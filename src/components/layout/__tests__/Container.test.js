import React from 'react';
import {render} from '@testing-library/react';
import Container from '../Container';

describe('Container', () => {
  test('renders a div with class "container"', () => {
    const container = render(<Container />);

    expect(container.container.querySelector('div.container')).not.toBe(null);
  });

  test('renders its content', () => {
    const container = render(<Container>Some container content</Container>);

    expect(container.container).toHaveTextContent('Some container content');
  });

  test('renders a fluid container if "fluid" is set', () => {
    const {
      container: {firstChild: container},
    } = render(<Container fluid />);

    expect(container).toHaveClass('container-fluid');
  });
});
