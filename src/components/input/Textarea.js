import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import classNames from 'classnames';

/**
 * A basic HTML textarea for entering multiline text based on the corresponding
 * component in dash-core-components
 */
const Textarea = (props) => {
  const {
    value,
    n_clicks,
    n_blur,
    n_submit,
    setProps,
    className,
    class_name,
    invalid,
    valid,
    bs_size,
    debounce,
    loading_state,
    autoFocus,
    autofocus,
    maxLength,
    maxlength,
    minLength,
    minlength,
    readOnly,
    readonly,
    accessKey,
    accesskey,
    contentEditable,
    contenteditable,
    contextMenu,
    contextmenu,
    spellCheck,
    spellcheck,
    tabIndex,
    tabindex,
    ...otherProps
  } = props;
  const [valueState, setValueState] = useState(value || '');

  useEffect(() => {
    if (value !== valueState) {
      setValueState(value || '');
    }
  }, [value]);

  const onChange = (e) => {
    const newValue = e.target.value;
    setValueState(newValue);
    if (!debounce && setProps) {
      setProps({value: newValue});
    }
  };

  const onBlur = () => {
    if (setProps) {
      const payload = {
        n_blur: n_blur + 1,
        n_blur_timestamp: Date.now(),
      };
      if (debounce) {
        payload.value = value;
      }
      setProps(payload);
    }
  };

  const onKeyPress = (e) => {
    if (setProps && e.key === 'Enter') {
      const payload = {
        n_submit: n_submit + 1,
        n_submit_timestamp: Date.now(),
      };
      if (debounce) {
        payload.value = value;
      }
      setProps(payload);
    }
  };

  const onClick = () => {
    if (setProps) {
      setProps({
        n_clicks: n_clicks + 1,
        n_clicks_timestamp: Date.now(),
      });
    }
  };

  const classes = classNames(
    class_name || className,
    invalid && 'is-invalid',
    valid && 'is-valid',
    bs_size ? `form-control-${bs_size}` : false,
    'form-control'
  );

  return (
    <textarea
      value={valueState}
      className={classes}
      onChange={onChange}
      onBlur={onBlur}
      onKeyPress={onKeyPress}
      onClick={onClick}
      autoFocus={autofocus || autoFocus}
      maxLength={maxlength || maxLength}
      minLength={minlength || minLength}
      readOnly={readonly || readOnly}
      accessKey={accesskey || accessKey}
      contentEditable={contenteditable || contentEditable}
      contextMenu={contextmenu || contextMenu}
      spellCheck={spellcheck || spellCheck}
      tabIndex={tabindex || tabIndex}
      {...omit(
        [
          'n_blur_timestamp',
          'n_submit_timestamp',
          'persistence',
          'persistence_type',
          'persisted_props',
        ],
        otherProps
      )}
      data-dash-is-loading={
        (loading_state && loading_state.is_loading) || undefined
      }
    />
  );
};

