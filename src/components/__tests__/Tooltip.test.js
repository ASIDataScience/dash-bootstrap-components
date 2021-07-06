import React from 'react';
import {act, fireEvent, render} from '@testing-library/react';
import Tooltip from '../Tooltip';

jest.useFakeTimers();

jest.mock('popper.js', () => {
  const PopperJS = jest.requireActual('popper.js');

  return class {
    static placements = PopperJS.placements;

    constructor() {
      return {
        destroy: () => {},
        scheduleUpdate: () => {},
      };
    }
  };
});

describe('Tooltip', () => {
  let div;

  beforeAll(() => {
    div = document.createElement('div');
    div.setAttribute('id', 'test-target');
  });

  test('renders nothing by default', () => {
    render(<Tooltip target="test-target" />, {
      container: document.body.appendChild(div),
    });

    expect(document.body.querySelector('.tooltip')).toBe(null);
    expect(document.body.querySelector('.tooltip-inner')).toBe(null);
  });

  test('renders a div with class "tooltip", and inner div with class "tooltip-inner" on mouseOver', () => {
    render(<Tooltip target="test-target" />, {
      container: document.body.appendChild(div),
    });

    fireEvent.mouseOver(div);
    act(() => jest.runAllTimers());

    expect(document.body.querySelector('div.tooltip')).not.toBe(null);
    expect(document.body.querySelector('div.tooltip-inner')).not.toBe(null);

    fireEvent.mouseLeave(div);
    act(() => jest.runAllTimers());

    expect(document.body.querySelector('.tooltip')).toBe(null);
    expect(document.body.querySelector('.tooltip-inner')).toBe(null);
  });

  test('renders a div with class "tooltip", and inner div with class "tooltip-inner" on focusIn', () => {
    render(<Tooltip target="test-target" />, {
      container: document.body.appendChild(div),
    });

    fireEvent.focusIn(div);
    act(() => jest.runAllTimers());

    expect(document.body.querySelector('div.tooltip')).not.toBe(null);
    expect(document.body.querySelector('div.tooltip-inner')).not.toBe(null);

    fireEvent.focusOut(div);
    act(() => jest.runAllTimers());

    expect(document.body.querySelector('.tooltip')).toBe(null);
    expect(document.body.querySelector('.tooltip-inner')).toBe(null);
  });

  test('renders its content', () => {
    render(<Tooltip target="test-target">Tooltip content</Tooltip>, {
      container: document.body.appendChild(div),
    });

    fireEvent.mouseOver(div);
    act(() => jest.runAllTimers());

    expect(document.body.querySelector('.tooltip-inner')).toHaveTextContent(
      'Tooltip content'
    );
  });
});
