import React from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import {CardLink as RSCardLink} from 'reactstrap';
import Link from '../../private/Link';

/**
 * Use card link to add consistently styled links to your cards. Links can be
 * used like buttons, external links, or internal Dash style links.
 */
const CardLink = (props) => {
  const {
    children,
    loading_state,
    disabled,
    className,
    class_name,
    ...otherProps
  } = props;

  const incrementClicks = () => {
    if (!disabled && props.setProps) {
      props.setProps({
        n_clicks: props.n_clicks + 1,
        n_clicks_timestamp: Date.now(),
      });
    }
  };

  return (
    <RSCardLink
      data-dash-is-loading={
        (loading_state && loading_state.is_loading) || undefined
      }
      tag={Link}
      preOnClick={incrementClicks}
      disabled={disabled}
      className={class_name || className}
      {...omit(['setProps', 'n_clicks', 'n_clicks_timestamp'], otherProps)}
    >
      {children}
    </RSCardLink>
  );
};

CardLink.defaultProps = {
  n_clicks: 0,
  n_clicks_timestamp: -1,
};

CardLink.propTypes = {
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
   * URL of the resource to link to
   */
  href: PropTypes.string,

  /**
   * If true, the browser will treat this as an external link,
   * forcing a page refresh at the new location. If false,
   * this just changes the location without triggering a page
   * refresh. Use this if you are observing dcc.Location, for
   * instance. Defaults to true for absolute URLs and false
   * otherwise.
   */
  external_link: PropTypes.bool,

  /**
   * An integer that represents the number of times
   * that this element has been clicked on.
   */
  n_clicks: PropTypes.number,

  /**
   * An integer that represents the time (in ms since 1970)
   * at which n_clicks changed. This can be used to tell
   * which button was changed most recently.
   */
  n_clicks_timestamp: PropTypes.number,

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
   * Target attribute to pass on to the link. Only applies to external links.
   */
  target: PropTypes.string,
};

export default CardLink;
