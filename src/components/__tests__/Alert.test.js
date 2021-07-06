import React from 'react';
import {act, render} from '@testing-library/react';
import Alert from '../Alert';

jest.useFakeTimers();

describe('Alert', () => {
  test('renders a div with class "alert"', () => {
    const alert = render(<Alert />);

    expect(alert.container.querySelector('div.alert')).not.toBe(null);
  });

  test('renders its content', () => {
    const alert = render(<Alert>Some alert content</Alert>);

    expect(alert.container).toHaveTextContent('Some alert content');
  });

  test('does not render if is_open=false', () => {
    const alert = render(<Alert is_open={false} />);

    expect(alert.container.querySelector('.alert')).toBe(null);
  });

  test('applies contextual colors with "color" prop', () => {
    const {
      container: {firstChild: alertSuccess},
    } = render(<Alert />);
    const {
      container: {firstChild: alertPrimary},
    } = render(<Alert color="primary" />);
    const {
      container: {firstChild: alertDanger},
    } = render(<Alert color="danger" />);
    const {
      container: {firstChild: alertDark},
    } = render(<Alert color="dark" />);

    expect(alertSuccess).toHaveClass('alert-success');
    expect(alertPrimary).toHaveClass('alert-primary');
    expect(alertDanger).toHaveClass('alert-danger');
    expect(alertDark).toHaveClass('alert-dark');
  });

  test('applies custom color with "color" prop', () => {
    const {
      container: {firstChild: alert},
    } = render(<Alert color="#FA7268" />);

    expect(alert).toHaveStyle('background-color: #FA7268;');
  });

  test('renders a dismiss button with dismissable=true', () => {
    const alertDismissable = render(<Alert dismissable />);

    expect(alertDismissable.container.querySelector('button.close')).not.toBe(
      null
    );
  });

  test('self dismisses if duration is set', () => {
    const mockSetProps = jest.fn();
    const alert = render(<Alert duration={5000} setProps={mockSetProps} />);

    // alert exists and timeout is set with duration 5000
    expect(alert.container.querySelector('.alert')).not.toBe(null);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 5000);

    act(() => jest.advanceTimersByTime(4000));
    // alert hasn't dismissed yet
    expect(mockSetProps.mock.calls).toHaveLength(0);

    act(() => jest.advanceTimersByTime(1000));
    // alert has dismissed
    expect(mockSetProps.mock.calls).toHaveLength(1);
    expect(mockSetProps.mock.calls[0][0]).toEqual({is_open: false});

    alert.rerender(
      <Alert duration={5000} setProps={mockSetProps} is_open={false} />
    );

    // necessary to skip over fade animation
    act(() => jest.runAllTimers());

    // after timeout has run alert no longer displays
    expect(alert.container.querySelector('.alert')).toBe(null);
  });
});
