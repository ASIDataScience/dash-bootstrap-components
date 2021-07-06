import React from 'react';
import PropTypes from 'prop-types';
import {append, includes, without} from 'ramda';
import classNames from 'classnames';
import CustomInput from '../../private/CustomInput';

/**
 * Checklist is a component that encapsulates several checkboxes.
 * The values and labels of the checklist is specified in the `options`
 * property and the checked items are specified with the `value` property.
 * Each checkbox is rendered as an input / label pair.
 *
 * If `Checklist` is given an `id` (which is necessary for use in callbacks) it
 * will use Bootstrap's custom checkbox style, which hides the native browser
 * checkbox and renders a custom CSS alternative. See the Bootstrap docs for
 * details.
 *
 * https://getbootstrap.com/docs/4.4/components/forms/#checkboxes-and-radios-1
 */
const Checklist = (props) => {
  const {className, class_name, id, options, style, key, loading_state, name} =
    props;

  const listItem = (option) => {
    const {
      id,
      inputClassName,
      input_class_name,
      inputStyle,
      input_style,
      labelClassName,
      label_class_name,
      labelCheckedClassName,
      label_checked_class_name,
      labelStyle,
      label_style,
      labelCheckedStyle,
      label_checked_style,
      setProps,
      inline,
      value,
      custom,
      switch: switches,
    } = props;

    const checked = includes(option.value, value);

    const mergedLabelStyle = checked
      ? {
          ...(label_style || labelStyle),
          ...(label_checked_style || labelCheckedStyle),
        }
      : label_style || labelStyle;

    if (id && custom) {
      const inputId =
        option.input_id || `_dbcprivate_checklist_${id}_input_${option.value}`;
      return (
        <CustomInput
          id={inputId}
          name={name}
          value={option.value}
          labelId={option.label_id}
          checked={checked}
          className={input_class_name || inputClassName}
          disabled={Boolean(option.disabled)}
          type={switches ? 'switch' : 'checkbox'}
          label={option.label}
          labelStyle={mergedLabelStyle}
          labelClassName={classNames(
            label_class_name || labelClassName,
            checked && (label_checked_class_name || labelCheckedClassName)
          )}
          inline={inline}
          onChange={() => {
            let newValue;
            if (includes(option.value, value)) {
              newValue = without([option.value], value);
            } else {
              newValue = append(option.value, value);
            }
            setProps({value: newValue});
          }}
          key={option.value}
        />
      );
    } else {
      // it shouldn't ever really happen that an id isn't supplied, but in case
      // it isn't we use _dbcprivate_checklist
      const inputId =
        option.input_id || `_dbcprivate_checklist_${id}_input_${option.value}`;
      return (
        <div
          className={classNames('form-check', inline && 'form-check-inline')}
          key={option.value}
        >
          <input
            id={inputId}
            name={name}
            value={option.value}
            checked={checked}
            className={classNames(
              'form-check-input',
              input_class_name || inputClassName
            )}
            disabled={Boolean(option.disabled)}
            style={input_style || inputStyle}
            type="checkbox"
            onChange={() => {
              let newValue;
              if (includes(option.value, value)) {
                newValue = without([option.value], value);
              } else {
                newValue = append(option.value, value);
              }
              setProps({value: newValue});
            }}
          />
          <label
            id={option.label_id}
            style={mergedLabelStyle}
            className={classNames(
              'form-check-label',
              label_class_name || labelClassName,
              checked && (label_checked_class_name || labelCheckedClassName)
            )}
            key={option.value}
            htmlFor={inputId}
          >
            {option.label}
          </label>
        </div>
      );
    }
  };
  const items = options.map((option) => listItem(option));

  return (
    <div
      id={id}
      style={style}
      className={class_name || className}
      key={key}
      data-dash-is-loading={
        (loading_state && loading_state.is_loading) || undefined
      }
    >
      {items}
    </div>
  );
};

