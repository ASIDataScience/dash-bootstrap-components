import React from 'react';
import {act, render} from '@testing-library/react';
import Spinner from '../Spinner';

jest.useFakeTimers();

describe('Spinner', () => {
  test('renders a div with class "border-spinner"', () => {
    const spinner = render(<Spinner />);

    expect(spinner.container.querySelector('div.spinner-border')).not.toBe(
      null
    );
  });

  test("renders its content if object isn't loading", () => {
    const {container: container, rerender} = render(
      <Spinner loading_state={{is_loading: false}}>
        Some spinner content
      </Spinner>
    );

    // spinner is initially visible until we've had time to update based on
    // loading state. this can be disabled with show_initially={false}
    act(() => jest.advanceTimersByTime(10));

    expect(container).toHaveTextContent('Some spinner content');
    expect(container.querySelector('div.spinner-border')).toBe(null);

    rerender(
      <Spinner loading_state={{is_loading: true}}>Some spinner content</Spinner>
    );

    const overAll = container.firstChild;
    const spinner = overAll.lastChild;

    act(() => jest.advanceTimersByTime(10));

    expect(container).toHaveTextContent('Some spinner content');
    expect(container.querySelector('div.spinner-border')).not.toBe(null);
  });

  test("doesn't show initially when show_initially is false", () => {
    const {container: container} = render(
      <Spinner show_initially={false}>Some spinner content</Spinner>
    );

    expect(container).toHaveTextContent('Some spinner content');
    expect(container.querySelector('div.spinner-border')).toBe(null);
  });

  test('applies additional CSS classes when props are set', () => {
    // grow spinner
    const {
      container: {firstChild: spinner},
    } = render(<Spinner type="grow" />);

    expect(spinner).toHaveClass('spinner-grow');

    // spinner sizes
    const {
      container: {firstChild: spinnerSm},
    } = render(<Spinner size="sm" />);

    expect(spinnerSm).toHaveClass('spinner-border-sm');

    // spinner styles
    const {
      container: {firstChild: spinnerStyle},
    } = render(<Spinner spinner_style={{width: '5rem', height: '5rem'}} />);

    expect(spinnerStyle).toHaveStyle({width: '5rem', height: '5rem'});
  });

  test('applies additional CSS classes when props are set and children are present', () => {
    // grow spinner
    const {
      container: {
        firstChild: {lastChild: spinner},
      },
    } = render(
      <Spinner type="grow" loading_state={{is_loading: true}}>
        <p>Child</p>
      </Spinner>
    );

    expect(spinner.firstChild).toHaveClass('spinner-grow');

    // spinner sizes
    const {
      container: {
        firstChild: {lastChild: spinnerSm},
      },
    } = render(
      <Spinner size="sm" loading_state={{is_loading: true}}>
        <p>Child</p>
      </Spinner>
    );

    expect(spinnerSm.firstChild).toHaveClass('spinner-border-sm');

    // spinner styles
    const {
      container: {
        firstChild: {lastChild: spinnerStyle},
      },
    } = render(
      <Spinner
        spinner_style={{width: '5rem', height: '5rem'}}
        loading_state={{is_loading: true}}
      >
        <p>Child</p>
      </Spinner>
    );

    expect(spinnerStyle.firstChild).toHaveStyle({
      width: '5rem',
      height: '5rem',
    });
  });

  test('applies contextual colors with "color" prop', () => {
    const {
      container: {firstChild: spinnerPrimary},
    } = render(<Spinner color="primary" />);
    const {
      container: {firstChild: spinnerSuccess},
    } = render(<Spinner color="success" />);
    const {
      container: {firstChild: spinnerDark},
    } = render(<Spinner color="dark" />);

    expect(spinnerPrimary).toHaveClass('text-primary');
    expect(spinnerSuccess).toHaveClass('text-success');
    expect(spinnerDark).toHaveClass('text-dark');
  });

  test('spinner can be debounced with debounce prop', () => {
    const {container: container, rerender} = render(
      <Spinner loading_state={{is_loading: true}} debounce={1000}>
        Some spinner content
      </Spinner>
    );

    const overAll = container.firstChild;
    const spinner = overAll.lastChild;

    expect(overAll).toHaveTextContent('Some spinner content');
    expect(spinner.firstChild).toHaveClass('spinner-border');

    rerender(
      <Spinner loading_state={{is_loading: false}} debounce={1000}>
        Some spinner content
      </Spinner>
    );

    expect(overAll).toHaveTextContent('Some spinner content');
    expect(spinner.firstChild).toHaveClass('spinner-border');

    act(() => jest.advanceTimersByTime(1000));

    expect(container.querySelector('div.spinner-border')).toBe(null);
  });
});
