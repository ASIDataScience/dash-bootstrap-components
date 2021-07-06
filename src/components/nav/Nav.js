import React from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import {Nav as RSNav} from 'reactstrap';

/**
 * Nav can be used to group together a collection of navigation links.
 */
const Nav = props => {
  const {children, loading_state, className, class_name, ...otherProps} = props;
  return (
    <RSNav
      className={class_name || className}
      {...omit(['setProps'], otherProps)}
      data-dash-is-loading={
        (loading_state && loading_state.is_loading) || undefined
      }
    >
      {children}
    </RSNav>
  );
};

Nav.propTypes = {
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
   * Apply pill styling to nav items. Active items will be indicated by a pill.
   */
  pills: PropTypes.bool,

  /**
   * Set to True when using Nav with pills styling inside a CardHeader.
   */
  card: PropTypes.bool,

  /**
   * Expand the nav items to fill available horizontal space.
   */
  fill: PropTypes.bool,

  /**
   * Expand the nav items to fill available horizontal space, making sure
   * every nav item has the same width.
   */
  justified: PropTypes.bool,

  /**
   * Stack NavItems vertically. Set to True for a vertical Nav on all screen
   * sizes, or pass one of the Bootstrap breakpoints ('xs', 'sm', 'md', 'lg',
   * 'xl') for a Nav which is vertical at that breakpoint and above, and
   * horizontal on smaller screens.
   */
  vertical: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  /**
   * Specify the horizontal alignment of the NavItems. Options are 'start',
   * 'center', or 'end'.
   */
  horizontal: PropTypes.oneOf(['start', 'center', 'end', 'between', 'around']),

  /**
   * Set to True if using Nav in Navbar component. This applies the `navbar-nav`
   * class to the Nav which uses more lightweight styles to match the parent
   * Navbar better.
   */
  navbar: PropTypes.bool,

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
    component_name: PropTypes.string
  })
};

export default Nav;
