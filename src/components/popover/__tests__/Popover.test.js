import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import Popover from '../Popover';

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

describe('Popover', () => {
  let div;

  beforeAll(() => {
    div = document.createElement('div');
    div.setAttribute('id', 'test-target');
  });

  test('renders a div with class "popover", and inner div with class "popover-inner"', () => {
    render(<Popover target="test-target" is_open />, {
      container: document.body.appendChild(div),
    });

    expect(document.body.querySelector('.popover')).not.toBe(null);
    expect(document.body.querySelector('.popover-inner')).not.toBe(null);
  });

  test('renders nothing if is_open=false', () => {
    render(<Popover target="test-target" is_open={false} />, {
      container: document.body.appendChild(div),
    });

    expect(document.body.querySelector('.popover')).toBe(null);
    expect(document.body.querySelector('.popover-inner')).toBe(null);
  });

  test('renders its content', () => {
    render(
      <Popover target="test-target" is_open={true}>
        Popover content
      </Popover>,
      {container: document.body.appendChild(div)}
    );

    expect(document.body.querySelector('.popover-inner')).toHaveTextContent(
      'Popover content'
    );
  });
});
