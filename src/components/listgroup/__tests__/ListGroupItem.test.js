import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListGroupItem from '../ListGroupItem';

describe('ListGroupItem', () => {
  test('renders a list item with class "list group item"', () => {
    const listGroupItem = render(<ListGroupItem />);

    expect(
      listGroupItem.container.querySelector('li.list-group-item')
    ).not.toBe(null);
  });

  test('renders its content', () => {
    const listGroupItem = render(
      <ListGroupItem>Some list group item content</ListGroupItem>
    );

    expect(listGroupItem.container).toHaveTextContent(
      'Some list group item content'
    );
  });

  test('applies contextual colors with "color" prop', () => {
    const {
      container: {firstChild: listGroupItemPrimary},
    } = render(<ListGroupItem color="primary" />);
    const {
      container: {firstChild: listGroupItemSuccess},
    } = render(<ListGroupItem color="success" />);
    const {
      container: {firstChild: listGroupItemDark},
    } = render(<ListGroupItem color="dark" />);

    expect(listGroupItemPrimary).toHaveClass('list-group-item-primary');
    expect(listGroupItemSuccess).toHaveClass('list-group-item-success');
    expect(listGroupItemDark).toHaveClass('list-group-item-dark');
  });

  test('render as a link when href is set', () => {
    const href = '/test-href';
    const listGroupItem = render(<ListGroupItem href={href} />);
    expect(
      listGroupItem.container
        .querySelector('a.list-group-item')
        .getAttribute('href')
    ).toBe(href);
  });

  test('tracks clicks with n_clicks', () => {
    const mockSetProps = jest.fn();
    const listGroupItem = render(
      <ListGroupItem setProps={mockSetProps}>Clickable</ListGroupItem>
    );

    expect(mockSetProps.mock.calls).toHaveLength(0);

    userEvent.click(listGroupItem.getByText('Clickable'));

    expect(mockSetProps.mock.calls).toHaveLength(1);
    expect(mockSetProps.mock.calls[0][0].n_clicks).toBe(1);
  });

  test("doesn't track clicks if disabled", () => {
    const mockSetProps = jest.fn();
    const listGroupItem = render(
      <ListGroupItem disabled setProps={mockSetProps}>
        Clickable
      </ListGroupItem>
    );

    expect(listGroupItem.getByText('Clickable')).toHaveClass('disabled');

    expect(mockSetProps.mock.calls).toHaveLength(0);

    userEvent.click(listGroupItem.getByText('Clickable'));

    expect(mockSetProps.mock.calls).toHaveLength(0);
  });

  test('relative links are internal by default', () => {
    const listGroupItem = render(
      <ListGroupItem href="/relative">Clickable</ListGroupItem>
    );

    const mockEventListener = jest.fn();
    window.addEventListener('_dashprivate_pushstate', mockEventListener);
    window.scrollTo = jest.fn();

    expect(mockEventListener.mock.calls).toHaveLength(0);
    userEvent.click(listGroupItem.getByText('Clickable'));
    expect(mockEventListener.mock.calls).toHaveLength(1);
  });

  test('relative links are external with external_link=true', () => {
    const listGroupItem = render(
      <ListGroupItem href="/relative" external_link>
        Clickable
      </ListGroupItem>
    );

    const mockEventListener = jest.fn();
    window.addEventListener('_dashprivate_pushstate', mockEventListener);
    window.scrollTo = jest.fn();

    expect(mockEventListener.mock.calls).toHaveLength(0);
    userEvent.click(listGroupItem.getByText('Clickable'));
    expect(mockEventListener.mock.calls).toHaveLength(0);
  });
});
