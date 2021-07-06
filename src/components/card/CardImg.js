import React from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import {CardImg as RSCardImg} from 'reactstrap';

/**
 * Use CardImg to add images to your cards.
 */
const CardImg = (props) => {
  const {children, loading_state, className, class_name, ...otherProps} = props;
  return (
    <RSCardImg
      data-dash-is-loading={
        (loading_state && loading_state.is_loading) || undefined
      }
      className={class_name || className}
      {...omit(['setProps'], otherProps)}
    >
      {children}
    </RSCardImg>
  );
};

CardImg.propTypes = {
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
   * HTML tag to use for the card body, default: div
   */
  tag: PropTypes.string,

  /**
   * Set to True if image is at top of card. This will apply the card-img-top
   * class which rounds the top corners to match the corners of the card.
   */
  top: PropTypes.bool,

  /**
   * Set to True if image is at bottom of card. This will apply the
   * card-img-bottom class which rounds the bottom corners to match the corners
   * of the card.
   */
  bottom: PropTypes.bool,

  /**
   * The URI of the embeddable content.
   */
  src: PropTypes.string,

  /**
   * Alternative text in case an image can't be displayed.
   */
  alt: PropTypes.string,

  /**
   * Text to be displayed as a tooltip when hovering
   */
  title: PropTypes.string,

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

export default CardImg;
