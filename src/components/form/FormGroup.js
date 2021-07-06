import React from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import {FormGroup as RSFormGroup} from 'reactstrap';

/**
 * A component for grouping together inputs, labels, text and feedback.
 */
const FormGroup = (props) => {
  const {children, loading_state, className, class_name, ...otherProps} = props;
  return (
    <RSFormGroup
      className={class_name || className}
      {...omit(['setProps'], otherProps)}
      data-dash-is-loading={
        (loading_state && loading_state.is_loading) || undefined
      }
    >
      {children}
    </RSFormGroup>
  );
};

FormGroup.propTypes = {
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
   * Apply row class to FormGroup to allow labels and inputs to be displayed
   * horizontally in a row.
   */
  row: PropTypes.bool,

  /**
   * Apply `form-check` class instead of `form-group`. Useful when positioning
   * labels with checkbox / radio inputs. Usually it will be better to use the
   * pre-built dbc.Checklist or dbc.RadioItems components.
   */
  check: PropTypes.bool,

  /**
   * If check is True, apply the `form-check-inline` class in addition to
   * `form-check`. If you want to make an inline list of checkboxes / radios
   * we recommend using either dbc.Checklist or dbc.RadioItems with inline=True
   *
   * This prop has no effect if check=False.
   */
  inline: PropTypes.bool,

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

export default FormGroup;
