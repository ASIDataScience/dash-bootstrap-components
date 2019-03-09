import React from 'react';
import PropTypes from 'prop-types';
import {Dropdown, DropdownToggle} from 'reactstrap';
import {DropdownMenu as RSDropdownMenu} from 'reactstrap';

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    if (!this.props.disabled) {
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
      }));
    }
  }

  render() {
    const {
      children,
      nav,
      label,
      disabled,
      caret,
      in_navbar,
      addon_type,
      bs_size,
      right,
      ...otherProps
    } = this.props;
    return (
      <Dropdown
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
        nav={nav}
        disabled={disabled}
        inNavbar={in_navbar}
        addonType={addon_type}
        size={bs_size}
        {...otherProps}
      >
        <DropdownToggle nav={nav} caret={caret} disabled={disabled}>
          {label}
        </DropdownToggle>
        <RSDropdownMenu right={right}>{this.props.children}</RSDropdownMenu>
      </Dropdown>
    );
  }
}

DropdownMenu.defaultProps = {
  caret: true,
  disabled: false
};

DropdownMenu.propTypes = {
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
  className: PropTypes.string,

  /**
   * A unique identifier for the component, used to improve
   * performance by React.js while rendering components
   * See https://reactjs.org/docs/lists-and-keys.html for more info
   */
  key: PropTypes.string,

  /**
   * Label for the DropdownMenu toggle.
   */
  label: PropTypes.string,

  /**
   * Direction in which to expand the dropdown. Note that expanding
   * the dropdown upwards is currently unsupported. Default: 'down'.
   */
  direction: PropTypes.oneOf(['down', 'left', 'right']),

  /**
   * Align the dropdown menu along the right side of its parent. Default: False.
   */
  right: PropTypes.bool,

  /**
   * Set this to True if the dropdown is inside a navbar. Default: False.
   */
  in_navbar: PropTypes.bool,

  /**
   * Set this to 'prepend' or 'append' if the dropdown menu is being used in an input group.
   */
  addon_type: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['prepend', 'append'])
  ]),

  /**
   * Disable the dropdown.
   */
  disabled: PropTypes.bool,

  /**
   * Set this to True if the dropdown is inside a nav for styling consistent
   * with other nav items. Default: False.
   */
  nav: PropTypes.bool,

  /**
   * Add a caret to the dropdown toggle. Default: True.
   */
  caret: PropTypes.bool,

  /**
   * Size of the dropdown. 'sm' corresponds to small, 'md' to medium
   * and 'lg' to large.
   */
  bs_size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default DropdownMenu;
