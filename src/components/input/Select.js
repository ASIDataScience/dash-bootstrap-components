import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import {CustomInput} from 'reactstrap';

/**
 * Create a HTML select element with Bootstrap styles. Specify options as a
 * list of dictionaries with keys label, value and disabled.
 */
const Select = (props) => {
  const {className, class_name, ...otherProps} = props;

  const [value, setValue] = useState(props.value || '');

  const handleChange = (e) => {
    setValue(e.target.value);
    if (props.setProps) {
      props.setProps({value: e.target.value});
    }
  };

  useEffect(() => {
    if (props.value !== value) {
      setValue(props.value || '');
    }
  }, [props.value]);

  return (
    <CustomInput
      {...omit(
        [
          'value',
          'setProps',
          'bs_size',
          'options',
          'persistence',
          'persistence_type',
          'persisted_props',
          'loading_state',
        ],
        otherProps
      )}
      type="select"
      onChange={handleChange}
      value={value}
      bsSize={props.bs_size}
      className={class_name || className}
    >
      <option value="" disabled hidden>
        {props.placeholder}
      </option>
      {props.options &&
        props.options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            title={option.title}
          >
            {option.label}
          </option>
        ))}
    </CustomInput>
  );
};

Select.defaultProps = {
  value: '',
  persisted_props: ['value'],
  persistence_type: 'local',
  placeholder: '',
};

Select.propTypes = {
  /**
   * The ID of this component, used to identify dash components
   * in callbacks. The ID needs to be unique across all of the
   * components in an app.
   */
  id: PropTypes.string,

  /**
   * Defines CSS styles which will override styles previously set.
   */
  style: PropTypes.object,

  /**
   * Often used with CSS to style elements with common properties.
   */
  class_name: PropTypes.string,

  /**
   * **DEPRECATED** Use `class_name` instead.
   *
   * Often used with CSS to style elements with common properties.
   */
  className: PropTypes.string,

  /**
   * A unique identifier for the component, used to improve
   * performance by React.js while rendering components
   * See https://reactjs.org/docs/lists-and-keys.html for more info
   */
  key: PropTypes.string,

  /**
   * Placeholder text to display before a selection is made.
   */
  placeholder: PropTypes.string,

  /**
   * The value of the currently selected option.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * An array of options for the select
   */
  options: PropTypes.arrayOf(
    PropTypes.exact({
      /**
       * The options's label
       */
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,

      /**
       * The value of the option. This value corresponds to the items
       * specified in the `value` property.
       */
      value: PropTypes.string.isRequired,

      /**
       * If true, this checkbox is disabled and can't be clicked on.
       */
      disabled: PropTypes.bool,

      /**
       * The HTML 'title' attribute for the option. Allows for information on
       * hover. For more information on this attribute, see
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title
       */
      title: PropTypes.string,
    })
  ),

  /**
   * Set to True to disable the Select.
   */
  disabled: PropTypes.bool,

  /**
   * This attribute specifies that the user must fill in a value before
   * submitting a form. It cannot be used when the type attribute is hidden,
   * image, or a button type (submit, reset, or button). The :optional and
   * :required CSS pseudo-classes will be applied to the field as appropriate.
   * required is an HTML boolean attribute - it is enabled by a boolean or
   * 'required'. Alternative capitalizations `REQUIRED`
   * are also acccepted.
   */
  required: PropTypes.oneOfType([
    PropTypes.oneOf(['required', 'REQUIRED']),
    PropTypes.bool,
  ]),

  /**
   * Apply valid style to the Input for feedback purposes. This will cause
   * any FormFeedback in the enclosing FormGroup with valid=True to display.
   */
  valid: PropTypes.bool,

  /**
   * Apply invalid style to the Input for feedback purposes. This will cause
   * any FormFeedback in the enclosing FormGroup with valid=False to display.
   */
  invalid: PropTypes.bool,

  /**
   * Set the size of the Input. Options: 'sm' (small), 'md' (medium)
   * or 'lg' (large). Default is 'md'.
   */
  bs_size: PropTypes.string,

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

export default Select;
