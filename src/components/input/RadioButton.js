import PropTypes from 'prop-types';
import {omit} from 'ramda';
import React, {useEffect, useState} from 'react';

/**
 * Creates a single radio button. Use the `checked` prop in your callbacks.
 */
const RadioButton = (props) => {
  const {
    checked,
    loading_state,
    disabled,
    setProps,
    className,
    class_name,
    ...otherProps
  } = props;
  const [checkedState, setCheckedState] = useState(checked || false);

  useEffect(() => {
    if (checked !== checkedState) {
      setCheckedState(checked || false);
    }
  }, [checked]);

  return (
    <input
      type="radio"
      checked={checkedState}
      className={class_name || className}
      {...omit(
        ['setProps', 'persistence', 'persistence_type', 'persisted_props'],
        otherProps
      )}
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          setCheckedState(!checkedState);
          if (setProps) {
            setProps({
              checked: !checkedState,
            });
          }
        }
      }}
      onChange={() => {}}
      data-dash-is-loading={
        (loading_state && loading_state.is_loading) || undefined
      }
    />
  );
};

RadioButton.defaultProps = {
  checked: false,
  persisted_props: ['checked'],
  persistence_type: 'local',
};

RadioButton.propTypes = {
  /**
   * The ID of this component, used to identify dash components in callbacks.
   * The ID needs to be unique across all of the components in an app.
   */
  id: PropTypes.string,

  /**
   * Whether RadioButton has been checked or not
   */
  checked: PropTypes.bool,

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
   * Dash-assigned callback that gets fired when the value changes.
   */
  setProps: PropTypes.func,

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
  persisted_props: PropTypes.arrayOf(PropTypes.oneOf(['checked'])),

  /**
   * Where persisted user changes will be stored:
   * memory: only kept in memory, reset on page refresh.
   * local: window.localStorage, data is kept after the browser quit.
   * session: window.sessionStorage, data is cleared once the browser quit.
   */
  persistence_type: PropTypes.oneOf(['local', 'session', 'memory']),

  /**
   * Disable the RadioButton.
   */
  disabled: PropTypes.bool,

  /**
   * The name of the control, which is submitted with the form data.
   */
  name: PropTypes.string,
};

export default RadioButton;
