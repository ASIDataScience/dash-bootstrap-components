import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checklist from '../Checklist';

describe('Checklist', () => {
  describe('unstyled', () => {
    let checklist;
    let mockSetProps;

    beforeEach(() => {
      mockSetProps = jest.fn();
      checklist = render(
        <Checklist
          options={[
            {label: 'Item 1', value: 1},
            {label: 'Item 2', value: 2},
            {label: 'Disabled item', value: 3, disabled: true},
          ]}
          setProps={mockSetProps}
        />
      );
    });

    test('renders a checklist with items ordered correctly', () => {
      const [child1, child2, child3] = checklist.container.firstChild.children;

      expect(child1).toHaveClass('form-check');
      const [input1, label1] = child1.children;
      expect(input1).toHaveClass('form-check-input');
      expect(label1).toHaveClass('form-check-label');
      expect(label1).toHaveTextContent('Item 1');
      expect(input1.disabled).toEqual(false);

      expect(child2).toHaveClass('form-check');
      const [input2, label2] = child2.children;
      expect(input2).toHaveClass('form-check-input');
      expect(label2).toHaveClass('form-check-label');
      expect(label2).toHaveTextContent('Item 2');
      expect(input2.disabled).toEqual(false);

      expect(child3).toHaveClass('form-check');
      const [input3, label3] = child3.children;
      expect(input3).toHaveClass('form-check-input');
      expect(label3).toHaveClass('form-check-label');
      expect(label3).toHaveTextContent('Disabled item');
      expect(input3.disabled).toEqual(true);
    });

    test('clicking a checkbox toggles its status unless disabled', () => {
      const [child1, child2, child3] = checklist.container.firstChild.children;
      const input1 = child1.firstChild;
      const input2 = child2.firstChild;
      const input3 = child3.firstChild;

      expect(input1.checked).toEqual(false);
      expect(input2.checked).toEqual(false);
      expect(input3.checked).toEqual(false);

      userEvent.click(input1);

      expect(mockSetProps.mock.calls).toHaveLength(1);
      const [{value: value1}] = mockSetProps.mock.calls[0];
      expect(value1).toEqual([1]);

      checklist.rerender(
        <Checklist
          options={[
            {label: 'Item 1', value: 1},
            {label: 'Item 2', value: 2},
            {label: 'Disabled item', value: 3, disabled: true},
          ]}
          setProps={mockSetProps}
          value={value1}
        />
      );

      expect(input1.checked).toEqual(true);
      expect(input2.checked).toEqual(false);
      expect(input3.checked).toEqual(false);

      userEvent.click(input2);

      expect(mockSetProps.mock.calls).toHaveLength(2);
      const [{value: value2}] = mockSetProps.mock.calls[1];
      expect(value2).toEqual([1, 2]);

      checklist.rerender(
        <Checklist
          options={[
            {label: 'Item 1', value: 1},
            {label: 'Item 2', value: 2},
            {label: 'Disabled item', value: 3, disabled: true},
          ]}
          setProps={mockSetProps}
          value={value2}
        />
      );

      expect(input1.checked).toEqual(true);
      expect(input2.checked).toEqual(true);
      expect(input3.checked).toEqual(false);

      userEvent.click(input3);

      expect(mockSetProps.mock.calls).toHaveLength(2);
      expect(input1.checked).toEqual(true);
      expect(input2.checked).toEqual(true);
      expect(input3.checked).toEqual(false);
    });

    test('clicking a label toggles its associated checkbox status', () => {
      const label1 = checklist.getByText('Item 1');
      const label2 = checklist.getByText('Item 2');
      const label3 = checklist.getByText('Disabled item');

      const [child1, child2, child3] = checklist.container.firstChild.children;
      const input1 = child1.firstChild;
      const input2 = child2.firstChild;
      const input3 = child3.firstChild;

      expect(input1.checked).toEqual(false);
      expect(input2.checked).toEqual(false);
      expect(input3.checked).toEqual(false);

      userEvent.click(label1);

      expect(mockSetProps.mock.calls).toHaveLength(1);
      const [{value: value1}] = mockSetProps.mock.calls[0];
      expect(value1).toEqual([1]);

      checklist.rerender(
        <Checklist
          options={[
            {label: 'Item 1', value: 1},
            {label: 'Item 2', value: 2},
            {label: 'Disabled item', value: 3, disabled: true},
          ]}
          setProps={mockSetProps}
          value={value1}
        />
      );

      expect(input1.checked).toEqual(true);
      expect(input2.checked).toEqual(false);
      expect(input3.checked).toEqual(false);

      userEvent.click(label2);

      expect(mockSetProps.mock.calls).toHaveLength(2);
      const [{value: value2}] = mockSetProps.mock.calls[1];
      expect(value2).toEqual([1, 2]);

      checklist.rerender(
        <Checklist
          options={[
            {label: 'Item 1', value: 1},
            {label: 'Item 2', value: 2},
            {label: 'Disabled item', value: 3, disabled: true},
          ]}
          setProps={mockSetProps}
          value={value2}
        />
      );

      expect(input1.checked).toEqual(true);
      expect(input2.checked).toEqual(true);
      expect(input3.checked).toEqual(false);

      userEvent.click(label3);

      expect(mockSetProps.mock.calls).toHaveLength(2);
      expect(input1.checked).toEqual(true);
      expect(input2.checked).toEqual(true);
      expect(input3.checked).toEqual(false);
    });

    test('renders an inline checklist with "inline" prop', () => {
      checklist.rerender(
        <Checklist
          options={[
            {label: 'Item 1', value: 1},
            {label: 'Item 2', value: 2},
            {label: 'Disabled item', value: 3, disabled: true},
          ]}
          setProps={mockSetProps}
          inline
        />
      );
      const [child1, child2, child3] = checklist.container.firstChild.children;

      expect(child1).toHaveClass('form-check form-check-inline');
      expect(child2).toHaveClass('form-check form-check-inline');
      expect(child3).toHaveClass('form-check form-check-inline');
    });

    test('applies additional styles and class names to checked labels', () => {
      checklist.rerender(
        <Checklist
          options={[
            {label: 'Item 1', value: 1},
            {label: 'Item 2', value: 2},
            {label: 'Disabled item', value: 3, disabled: true},
          ]}
          setProps={mockSetProps}
          value={[2]}
          label_checked_class_name="a-checked-label"
          label_checked_style={{color: 'green'}}
        />
      );
      const [child1, child2, child3] = checklist.container.firstChild.children;

      const label1 = child1.children[1];
      expect(label1).not.toHaveClass('a-checked-label');
      expect(label1).not.toHaveStyle('color:green;');

      const label2 = child2.children[1];
      expect(label2).toHaveClass('a-checked-label');
      expect(label2).toHaveStyle('color:green;');

      const label3 = child3.children[1];
      expect(label3).not.toHaveClass('a-checked-label');
      expect(label3).not.toHaveStyle('color:green;');
    });
  });

  describe('custom checklist', () => {
    let checklist;
    let mockSetProps;

    beforeEach(() => {
      mockSetProps = jest.fn();
      checklist = render(
        <Checklist
          id="test-id"
          options={[
            {label: 'Item 1', value: 1},
            {label: 'Item 2', value: 2},
            {label: 'Disabled item', value: 3, disabled: true},
          ]}
          setProps={mockSetProps}
        />
      );
    });

    test('renders a checklist with items ordered correctly', () => {
      const [child1, child2, child3] = checklist.container.firstChild.children;

      expect(child1).toHaveClass('custom-checkbox custom-control');
      const [input1, label1] = child1.children;
      expect(input1).toHaveClass('custom-control-input');
      expect(label1).toHaveClass('custom-control-label');
      expect(label1).toHaveTextContent('Item 1');
      expect(input1.disabled).toEqual(false);

      expect(child2).toHaveClass('custom-checkbox custom-control');
      const [input2, label2] = child2.children;
      expect(input2).toHaveClass('custom-control-input');
      expect(label2).toHaveClass('custom-control-label');
      expect(label2).toHaveTextContent('Item 2');
      expect(input2.disabled).toEqual(false);

      expect(child3).toHaveClass('custom-checkbox custom-control');
      const [input3, label3] = child3.children;
      expect(input3).toHaveClass('custom-control-input');
      expect(label3).toHaveClass('custom-control-label');
      expect(label3).toHaveTextContent('Disabled item');
      expect(input3.disabled).toEqual(true);
    });

    test('renders switches with the "switch" prop', () => {
      checklist.rerender(
        <Checklist
          id="test-id"
          options={[
            {label: 'Item 1', value: 1},
            {label: 'Item 2', value: 2},
            {label: 'Disabled item', value: 3, disabled: true},
          ]}
          setProps={mockSetProps}
          switch
        />
      );
      const [child1, child2, child3] = checklist.container.firstChild.children;

      expect(child1).toHaveClass('custom-switch custom-control');
      expect(child2).toHaveClass('custom-switch custom-control');
      expect(child3).toHaveClass('custom-switch custom-control');
    });

    test('clicking a checkbox toggles its status', () => {
      const [child1, child2, child3] = checklist.container.firstChild.children;
      const input1 = child1.firstChild;
      const input2 = child2.firstChild;
      const input3 = child3.firstChild;

      expect(input1.checked).toEqual(false);
      expect(input2.checked).toEqual(false);
      expect(input3.checked).toEqual(false);

      userEvent.click(input1);

      expect(mockSetProps.mock.calls).toHaveLength(1);
      const [{value: value1}] = mockSetProps.mock.calls[0];
      expect(value1).toEqual([1]);

      checklist.rerender(
        <Checklist
          id="test-id"
          options={[
            {label: 'Item 1', value: 1},
            {label: 'Item 2', value: 2},
            {label: 'Disabled item', value: 3, disabled: true},
          ]}
          setProps={mockSetProps}
          value={value1}
        />
      );

      expect(input1.checked).toEqual(true);
      expect(input2.checked).toEqual(false);
      expect(input3.checked).toEqual(false);

      userEvent.click(input2);

      expect(mockSetProps.mock.calls).toHaveLength(2);
      const [{value: value2}] = mockSetProps.mock.calls[1];
      expect(value2).toEqual([1, 2]);

      checklist.rerender(
        <Checklist
          id="test-id"
          options={[
            {label: 'Item 1', value: 1},
            {label: 'Item 2', value: 2},
            {label: 'Disabled item', value: 3, disabled: true},
          ]}
          setProps={mockSetProps}
          value={value2}
        />
      );

      expect(input1.checked).toEqual(true);
      expect(input2.checked).toEqual(true);
      expect(input3.checked).toEqual(false);

      userEvent.click(input3);

      expect(mockSetProps.mock.calls).toHaveLength(2);
      expect(input1.checked).toEqual(true);
      expect(input2.checked).toEqual(true);
      expect(input3.checked).toEqual(false);
    });

    test('clicking a label toggles its associated checkbox status', () => {
      const label1 = checklist.getByText('Item 1');
      const label2 = checklist.getByText('Item 2');
      const label3 = checklist.getByText('Disabled item');

      const [child1, child2, child3] = checklist.container.firstChild.children;
      const input1 = child1.firstChild;
      const input2 = child2.firstChild;
      const input3 = child3.firstChild;

      expect(input1.checked).toEqual(false);
      expect(input2.checked).toEqual(false);
      expect(input3.checked).toEqual(false);

      userEvent.click(label1);

      expect(mockSetProps.mock.calls).toHaveLength(1);
      const [{value: value1}] = mockSetProps.mock.calls[0];
      expect(value1).toEqual([1]);

      checklist.rerender(
        <Checklist
          id="test-id"
          options={[
            {label: 'Item 1', value: 1},
            {label: 'Item 2', value: 2},
            {label: 'Disabled item', value: 3, disabled: true},
          ]}
          setProps={mockSetProps}
          value={value1}
        />
      );

      expect(input1.checked).toEqual(true);
      expect(input2.checked).toEqual(false);
      expect(input3.checked).toEqual(false);

      userEvent.click(label2);

      expect(mockSetProps.mock.calls).toHaveLength(2);
      const [{value: value2}] = mockSetProps.mock.calls[1];
      expect(value2).toEqual([1, 2]);

      checklist.rerender(
        <Checklist
          id="test-id"
          options={[
            {label: 'Item 1', value: 1},
            {label: 'Item 2', value: 2},
            {label: 'Disabled item', value: 3, disabled: true},
          ]}
          setProps={mockSetProps}
          value={value2}
        />
      );

      expect(input1.checked).toEqual(true);
      expect(input2.checked).toEqual(true);
      expect(input3.checked).toEqual(false);

      userEvent.click(label3);

      expect(mockSetProps.mock.calls).toHaveLength(2);
      expect(input3.checked).toEqual(false);
    });

    test('renders an inline checklist with "inline" prop', () => {
      checklist.rerender(
        <Checklist
          id="test-id"
          options={[
            {label: 'Item 1', value: 1},
            {label: 'Item 2', value: 2},
            {label: 'Disabled item', value: 3, disabled: true},
          ]}
          setProps={mockSetProps}
          inline
        />
      );
      const [child1, child2, child3] = checklist.container.firstChild.children;

      expect(child1).toHaveClass(
        'custom-checkbox custom-control custom-control-inline'
      );
      expect(child2).toHaveClass(
        'custom-checkbox custom-control custom-control-inline'
      );
      expect(child3).toHaveClass(
        'custom-checkbox custom-control custom-control-inline'
      );
    });

    test('applies additional styles and class names to checked labels', () => {
      checklist.rerender(
        <Checklist
          id="test-id"
          options={[
            {label: 'Item 1', value: 1},
            {label: 'Item 2', value: 2},
            {label: 'Disabled item', value: 3, disabled: true},
          ]}
          setProps={mockSetProps}
          value={[2]}
          label_checked_class_name="a-checked-label"
          label_checked_style={{color: 'green'}}
        />
      );
      const [child1, child2, child3] = checklist.container.firstChild.children;

      const label1 = child1.children[1];
      expect(label1).not.toHaveClass('a-checked-label');
      expect(label1).not.toHaveStyle('color:green;');

      const label2 = child2.children[1];
      expect(label2).toHaveClass('a-checked-label');
      expect(label2).toHaveStyle('color:green;');

      const label3 = child3.children[1];
      expect(label3).not.toHaveClass('a-checked-label');
      expect(label3).not.toHaveStyle('color:green;');
    });
  });
});
