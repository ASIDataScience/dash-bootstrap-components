import React from 'react';
import {render} from '@testing-library/react';
import Form from '../Form';

describe('Form', () => {
  test('renders a form', () => {
    const form = render(<Form />);

    expect(form.container.querySelector('form')).not.toBe(null);
  });

  test('renders its content', () => {
    const form = render(<Form>Some form content</Form>);

    expect(form.container).toHaveTextContent('Some form content');
  });

  test('applies form-inline class with "inline" prop', () => {
    const {
      container: {firstChild: form},
    } = render(<Form inline />);

    expect(form).toHaveClass('form-inline');
  });
});
