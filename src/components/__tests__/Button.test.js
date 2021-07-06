import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Button', () => {
  test('renders a button with class "btn"', () => {
    const {container} = render(<Button />);

    expect(container.querySelector('button.btn')).not.toBe(null);
  });

  test('renders its content', () => {
    const {container} = render(<Button>Some button content</Button>);

    expect(container).toHaveTextContent('Some button content');
  });

  test('applies contextual colors with "color" prop', () => {
    const {
      container: {firstChild: buttonPrimary},
    } = render(<Button color="primary" />);
    const {
      container: {firstChild: buttonSuccess},
    } = render(<Button color="success" />);
    const {
      container: {firstChild: buttonDark},
    } = render(<Button color="dark" />);

    expect(buttonPrimary).toHaveClass('btn-primary');
    expect(buttonSuccess).toHaveClass('btn-success');
    expect(buttonDark).toHaveClass('btn-dark');
  });

  test('applies outline styles with "outline" prop', () => {
    const {
      container: {firstChild: button},
    } = render(<Button color="primary" outline />);

    expect(button).toHaveClass('btn-outline-primary');
  });

  test('applies outline styles with "outline" prop', () => {
    const {
      container: {firstChild: button},
    } = render(<Button color="primary" outline />);

    expect(button).toHaveClass('btn-outline-primary');
  });

  test('applies additional CSS classes when props are set', () => {
    // active and disabled buttons
    const {
      container: {firstChild: buttonActive},
    } = render(<Button active />);
    const {
      container: {firstChild: buttonDisabled},
    } = render(<Button disabled />);

    expect(buttonActive).toHaveClass('active');
    expect(buttonDisabled).toHaveClass('disabled');

    // button sizes
    const {
      container: {firstChild: buttonSm},
    } = render(<Button size="sm" />);
    const {
      container: {firstChild: buttonLg},
    } = render(<Button size="lg" />);

    expect(buttonSm).toHaveClass('btn-sm');
    expect(buttonLg).toHaveClass('btn-lg');

    // block button
    const {
      container: {firstChild: buttonBlock},
    } = render(<Button block />);

    expect(buttonBlock).toHaveClass('btn-block');
  });

  test('render as a link when href is set', () => {
    const href = '/test-href';
    const button = render(<Button href={href} />);
    expect(button.container.querySelector('a.btn').getAttribute('href')).toBe(
      href
    );
  });

  test('tracks clicks with n_clicks', () => {
    const mockSetProps = jest.fn();
    const button = render(<Button setProps={mockSetProps}>Clickable</Button>);

    expect(mockSetProps.mock.calls).toHaveLength(0);

    userEvent.click(button.getByText('Clickable'));

    expect(mockSetProps.mock.calls).toHaveLength(1);
    expect(mockSetProps.mock.calls[0][0].n_clicks).toBe(1);
  });

  test("doesn't track clicks if disabled", () => {
    const mockSetProps = jest.fn();
    const button = render(
      <Button disabled setProps={mockSetProps}>
        Clickable
      </Button>
    );

    expect(mockSetProps.mock.calls).toHaveLength(0);

    userEvent.click(button.getByText('Clickable'));

    expect(mockSetProps.mock.calls).toHaveLength(0);
  });

  test('relative links are internal by default', () => {
    const button = render(<Button href="/relative">Clickable</Button>);

    const mockEventListener = jest.fn();
    window.addEventListener('_dashprivate_pushstate', mockEventListener);
    window.scrollTo = jest.fn();

    expect(mockEventListener.mock.calls).toHaveLength(0);
    userEvent.click(button.getByText('Clickable'));
    expect(mockEventListener.mock.calls).toHaveLength(1);
  });

  test('relative links are external with external_link=true', () => {
    const button = render(
      <Button href="/relative" external_link>
        Clickable
      </Button>
    );

    const mockEventListener = jest.fn();
    window.addEventListener('_dashprivate_pushstate', mockEventListener);
    window.scrollTo = jest.fn();

    expect(mockEventListener.mock.calls).toHaveLength(0);
    userEvent.click(button.getByText('Clickable'));
    expect(mockEventListener.mock.calls).toHaveLength(0);
  });
});
