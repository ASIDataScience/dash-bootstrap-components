import React from 'react';
import {render} from '@testing-library/react';
import Label from '../Label';

describe('Label', () => {
  test('renders a label', () => {
    const label = render(<Label>A test label</Label>);

    expect(label.container.querySelector('label')).not.toBe(null);
    expect(label.container).toHaveTextContent('A test label');
  });

  test('applies layout classes correctly', () => {
    const {
      container: {firstChild: label},
    } = render(<Label md={{size: 6, order: 2, offset: 3}} align="end" />);

    expect(label).toHaveClass(
      'align-self-end col-md-6 order-md-2 offset-md-3 col-form-label'
    );
  });

  test('applies CSS size classes', () => {
    const {
      container: {firstChild: labelSm},
    } = render(<Label size="sm" />);
    const {
      container: {firstChild: labelLg},
    } = render(<Label size="lg" />);

    expect(labelSm).toHaveClass('col-form-label-sm');
    expect(labelLg).toHaveClass('col-form-label-lg');
  });

  test('applies contextual colors with "color" prop', () => {
    const {
      container: {firstChild: labelPrimary},
    } = render(<Label color="primary" />);
    const {
      container: {firstChild: labelSuccess},
    } = render(<Label color="success" />);
    const {
      container: {firstChild: labelDark},
    } = render(<Label color="dark" />);

    expect(labelPrimary).toHaveClass('text-primary');
    expect(labelSuccess).toHaveClass('text-success');
    expect(labelDark).toHaveClass('text-dark');
  });

  test('applies custom color with "color" prop', () => {
    const {
      container: {firstChild: button},
    } = render(<Label color="#FA7268" />);

    expect(button).toHaveStyle('color: #FA7268;');
  });
});
