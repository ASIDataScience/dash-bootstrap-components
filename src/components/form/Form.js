import React from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import {Form as RSForm} from 'reactstrap';

/**
 * The Form component can be used to organise collections of input components
 * and apply consistent styling.
 */
const Form = (props) => {
  const {
    children,
    loading_state,
    n_submit,
    prevent_default_on_submit,
    setProps,
    className,
    class_name,
    ...otherProps
  } = props;
  return (
    <RSForm
      onSubmit={(e) => {
        if (prevent_default_on_submit) {
          e.preventDefault();
        }
        if (setProps) {
          setProps({
            n_submit: n_submit + 1,
            n_submit_timestamp: Date.now(),
          });
        }
      }}
      className={class_name || className}
      {...omit(['n_submit_timestamp'], otherProps)}
      data-dash-is-loading={
        (loading_state && loading_state.is_loading) || undefined
      }
    >
      {children}
    </RSForm>
  );
};

Form.defaultProps = {
  prevent_default_on_submit: true,
  n_submit: 0,
  n_submit_timestamp: -1,
};

Form.propTypes = {
  /**
   * The ID of this component, used to identify dash components
   * in callbacks. The ID needs to be unique across all of the
   * components in an app.
   */
  id: PropTypes.string,

  /**
   * The children of this component
   */
  children: PropTypes.node,

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
   * The URI of a program that processes the information submitted via the form.
   */
  action: PropTypes.string,

  /**
   * Defines which HTTP method to use when submitting the form. Can be GET
   * (default) or POST.
   */
  method: PropTypes.oneOf(['GET', 'POST']),

  /**
   * Use inline=True to apply the `form-inline` class, allowing you to display
   * a series of labels, form controls, and buttons on a single horizontal row.
   * Form controls within inline forms vary slightly from their default states.
   */
  inline: PropTypes.bool,

  /**
   * Number of times the `Enter` key was pressed while the input had focus.
   */
  n_submit: PropTypes.number,

  /**
   * Last time that `Enter` was pressed.
   */
  n_submit_timestamp: PropTypes.number,

  /**
   * The form calls preventDefault on submit events. If you want form data to
   * be posted to the endpoint specified by `action` on submit events, set
   * prevent_default_on_submit to False. Defaults to True.
   */
  prevent_default_on_submit: PropTypes.bool,

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
};

export default Form;
