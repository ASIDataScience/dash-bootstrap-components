import React from 'react';
import {render} from '@testing-library/react';
import Col from '../Col';

describe('Col', () => {
  test('renders a div with class "col"', () => {
    const col = render(<Col />);

    expect(col.container.querySelector('div.col')).not.toBe(null);
  });

  test('renders its content', () => {
    const col = render(<Col>Some col content</Col>);

    expect(col.container).toHaveTextContent('Some col content');
  });

  test('sets width at all breakpoints', () => {
    const {
      container: {firstChild: colWidth},
    } = render(<Col width={4} />);
    const {
      container: {firstChild: colXs},
    } = render(<Col xs={8} />);
    const {
      container: {firstChild: colSm},
    } = render(<Col sm="auto" />);
    const {
      container: {firstChild: colMd},
    } = render(<Col md="3" />);
    const {
      container: {firstChild: colLg},
    } = render(<Col lg={7} />);
    const {
      container: {firstChild: colXl},
    } = render(<Col xl={true} />);

    expect(colWidth).toHaveClass('col-4');
    expect(colXs).toHaveClass('col-8');
    expect(colSm).toHaveClass('col-sm-auto');
    expect(colMd).toHaveClass('col-md-3');
    expect(colLg).toHaveClass('col-lg-7');
    expect(colXl).toHaveClass('col-xl');
  });

  test('sets width, order and offset if object passed', () => {
    const {
      container: {firstChild: colWidth},
    } = render(<Col width={{size: 4, order: 2, offset: 4}} />);
    const {
      container: {firstChild: colXs},
    } = render(<Col xs={{size: 8, order: 3, offset: 4}} />);
    const {
      container: {firstChild: colSm},
    } = render(<Col sm={{size: 'auto', order: 'last', offset: 12}} />);
    const {
      container: {firstChild: colMd},
    } = render(<Col md={{size: '3', order: 'first', offset: 1}} />);
    const {
      container: {firstChild: colLg},
    } = render(<Col lg={{size: 7, order: '2', offset: '4'}} />);
    const {
      container: {firstChild: colXl},
    } = render(<Col xl={{size: true, order: '12', offset: 1}} />);

    expect(colWidth).toHaveClass('col-4 order-2 offset-4');
    expect(colXs).toHaveClass('col-8 order-3 offset-4');
    expect(colSm).toHaveClass('col-sm-auto order-sm-last offset-sm-12');
    expect(colMd).toHaveClass('col-md-3 order-md-first offset-md-1');
    expect(colLg).toHaveClass('col-lg-7 order-lg-2 offset-lg-4');
    expect(colXl).toHaveClass('col-xl order-xl-12 offset-xl-1');
  });

  test('sets alignment classes with the "align" prop', () => {
    // col align
    const {
      container: {firstChild: colAlign},
    } = render(<Col align="center" />);

    expect(colAlign).toHaveClass('col align-self-center');
  });
});