Textarea.propTypes = {
  /**
   * The ID of this component, used to identify dash components
   * in callbacks. The ID needs to be unique across all of the
   * components in an app.
   */
  id: PropTypes.string,

  /**
   * A unique identifier for the component, used to improve
   * performance by React.js while rendering components
   * See https://reactjs.org/docs/lists-and-keys.html for more info
   */
  key: PropTypes.string,

  /**
   * The value of the textarea
   */
  value: PropTypes.string,

  /**
   * The element should be automatically focused after the page loaded.
   */
  autofocus: PropTypes.string,

  /**
   * **DEPRECATED** Use `autofocus` instead
   *
   * The element should be automatically focused after the page loaded.
   */
  autoFocus: PropTypes.string,

  /**
   * Defines the number of columns in a textarea.
   */
  cols: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Indicates whether the user can interact with the element.
   */
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  /**
   * Indicates the form that is the owner of the element.
   */
  form: PropTypes.string,

  /**
   * Defines the maximum number of characters allowed in the element.
   */
  maxlength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * **DEPRECATED** Use `maxlength` instead
   *
   * Defines the maximum number of characters allowed in the element.
   */
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Defines the minimum number of characters allowed in the element.
   */
  minlength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * **DEPRECATED** Use `minlength` instead
   *
   * Defines the minimum number of characters allowed in the element.
   */
  minLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Name of the element. For example used by the server to identify the fields in form submits.
   */
  name: PropTypes.string,

  /**
   * Provides a hint to the user of what can be entered in the field.
   */
  placeholder: PropTypes.string,

  /**
   * Indicates whether the element can be edited.
   */
  readonly: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['readOnly', 'readonly', 'READONLY']),
  ]),

  /**
   * **DEPRECATED** Use `readonly` instead
   *
   * Indicates whether the element can be edited.
   */
  readOnly: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['readOnly', 'readonly', 'READONLY']),
  ]),

  /**
   * This attribute specifies that the user must fill in a value before
   * submitting a form. It cannot be used when the type attribute is hidden,
   * image, or a button type (submit, reset, or button). The :optional and
   * :required CSS pseudo-classes will be applied to the field as appropriate.
   * required is an HTML boolean attribute - it is enabled by a boolean or
   * 'required'. Alternative capitalizations `REQUIRED`
   * are also acccepted.
   */
  required: PropTypes.oneOfType([
    PropTypes.oneOf(['required', 'REQUIRED']),
    PropTypes.bool,
  ]),

  /**
   * Defines the number of rows in a text area.
   */
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Indicates whether the text should be wrapped.
   */
  wrap: PropTypes.string,

  /**
   * Defines a keyboard shortcut to activate or add focus to the element.
   */
  accesskey: PropTypes.string,

  /**
   * **DEPRECATED** Use `accesskey` instead
   *
   * Defines a keyboard shortcut to activate or add focus to the element.
   */
  accessKey: PropTypes.string,

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
   * Indicates whether the element's content is editable.
   */
  contenteditable: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * **DEPRECATED** Use `contenteditable` instead
   *
   * Indicates whether the element's content is editable.
   */
  contentEditable: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Defines the ID of a <menu> element which will serve as the element's context menu.
   */
  contextmenu: PropTypes.string,

  /**
   * **DEPRECATED** Use `contextmenu` instead
   *
   * Defines the ID of a <menu> element which will serve as the element's context menu.
   */
  contextMenu: PropTypes.string,

  /**
   * Defines the text direction. Allowed values are ltr (Left-To-Right) or rtl (Right-To-Left)
   */
  dir: PropTypes.string,

  /**
   * Defines whether the element can be dragged.
   */
  draggable: PropTypes.oneOfType([
    // enumerated property, not a boolean property: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable
    PropTypes.oneOf(['true', 'false']),
    PropTypes.bool,
  ]),

  /**
   * Prevents rendering of given element, while keeping child elements, e.g. script elements, active.
   */
  hidden: PropTypes.string,

  /**
   * Defines the language used in the element.
   */
  lang: PropTypes.string,

  /**
   * Indicates whether spell checking is allowed for the element.
   */
  spellcheck: PropTypes.oneOfType([
    // enumerated property, not a boolean property: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable
    PropTypes.oneOf(['true', 'false']),
    PropTypes.bool,
  ]),

  /**
   * **DEPRECATED** Use `spellcheck` instead
   *
   * Indicates whether spell checking is allowed for the element.
   */
  spellCheck: PropTypes.oneOfType([
    // enumerated property, not a boolean property: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable
    PropTypes.oneOf(['true', 'false']),
    PropTypes.bool,
  ]),

  /**
   * Defines CSS styles which will override styles previously set.
   */
  style: PropTypes.object,

  /**
   * Overrides the browser's default tab order and follows the one specified instead.
   */
  tabindex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * **DEPRECATED** Use `tabindex` instead
   *
   * Overrides the browser's default tab order and follows the one specified instead.
   */
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Text to be displayed in a tooltip when hovering over the element.
   */
  title: PropTypes.string,

  /**
   * Dash-assigned callback that gets fired when the value changes.
   */
  setProps: PropTypes.func,

  /**
   * Set the size of the Textarea, valid options are 'sm', 'md', or 'lg'
   */
  bs_size: PropTypes.string,

  /**
   * Apply valid style to the Textarea for feedback purposes. This will cause
   * any FormFeedback in the enclosing FormGroup with valid=True to display.
   */
  valid: PropTypes.bool,

  /**
   * Apply invalid style to the Textarea for feedback purposes. This will cause
   * any FormFeedback in the enclosing FormGroup with valid=False to display.
   */
  invalid: PropTypes.bool,

  /**
   * Number of times the input lost focus.
   */
  n_blur: PropTypes.number,
  /**
   * Last time the input lost focus.
   */
  n_blur_timestamp: PropTypes.number,

  /**
   * Number of times the `Enter` key was pressed while the textarea had focus.
   */
  n_submit: PropTypes.number,

  /**
   * Last time that `Enter` was pressed.
   */
  n_submit_timestamp: PropTypes.number,

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
   * If true, changes to input will be sent back to the Dash server only on enter or when losing focus.
   * If it's false, it will sent the value back on every change.
   */
  debounce: PropTypes.bool,

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
   * Used to allow user interactions in this component to be persisted when
   * the component - or the page - is refreshed. If `persisted` is truthy and
   * hasn't changed from its previous value, a `value` that the user has
   * changed while using the app will keep that change, as long as
   * the new `value` also matches what was given originally.
   * Used in conjunction with `persistence_type`.
   */
  persistence: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
  ]),

  /**
   * Properties whose user interactions will persist after refreshing the
   * component or the page. Since only `value` is allowed this prop can
   * normally be ignored.
   */
  persisted_props: PropTypes.arrayOf(PropTypes.oneOf(['value'])),

  /**
   * Where persisted user changes will be stored:
   * memory: only kept in memory, reset on page refresh.
   * local: window.localStorage, data is kept after the browser quit.
   * session: window.sessionStorage, data is cleared once the browser quit.
   */
  persistence_type: PropTypes.oneOf(['local', 'session', 'memory']),
};

Textarea.defaultProps = {
  n_blur: 0,
  n_blur_timestamp: -1,
  n_submit: 0,
  n_submit_timestamp: -1,
  n_clicks: 0,
  n_clicks_timestamp: -1,
  debounce: false,
  persisted_props: ['value'],
  persistence_type: 'local',
  value: '',
};

export default Textarea;
