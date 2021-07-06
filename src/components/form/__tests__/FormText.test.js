import React from 'react';
import {render} from '@testing-library/react';
import FormText from '../FormText';

describe('FormText', () => {
  test('renders a small with class "form-text"', () => {
    const formText = render(<FormText />);

    expect(formText.container.querySelector('small.form-text')).not.toBe(null);
  });

  test('renders its content', () => {
    const formText = render(<FormText>Some form text content</FormText>);

    expect(formText.container).toHaveTextContent('Some form text content');
  });

  test('applies contextual colors with "color" prop', () => {
    const {
      container: {firstChild: formTextPrimary},
    } = render(<FormText color="primary" />);
    const {
      container: {firstChild: formTextSuccess},
    } = render(<FormText color="success" />);
    const {
      container: {firstChild: formTextDark},
    } = render(<FormText color="dark" />);

    expect(formTextPrimary).toHaveClass('text-primary');
    expect(formTextSuccess).toHaveClass('text-success');
    expect(formTextDark).toHaveClass('text-dark');
  });
});
