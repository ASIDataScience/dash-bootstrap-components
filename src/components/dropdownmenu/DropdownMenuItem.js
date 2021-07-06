import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import {DropdownItem as RSDropdownItem} from 'reactstrap';

import Link, {isExternalLink} from '../../private/Link';
import {DropdownMenuContext} from '../../private/DropdownMenuContext';

/**
 * Use DropdownMenuItem to build up the content of a DropdownMenu.
 */
const DropdownMenuItem = (props) => {
  let {
    children,
    href,
    loading_state,
    target,
    disabled,
    n_clicks,
    toggle,
    setProps,
    className,
    class_name,
    ...otherProps
  } = props;

  const context = useContext(DropdownMenuContext);

  const handleClick = (e) => {
    if (!disabled && setProps) {
      setProps({
        n_clicks: n_clicks + 1,
        n_clicks_timestamp: Date.now(),
      });
    }
    if (props.href) {
      if (toggle && context.isOpen) {
        context.toggle(e);
      }
    }
  };

  const useLink = href && !disabled;
  otherProps[useLink ? 'preOnClick' : 'onClick'] = (e) => handleClick(e);
  return (
    <RSDropdownItem
      tag={useLink ? Link : 'button'}
      // don't pass href if disabled otherwise reactstrap renders item
      // as link and the cursor becomes a pointer on hover
      href={disabled ? null : href}
      disabled={disabled}
      target={useLink && target}
      toggle={toggle}
      className={class_name || className}
      {...omit(['setProps'], otherProps)}
      data-dash-is-loading={
        (loading_state && loading_state.is_loading) || undefined
      }
    >
      {children}
    </RSDropdownItem>
  );
};

DropdownMenuItem.propTypes = {
  /**
   * The ID of this component, used to identify dash components
   * in callbacks. The ID needs to be unique across all of the
   * components in an app.
   */
  id: PropTypes.string,

  /**
   * The children of this component.
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
   * Style this item as 'active'.
   */
  active: PropTypes.bool,

  /**
   * Style this item as 'disabled'.
   */
  disabled: PropTypes.bool,

  /**
   * Set to True if this entry is a divider. Typically, it will have
   * no children.
   */
  divider: PropTypes.bool,

  /**
   * Set to True if this is a header, rather than a conventional
   * menu item.
   */
  header: PropTypes.bool,

  /**
   * Pass a URL (relative or absolute) to make the menu entry a link.
   */
  href: PropTypes.string,

  /**
   * Whether to toggle the DropdownMenu on click. Default: True.
   */
  toggle: PropTypes.bool,

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

DropdownMenuItem.defaultProps = {
  n_clicks: 0,
  n_clicks_timestamp: -1,
  toggle: true,
};

export default DropdownMenuItem;
