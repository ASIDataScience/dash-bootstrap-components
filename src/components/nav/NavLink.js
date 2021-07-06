import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import classNames from 'classnames';
import {History} from '@plotly/dash-component-plugins';
import Link from '../../private/Link';

/**
 * Add a link to a `Nav`. Can be used as a child of `NavItem` or of `Nav`
 * directly.
 */
const NavLink = (props) => {
  const [linkActive, setLinkActive] = useState(false);
  const {
    children,
    disabled,
    className,
    class_name,
    active,
    loading_state,
    setProps,
    n_clicks,
    href,
    ...otherProps
  } = props;

  const pathnameToActive = (pathname) => {
    setLinkActive(
      active === true ||
        (active === 'exact' && pathname === href) ||
        (active === 'partial' && pathname.startsWith(href))
    );
  };

  useEffect(() => {
    pathnameToActive(window.location.pathname);

    if (typeof active === 'string') {
      History.onChange(() => {
        pathnameToActive(window.location.pathname);
      });
    }
  }, [active]);

  const incrementClicks = () => {
    if (!disabled && setProps) {
      setProps({
        n_clicks: n_clicks + 1,
        n_clicks_timestamp: Date.now(),
      });
    }
  };

  const classes = classNames(class_name || className, 'nav-link', {
    active: linkActive,
    disabled,
  });

  return (
    <Link
      className={classes}
      disabled={disabled}
      preOnClick={incrementClicks}
      href={href}
      {...omit(['n_clicks_timestamp'], otherProps)}
      data-dash-is-loading={
        (loading_state && loading_state.is_loading) || undefined
      }
    >
      {children}
    </Link>
  );
};

NavLink.defaultProps = {
  active: false,
  disabled: false,
  n_clicks: 0,
  n_clicks_timestamp: -1,
};

NavLink.propTypes = {
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
   * The URL of the linked resource.
   */
  href: PropTypes.string,

  /**
   * Apply 'active' style to this component. Set to "exact" to automatically
   * toggle active status when the current pathname matches href, or to
   * "partial" to automatically toggle on a partial match. Assumes that href is
   * a relative url such as /link rather than an absolute such as
   * https://example.com/link
   *
   * For example
   * - dbc.NavLink(..., href="/my-page", active="exact") will be active on
   *   "/my-page" but not "/my-page/other" or "/random"
   * - dbc.NavLink(..., href="/my-page", active="partial") will be active on
   *   "/my-page" and "/my-page/other" but not "/random"
   */
  active: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['partial', 'exact']),
  ]),

  /**
   * Disable the link
   */
  disabled: PropTypes.bool,

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

export default NavLink;
