import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Textarea from '../Textarea';

describe('Textarea', () => {
  test('renders a textarea with class "form-control"', () => {
    const textarea = render(<Textarea />);

    expect(textarea.container.querySelector('textarea.form-control')).not.toBe(
      null
    );
  });

  test('has no value by default', () => {
    const {
      container: {firstChild: textarea},
    } = render(<Textarea />);

    expect(textarea).not.toHaveValue();
  });

  test('passes value on to the underlying HTML textarea', () => {
    const {
      container: {firstChild: textarea},
      rerender,
    } = render(<Textarea value="some-textarea-value" />);

    expect(textarea).toHaveValue('some-textarea-value');

    rerender(<Textarea value="another-textarea-value" />);
    expect(textarea).toHaveValue('another-textarea-value');
  });

  test('passes HTML attributes on to underlying textarea', () => {
    const {
      container: {firstChild: textarea},
    } = render(
      <Textarea
        accesskey="k"
        cols="33"
        dir="ltr"
        disabled
        draggable
        form="form-id"
        lang="en-GB"
        maxlength="20"
        minlength="2"
        name="test-name"
        placeholder="test-placeholder"
        readonly
        required
        rows="6"
        spellcheck
        tabindex="3"
        title="test-title"
        wrap="hard"
      />
    );

    expect(textarea).toHaveAttribute('accesskey', 'k');
    expect(textarea).toHaveAttribute('cols', '33');
    expect(textarea).toHaveAttribute('dir', 'ltr');
    expect(textarea).toHaveAttribute('disabled');
    expect(textarea).toHaveAttribute('draggable', 'true');
    expect(textarea).toHaveAttribute('form', 'form-id');
    expect(textarea).toHaveAttribute('lang', 'en-GB');
    expect(textarea).toHaveAttribute('maxlength', '20');
    expect(textarea).toHaveAttribute('minlength', '2');
    expect(textarea).toHaveAttribute('name', 'test-name');
    expect(textarea).toHaveAttribute('placeholder', 'test-placeholder');
    expect(textarea).toHaveAttribute('readonly');
    expect(textarea).toHaveAttribute('spellcheck');
    expect(textarea).toHaveAttribute('tabindex', '3');
    expect(textarea).toHaveAttribute('title', 'test-title');
    expect(textarea).toHaveAttribute('wrap', 'hard');
  });

  test('sets validity using "valid" and "invalid" props', () => {
    const validTextarea = render(<Textarea valid />);
    const invalidTextarea = render(<Textarea invalid />);

    expect(validTextarea.container.firstChild).toHaveClass('is-valid');
    expect(invalidTextarea.container.firstChild).toHaveClass('is-invalid');
  });

  describe('setProps', () => {
    let textarea, mockSetProps;

    beforeEach(() => {
      mockSetProps = jest.fn();
      const {container} = render(<Textarea setProps={mockSetProps} />);
      textarea = container.firstChild;
    });

    test('tracks changes with "value" prop', () => {
      fireEvent.change(textarea, {
        target: {value: 'some-textarea-value'},
      });
      expect(mockSetProps.mock.calls).toHaveLength(1);
      expect(mockSetProps.mock.calls[0][0]).toEqual({
        value: 'some-textarea-value',
      });
      expect(textarea).toHaveValue('some-textarea-value');
    });

    test('dispatches update for each typed character', () => {
      userEvent.type(textarea, 'abc');

      expect(textarea).toHaveValue('abc');
      expect(mockSetProps.mock.calls).toHaveLength(3);

      const [call1, call2, call3] = mockSetProps.mock.calls;
      expect(call1).toEqual([{value: 'a'}]);
      expect(call2).toEqual([{value: 'ab'}]);
      expect(call3).toEqual([{value: 'abc'}]);
    });

    test('track number of blurs with "n_blur" and "n_blur_timestamp"', () => {
      const before = Date.now();
      fireEvent.blur(textarea);
      const after = Date.now();

      expect(mockSetProps.mock.calls).toHaveLength(1);

      const [[{n_blur, n_blur_timestamp}]] = mockSetProps.mock.calls;
      expect(n_blur).toEqual(1);
      expect(n_blur_timestamp).toBeGreaterThanOrEqual(before);
      expect(n_blur_timestamp).toBeLessThanOrEqual(after);
    });

    test('tracks submit with "n_submit" and "n_submit_timestamp"', () => {
      const before = Date.now();
      fireEvent.keyPress(textarea, {
        key: 'Enter',
        code: 13,
        charCode: 13,
      });
      const after = Date.now();

      expect(mockSetProps.mock.calls).toHaveLength(1);

      const [[{n_submit, n_submit_timestamp}]] = mockSetProps.mock.calls;
      expect(n_submit).toEqual(1);
      expect(n_submit_timestamp).toBeGreaterThanOrEqual(before);
      expect(n_submit_timestamp).toBeLessThanOrEqual(after);
    });

    test("don't increment n_submit if key is not Enter", () => {
      fireEvent.keyPress(textarea, {key: 'a', code: 65, charCode: 65});
      expect(mockSetProps.mock.calls).toHaveLength(0);
    });

    describe('debounce', () => {
      let textarea, mockSetProps;
      beforeEach(() => {
        mockSetProps = jest.fn();
        const {container} = render(
          <Textarea
            setProps={mockSetProps}
            value="some-textarea-value"
            debounce
          />
        );
        textarea = container.firstChild;
      });

      test("don't call setProps on change if debounce is true", () => {
        fireEvent.change(textarea, {
          target: {value: 'some-textarea-value'},
        });
        expect(mockSetProps.mock.calls).toHaveLength(0);
        expect(textarea).toHaveValue('some-textarea-value');
      });

      test('dispatch value on blur if debounce is true', () => {
        const before = Date.now();
        fireEvent.blur(textarea);
        const after = Date.now();

        expect(mockSetProps.mock.calls).toHaveLength(1);

        const [[{n_blur, n_blur_timestamp, value}]] = mockSetProps.mock.calls;
        expect(n_blur).toEqual(1);
        expect(n_blur_timestamp).toBeGreaterThanOrEqual(before);
        expect(n_blur_timestamp).toBeLessThanOrEqual(after);
        expect(value).toEqual('some-textarea-value');
      });

      test('dispatch value on submit if debounce is true', () => {
        const before = Date.now();
        fireEvent.keyPress(textarea, {
          key: 'Enter',
          code: 13,
          charCode: 13,
        });
        const after = Date.now();

        expect(mockSetProps.mock.calls).toHaveLength(1);

        const [[{n_submit, n_submit_timestamp, value}]] =
          mockSetProps.mock.calls;
        expect(n_submit).toEqual(1);
        expect(n_submit_timestamp).toBeGreaterThanOrEqual(before);
        expect(n_submit_timestamp).toBeLessThanOrEqual(after);
        expect(value).toEqual('some-textarea-value');
      });
    });
  });
});