Checklist.propTypes = {
  /**
   * The ID of this component, used to identify dash components in callbacks.
   * The ID needs to be unique across all of the components in an app.
   */
  id: PropTypes.string,

  /**
   * An array of options
   */
  options: PropTypes.arrayOf(
    PropTypes.exact({
      /**
       * The checkbox's label
       */
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,

      /**
       * The value of the checkbox. This value corresponds to the items
       * specified in the `value` property.
       */
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,

      /**
       * If true, this checkbox is disabled and can't be clicked on.
       */
      disabled: PropTypes.bool,

      /**
       * id for this option's input, can be used to attach tooltips or apply
       * CSS styles
       */
      input_id: PropTypes.string,

      /**
       * id for this option's label, can be used to attach tooltips or apply
       * CSS styles
       */
      label_id: PropTypes.string,
    })
  ),

  /**
   * The currently selected value
   */
  value: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),

  /**
   * The class of the container (div)
   */
  class_name: PropTypes.string,

  /**
   * **DEPRECATED** Use `class_name` instead.
   *
   * The class of the container (div)
   */
  className: PropTypes.string,

  /**
   * The style of the container (div)
   */
  style: PropTypes.object,

  /**
   * A unique identifier for the component, used to improve
   * performance by React.js while rendering components
   * See https://reactjs.org/docs/lists-and-keys.html for more info
   */
  key: PropTypes.string,

  /**
   * The style of the <input> checkbox element. Only used if custom=False
   */
  input_style: PropTypes.object,

  /**
   * **DEPRECATED** Use `input_style` instead.
   *
   * The style of the <input> checkbox element. Only used if custom=False
   */
  inputStyle: PropTypes.object,

  /**
   * The class of the <input> checkbox element
   */
  input_class_name: PropTypes.string,

  /**
   * **DEPRECATED** Use `input_class_name` instead.
   *
   * The class of the <input> checkbox element
   */
  inputClassName: PropTypes.string,

  /**
   * Inline style arguments to apply to the <label> element for each item.
   */
  label_style: PropTypes.object,

  /**
   * **DEPRECATED** Use `label_style` instead.
   *
   * Inline style arguments to apply to the <label> element for each item.
   */
  labelStyle: PropTypes.object,

  /**
   * Additional inline style arguments to apply to <label> elements on checked
   * items.
   */
  label_checked_style: PropTypes.object,

  /**
   * **DEPRECATED** Use `label_checked_style` instead.
   *
   * Additional inline style arguments to apply to <label> elements on checked
   * items.
   */
  labelCheckedStyle: PropTypes.object,

  /**
   * CSS classes to apply to the <label> element for each item.
   */
  label_class_name: PropTypes.string,

  /**
   * **DEPRECATED** Use `label_class_name` instead.
   *
   * CSS classes to apply to the <label> element for each item.
   */
  labelClassName: PropTypes.string,

  /**
   * Additional CSS classes to apply to the <label> element when the
   * corresponding checkbox is checked.
   */
  label_checked_class_name: PropTypes.string,

  /**
   * **DEPRECATED** Use `label_checked_class_name` instead.
   *
   * Additional CSS classes to apply to the <label> element when the
   * corresponding checkbox is checked.
   */
  labelCheckedClassName: PropTypes.string,

  /**
   * Dash-assigned callback that gets fired when the value changes.
   */
  setProps: PropTypes.func,

  /**
   * Arrange Checklist inline
   */
  inline: PropTypes.bool,

  /**
   * Set to True to render toggle-like switches instead of checkboxes. Ignored
   * if custom=False
   */
  switch: PropTypes.bool,

  /**
   * RadioItems uses custom radio buttons by default. To use native radios set
   * custom to False.
   */
  custom: PropTypes.bool,

  /**
   * Object that holds the loading state object coming from dash-renderer
   */
  loading_state: PropTypes.shape({
    /**
     * Determines if the component is loading or not
     */
    is_loading: PropTypes.bool,
    /**
     * Holds which property is loading
     */
    prop_name: PropTypes.string,
    /**
     * Holds the name of the component that is loading
     */
    component_name: PropTypes.string,
  }),

  /**
   * Used to allow user interactions in this component to be persisted when
   * the component - or the page - is refreshed. If `persisted` is truthy and
   * hasn't changed from its previous value, a `value` that the user has
   * changed while using the app will keep that change, as long as
   * the new `value` also matches what was given originally.
   * Used in conjunction with `persistence_type`.
   */
  persistence: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
  ]),

  /**
   * Properties whose user interactions will persist after refreshing the
   * component or the page. Since only `value` is allowed this prop can
   * normally be ignored.
   */
  persisted_props: PropTypes.arrayOf(PropTypes.oneOf(['value'])),

  /**
   * Where persisted user changes will be stored:
   * memory: only kept in memory, reset on page refresh.
   * local: window.localStorage, data is kept after the browser quit.
   * session: window.sessionStorage, data is cleared once the browser quit.
   */
  persistence_type: PropTypes.oneOf(['local', 'session', 'memory']),

  /**
   * The name of the control, which is submitted with the form data.
   */
  name: PropTypes.string,
};

Checklist.defaultProps = {
  inputStyle: {},
  input_style: {},
  inputClassName: '',
  input_class_name: '',
  labelStyle: {},
  label_style: {},
  labelClassName: '',
  label_class_name: '',
  options: [],
  value: [],
  custom: true,
  persisted_props: ['value'],
  persistence_type: 'local',
};

export default Checklist;
