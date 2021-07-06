import React from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import {Row as RSRow} from 'reactstrap';
import classNames from 'classnames';

const alignMap = {
  start: 'align-items-start',
  center: 'align-items-center',
  end: 'align-items-end',
  stretch: 'align-items-stretch',
  baseline: 'align-items-baseline',
};

const justifyMap = {
  start: 'justify-content-start',
  center: 'justify-content-center',
  end: 'justify-content-end',
  around: 'justify-content-around',
  between: 'justify-content-between',
};

/**
 * Row is one of the core layout components in Bootstrap. Build up your layout
 * as a series of rows of columns. Row has arguments for controlling the
 * vertical and horizontal alignment of its children, as well as the spacing
 * between columns.
 */
const Row = (props) => {
  const {
    children,
    className,
    class_name,
    align,
    justify,
    no_gutters,
    loading_state,
    ...otherProps
  } = props;

  const alignClass = align && alignMap[align];
  const justifyClass = justify && justifyMap[justify];

  const classes = classNames(class_name || className, alignClass, justifyClass);
  return (
    <RSRow
      className={classes}
      noGutters={no_gutters}
      {...omit(['setProps'], otherProps)}
      data-dash-is-loading={
        (loading_state && loading_state.is_loading) || undefined
      }
    >
      {children}
    </RSRow>
  );
};

Row.propTypes = {
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
   * Remove the "gutters" between columns in this row.
   * see https://getbootstrap.com/docs/4.0/layout/grid/#no-gutters
   */
  no_gutters: PropTypes.bool,

  /**
   * Set vertical alignment of columns in this row. Options are 'start',
   * 'center', 'end', 'stretch' and 'baseline'.
   */
  align: PropTypes.oneOf(['start', 'center', 'end', 'stretch', 'baseline']),

  /**
   * Set horizontal spacing and alignment of columns in this row. Options are
   * 'start', 'center', 'end', 'around' and 'between'.
   */
  justify: PropTypes.oneOf(['start', 'center', 'end', 'around', 'between']),

  /**
   * For use in forms. When set to True the `form-row` class is applied, which
   * overrides the default column gutters for a tighter, more compact layout.
   */
  form: PropTypes.bool,

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

export default Row;
