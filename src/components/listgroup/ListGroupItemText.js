import React from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import {ListGroupItemText as RSListGroupItemText} from 'reactstrap';
import classNames from 'classnames';
import {bootstrapTextColors} from '../../private/BootstrapColors';

/**
 * Apply consistent styling to text within a list group.
 */
const ListGroupItemText = (props) => {
  const {
    children,
    className,
    class_name,
    color,
    style,
    loading_state,
    ...otherProps
  } = props;
  const isBootstrapColor = bootstrapTextColors.has(color);
  const classes = classNames(
    class_name || className,
    color && isBootstrapColor && `text-${color}`
  );
  return (
    <RSListGroupItemText
      className={classes}
      style={!isBootstrapColor ? {color: color, ...style} : style}
      {...omit(['setProps'], otherProps)}
      data-dash-is-loading={
        (loading_state && loading_state.is_loading) || undefined
      }
    >
      {children}
    </RSListGroupItemText>
  );
};

ListGroupItemText.propTypes = {
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
   * HTML tag to use for the text, default: p
   */
  tag: PropTypes.string,

  /**
   * Text color, options: primary, secondary, success, warning, danger, info,
   * muted, light, dark, body, white, black-50, white-50.
   */
  color: PropTypes.string,

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

export default ListGroupItemText;
