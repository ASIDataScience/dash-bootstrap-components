import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  test('renders a checkbox', () => {
    const checkbox = render(<Checkbox />);

    expect(checkbox.container.firstChild).toHaveAttribute('type', 'checkbox');
  });

  test('toggles checked value on click', () => {
    const {
      container: {firstChild: checkbox},
    } = render(<Checkbox />);
    expect(checkbox.checked).toEqual(false);

    userEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);

    userEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
  });

  test('dispatches updates to setProps if set', () => {
    const mockSetProps = jest.fn();
    const {
      container: {firstChild: checkbox},
      rerender,
    } = render(<Checkbox setProps={mockSetProps} />);

    userEvent.click(checkbox);
    expect(mockSetProps.mock.calls).toHaveLength(1);

    // props passed to setProps get passed back to the component by Dash renderer
    const arg1 = mockSetProps.mock.calls[0][0];
    rerender(<Checkbox setProps={mockSetProps} {...arg1} />);

    userEvent.click(checkbox);
    expect(mockSetProps.mock.calls).toHaveLength(2);

    const arg2 = mockSetProps.mock.calls[1][0];

    expect(arg1.checked).toEqual(true);
    expect(arg2.checked).toEqual(false);
  });
});
