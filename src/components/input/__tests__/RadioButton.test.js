import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RadioButton from '../RadioButton';

describe('RadioButton', () => {
  test('renders a radio button', () => {
    const {
      container: {firstChild: radioButton},
    } = render(<RadioButton />);

    expect(radioButton).toHaveAttribute('type', 'radio');
  });

  test('passes checked prop on to underlying HTML element', () => {
    const {
      container: {firstChild: radioButton},
      rerender,
    } = render(<RadioButton />);
    expect(radioButton.checked).toEqual(false);

    rerender(<RadioButton checked />);
    expect(radioButton.checked).toEqual(true);

    rerender(<RadioButton checked={false} />);
    expect(radioButton.checked).toEqual(false);
  });

  test('dispatches updates to setProps if set', () => {
    const mockSetProps = jest.fn();
    const {
      container: {firstChild: radioButton},
      rerender,
    } = render(<RadioButton setProps={mockSetProps} />);

    userEvent.click(radioButton);
    expect(mockSetProps.mock.calls).toHaveLength(1);

    // props passed to setProps get passed back to the component by Dash renderer
    const arg1 = mockSetProps.mock.calls[0][0];
    rerender(<RadioButton setProps={mockSetProps} {...arg1} />);

    userEvent.click(radioButton);
    expect(mockSetProps.mock.calls).toHaveLength(2);

    const arg2 = mockSetProps.mock.calls[1][0];

    expect(arg1.checked).toEqual(true);
    expect(arg2.checked).toEqual(false);
  });
});
