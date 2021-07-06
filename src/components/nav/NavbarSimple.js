import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import {Collapse, Container, Navbar as RSNavbar} from 'reactstrap';
import {bootstrapColors} from '../../private/BootstrapColors';

import Nav from './Nav';
import NavbarBrand from './NavbarBrand';
import NavbarToggler from './NavbarToggler';

/**
 * A self-contained navbar ready for use. If you need more customisability try
 * `Navbar` instead.
 */
const NavbarSimple = (props) => {
  const {
    children,
    brand,
    brand_href,
    brand_style,
    brand_external_link,
    links_left,
    fluid,
    color,
    style,
    loading_state,
    className,
    class_name,
    ...otherProps
  } = props;
  const isBootstrapColor = bootstrapColors.has(color);

  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggle = () => setNavbarOpen(!navbarOpen);

  return (
    <RSNavbar
      color={isBootstrapColor ? color : null}
      style={!isBootstrapColor ? {backgroundColor: color, ...style} : style}
      className={class_name || className}
      {...omit(['setProps'], otherProps)}
      data-dash-is-loading={
        (loading_state && loading_state.is_loading) || undefined
      }
    >
      <Container fluid={fluid}>
        {brand && (
          <NavbarBrand
            href={brand_href}
            style={brand_style}
            external_link={brand_external_link}
          >
            {brand}
          </NavbarBrand>
        )}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={navbarOpen} navbar>
          <Nav className={links_left ? 'mr-auto' : 'ml-auto'} navbar>
            {children}
          </Nav>
        </Collapse>
      </Container>
    </RSNavbar>
  );
};

NavbarSimple.defaultProps = {
  fluid: false,
  color: 'light',
  light: true,
  expand: 'md',
  links_left: false,
};

NavbarSimple.propTypes = {
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
   * Brand text, to go top left of the navbar.
   */
  brand: PropTypes.string,

  /**
   * Link to attach to brand.
   */
  brand_href: PropTypes.string,

  /**
   * CSS style options for brand.
   */
  brand_style: PropTypes.object,

  /**
   * If true, the browser will treat the brand link as external,
   * forcing a page refresh at the new location. If false,
   * this just changes the location without triggering a page
   * refresh. Use this if you are observing dcc.Location, for
   * instance. Defaults to true for absolute URLs and false
   * otherwise.
   */
  brand_external_link: PropTypes.bool,

  /**
   * The contents of the Navbar are wrapped in a container, use fluid=True to
   * make this container fluid, so that in particular, the contents of the
   * navbar fill the available horizontal space.
   */
  fluid: PropTypes.bool,

  /**
   * Align the navlinks in the navbar to the left. Default: False.
   */
  links_left: PropTypes.bool,

  /**
   * Applies the `navbar-light` class to the NavbarSimple, causing text in the
   * children of the Navbar to use dark colors for contrast / visibility.
   */
  light: PropTypes.bool,

  /**
   * Applies the `navbar-dark` class to the NavbarSimple, causing text in the
   * children of the Navbar to use light colors for contrast / visibility.
   */
  dark: PropTypes.bool,

  /**
   * Fix the navbar's position at the top or bottom of the page, options: top,
   * bottom
   */
  fixed: PropTypes.string,

  /**
   * Stick the navbar to the top or the bottom of the viewport, options: top, bottom
   *
   * With `sticky`, the navbar remains in the viewport when you scroll. By
   * contrast, with `fixed`, the navbar will remain at the top or bottom of
   * the page.
   */
  sticky: PropTypes.string,

  /**
   * Sets the color of the NavbarSimple. Main options are primary, light and dark, default light.
   *
   * You can also choose one of the other contextual classes provided by Bootstrap
   * (secondary, success, warning, danger, info, white) or any valid CSS color of
   * your choice (e.g. a hex code, a decimal code or a CSS color name)
   */
  color: PropTypes.string,

  /**
   * Specify breakpoint at which to expand the menu bar. Options are: 'xs',
   * 'sm', 'md', 'lg', or 'xl'. Below this breakpoint the navbar will collapse
   * and navitems will be placed in a togglable collapse element.
   */
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

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

export default NavbarSimple;
