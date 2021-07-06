import React from 'react';
import {render} from '@testing-library/react';
import ListGroupItem from '../ListGroupItem';
import ListGroup from '../ListGroup';

describe('ListGroup', () => {
  test('renders an unordered list with class "list-group"', () => {
    const listGroup = render(<ListGroup />);

    expect(listGroup.container.querySelector('ul.list-group')).not.toBe(null);
  });

  test('renders its content', () => {
    const listGroup = render(
      <ListGroup>
        <ListGroupItem>ListGroupItem 1</ListGroupItem>
        <ListGroupItem>ListGroupItem 2</ListGroupItem>
      </ListGroup>
    );

    expect(listGroup.container).toHaveTextContent('ListGroupItem 1');
    expect(listGroup.container).toHaveTextContent('ListGroupItem 2');
  });

  test('applies horizontal styles with "horizontal" prop', () => {
    const {
      container: {firstChild: listGroup},
    } = render(<ListGroup horizontal />);

    expect(listGroup).toHaveClass('list-group-horizontal');
  });

  test('applies flush styles with "flush" prop', () => {
    const {
      container: {firstChild: listGroup},
    } = render(<ListGroup flush />);

    expect(listGroup).toHaveClass('list-group-flush');
  });
});
