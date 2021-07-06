import React from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import {Card as RSCard} from 'reactstrap';
import {bootstrapColors} from '../../private/BootstrapColors';

/**
 * Component for creating Bootstrap cards. Use in conjunction with CardBody,
 * CardImg, CardLink, CardHeader and CardFooter. Can also be used in
 * conjunction with CardColumns, CardDeck, CardGroup for different layout
 * options.
 */
const Card = (props) => {
  const {
    children,
    color,
    style,
    loading_state,
    className,
    class_name,
    ...otherProps
  } = props;
  const isBootstrapColor = bootstrapColors.has(color);
  return (
    <RSCard
      data-dash-is-loading={
        (loading_state && loading_state.is_loading) || undefined
      }
      color={isBootstrapColor ? color : null}
      style={!isBootstrapColor ? {backgroundColor: color, ...style} : style}
      className={class_name || className}
      {...omit(['setProps'], otherProps)}
    >
      {children}
    </RSCard>
  );
};

Card.propTypes = {
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
   * Card color, options: primary, secondary, success, info, warning, danger,
   * light, dark or any valid CSS color of
   * your choice (e.g. a hex code, a decimal code or a CSS color name).
   * Default is light.
   */
  color: PropTypes.string,

  /**
   * Apply the `card-body` class to the card, so that there is no need to also
   * include a CardBody component in the children of this Card. Default: False
   */
  body: PropTypes.bool,

  /**
   * Apply color styling to just the border of the card.
   */
  outline: PropTypes.bool,

  /**
   * Invert text colours for use with a darker background.
   */
  inverse: PropTypes.bool,

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

export default Card;
