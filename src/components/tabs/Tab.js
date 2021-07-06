import React from 'react';
import PropTypes from 'prop-types';

/**
 * Create a single tab. Should be used as a component of Tabs.
 */
const Tab = (props) => {
  return <div>{props.children}</div>;
};

Tab.defaultProps = {
  disabled: false,
};

Tab.propTypes = {
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
   * Defines CSS styles which will override styles previously set. The styles
   * set here apply to the content of the Tab
   */
  style: PropTypes.object,

  /**
   * Defines CSS styles which will override styles previously set. The styles
   * set here apply to the NavItem in the tab.
   */
  tab_style: PropTypes.object,

  /**
   * Defines CSS styles which will override styles previously set. The styles
   * set here apply to the NavItem in the tab when it is active.
   */
  active_tab_style: PropTypes.object,

  /**
   * Defines CSS styles which will override styles previously set. The styles
   * set here apply to the NavLink in the tab.
   */
  label_style: PropTypes.object,

  /**
   * Defines CSS styles which will override styles previously set. The styles
   * set here apply to the NavLink in the tab when it is active
   */
  active_label_style: PropTypes.object,

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
   * Often used with CSS to style elements with common properties. The classes
   * specified with this prop will be applied to the NavItem in the tab.
   */
  tab_class_name: PropTypes.string,

  /**
   * **DEPRECATED** Use `tab_class_name` instead
   *
   * Often used with CSS to style elements with common properties. The classes
   * specified with this prop will be applied to the NavItem in the tab.
   */
  tabClassName: PropTypes.string,

  /**
   * Often used with CSS to style elements with common properties. The classes
   * specified with this prop will be applied to the NavItem in the tab when it
   * is active.
   */
  active_tab_class_name: PropTypes.string,

  /**
   * **DEPRECATED** Use `active_tab_class_name` instead
   *
   * Often used with CSS to style elements with common properties. The classes
   * specified with this prop will be applied to the NavItem in the tab when it
   * is active.
   */
  activeTabClassName: PropTypes.string,

  /**
   * Often used with CSS to style elements with common properties. The classes
   * specified with this prop will be applied to the NavLink in the tab.
   */
  label_class_name: PropTypes.string,

  /**
   * **DEPRECATED** Use `label_class_name` instead
   *
   * Often used with CSS to style elements with common properties. The classes
   * specified with this prop will be applied to the NavLink in the tab.
   */
  labelClassName: PropTypes.string,

  /**
   * Often used with CSS to style elements with common properties. The classes
   * specified with this prop will be applied to the NavLink in the tab when
   * it is active.
   */
  active_label_class_name: PropTypes.string,

  /**
   * **DEPRECATED** Use `active_label_class_name` instead
   *
   * Often used with CSS to style elements with common properties. The classes
   * specified with this prop will be applied to the NavLink in the tab when
   * it is active.
   */
  activeLabelClassName: PropTypes.string,

  /**
   * A unique identifier for the component, used to improve
   * performance by React.js while rendering components
   * See https://reactjs.org/docs/lists-and-keys.html for more info
   */
  key: PropTypes.string,

  /**
   * The tab's label, displayed in the tab itself.
   */
  label: PropTypes.string,

  /**
   * Optional identifier for tab used for determining which tab is visible
   * if not specified, and Tab is being used inside Tabs component, the tabId
   * will be set to "tab-i" where i is (zero indexed) position of tab in list
   * tabs pased to Tabs component.
   */
  tab_id: PropTypes.string,

  /**
   * Determines if tab is disabled or not - defaults to false
   */
  disabled: PropTypes.bool,

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

export default Tab;
