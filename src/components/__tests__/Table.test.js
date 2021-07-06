import React from 'react';
import {render} from '@testing-library/react';
import Table from '../Table';

describe('Table', () => {
  test('renders a table with class "table"', () => {
    const table = render(<Table />);

    expect(table.container.querySelector('table.table')).not.toBe(null);
  });

  test('renders its content', () => {
    const table = render(
      <Table>
        <tbody>
          <tr>
            <td>Table content</td>
          </tr>
        </tbody>
      </Table>
    );

    expect(table.container).toHaveTextContent('Table content');
  });

  test('applies additional CSS classes when props are set', () => {
    // bordered tables
    const {
      container: {firstChild: tableBordered},
    } = render(<Table bordered />);
    const {
      container: {firstChild: tableBorderless},
    } = render(<Table borderless />);

    expect(tableBordered).toHaveClass('table-bordered');
    expect(tableBorderless).toHaveClass('table-borderless');

    // table sizes
    const {
      container: {firstChild: tableSm},
    } = render(<Table size="sm" />);
    const {
      container: {firstChild: tableLg},
    } = render(<Table size="lg" />);

    expect(tableSm).toHaveClass('table-sm');
    expect(tableLg).toHaveClass('table-lg');

    // striped table
    const {
      container: {firstChild: tableStriped},
    } = render(<Table striped />);
    expect(tableStriped).toHaveClass('table-striped');

    // dark table
    const {
      container: {firstChild: tableDark},
    } = render(<Table dark />);
    expect(tableDark).toHaveClass('table-dark');

    // table with hover animations
    const {
      container: {firstChild: tableHover},
    } = render(<Table hover />);
    expect(tableHover).toHaveClass('table-hover');

    // responsive table
    const {
      container: {firstChild: tableResponsive},
      rerender,
    } = render(<Table responsive />);
    expect(tableResponsive).toHaveClass('table-responsive');

    rerender(<Table responsive="lg" />);
    expect(tableResponsive).toHaveClass('table-responsive-lg');
  });
});
