import React from 'react';
import {render} from '@testing-library/react';
import Progress from '../Progress';

describe('Progress', () => {
  test('renders a div with class "progress"', () => {
    const progress = render(<Progress />);

    expect(progress.container.querySelector('div.progress')).not.toBe(null);
    expect(
      progress.container.querySelector('div.progress > div.progress-bar')
    ).not.toBe(null);
  });

  test('sets progress with the "value" prop', () => {
    const {
      container: {firstChild: progress},
      rerender,
    } = render(<Progress value={50} />);

    expect(progress.firstChild).toHaveStyle({width: '50%'});

    rerender(<Progress value={75} />);

    expect(progress.firstChild).toHaveStyle({width: '75%'});
  });

  test('renders its content', () => {
    const {
      container: {firstChild: progress},
    } = render(<Progress value={25}>25%</Progress>);

    expect(progress.firstChild).toHaveTextContent('25%');
  });

  test('applies contextual colors with "color" prop', () => {
    const {
      container: {firstChild: progressPrimary},
    } = render(<Progress color="primary" />);
    const {
      container: {firstChild: progressSuccess},
    } = render(<Progress color="success" />);
    const {
      container: {firstChild: progressDark},
    } = render(<Progress color="dark" />);

    expect(progressPrimary.firstChild).toHaveClass('bg-primary');
    expect(progressSuccess.firstChild).toHaveClass('bg-success');
    expect(progressDark.firstChild).toHaveClass('bg-dark');
  });

  test('bars can be nested with "bar" prop', () => {
    const {
      container: {firstChild: progress},
    } = render(
      <Progress multi>
        <Progress value={25} color="success" bar />
        <Progress value={25} color="warning" bar />
        <Progress value={25} color="danger" bar />
      </Progress>
    );

    expect(progress.children[0]).toHaveClass('progress-bar bg-success');
    expect(progress.children[0]).toHaveStyle({width: '25%'});
    expect(progress.children[1]).toHaveClass('progress-bar bg-warning');
    expect(progress.children[1]).toHaveStyle({width: '25%'});
    expect(progress.children[2]).toHaveClass('progress-bar bg-danger');
    expect(progress.children[2]).toHaveStyle({width: '25%'});
  });

  test('applies additional CSS classes when props are set', () => {
    // striped progress
    const {
      container: {firstChild: progressStriped},
    } = render(<Progress striped />);

    expect(progressStriped.firstChild).toHaveClass('progress-bar-striped');

    const {
      container: {firstChild: progressAnimated},
    } = render(<Progress striped animated />);

    expect(progressAnimated.firstChild).toHaveClass('progress-bar-animated');
  });

  test('sets className and style on the progress container and the bar', () => {
    const {
      container: {firstChild: progress},
    } = render(
      <Progress
        style={{height: '40px'}}
        className="outer"
        bar_style={{color: 'chartreuse'}}
        barClassName="inner"
      />
    );

    expect(progress).toHaveClass('outer');
    expect(progress).toHaveStyle('height:40px');

    expect(progress.firstChild).toHaveClass('progress-bar');
    expect(progress.firstChild).toHaveClass('inner');
    expect(progress.firstChild).toHaveStyle('color:chartreuse');
  });
});
