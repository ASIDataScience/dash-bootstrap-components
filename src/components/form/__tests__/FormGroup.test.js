import React from 'react';
import {render} from '@testing-library/react';
import FormGroup from '../FormGroup';

describe('FormGroup', () => {
  test('renders a div with class "form-group"', () => {
    const formGroup = render(<FormGroup />);

    expect(formGroup.container.querySelector('div.form-group')).not.toBe(null);
  });

  test('renders its content', () => {
    const formGroup = render(<FormGroup>Some form group content</FormGroup>);

    expect(formGroup.container).toHaveTextContent('Some form group content');
  });

  test('applies row class with "row" prop', () => {
    const {
      container: {firstChild: form},
    } = render(<FormGroup row />);

    expect(form).toHaveClass('row');
  });
});
