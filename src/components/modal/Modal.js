import React from 'react';
import PropTypes from 'prop-types';
import {Modal as RSModal} from 'reactstrap';

/**
 * Create a toggleable dialog using the Modal component. Toggle the visibility
 * with the `is_open` prop.
 */
const Modal = (props) => {
  const {
    children,
    is_open,
    setProps,
    className,
    class_name,
    autoFocus,
    autofocus,
    labelledBy,
    labelledby,
    modalClassName,
    modal_class_name,
    contentClassName,
    content_class_name,
    backdropClassName,
    backdrop_class_name,
    ...otherProps
  } = props;

  const toggle = () => {
    if (setProps) {
      setProps({is_open: !is_open});
    }
  };

  return (
    <RSModal
      className={class_name || className}
      modalClassName={modal_class_name || modalClassName}
      backdropClassName={backdrop_class_name || backdropClassName}
      autoFocus={autofocus || autoFocus}
      labelledBy={labelledby || labelledBy}
      isOpen={is_open}
      toggle={toggle}
      {...otherProps}
    >
      {children}
    </RSModal>
  );
};

Modal.propTypes = {
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
   * HTML tag to use for the Modal, default: div
   */
  tag: PropTypes.string,

  /**
   * Whether modal is currently open.
   */
  is_open: PropTypes.bool,

  /**
   * If true, vertically center modal on page.
   */
  centered: PropTypes.bool,

  /**
   * It true, scroll the modal body rather than the entire modal when it is too
   * long to all fit on the screen.
   */
  scrollable: PropTypes.bool,

  /**
   * 	Puts the focus on the modal when initialized.
   */
  autofocus: PropTypes.bool,

  /**
   * **DEPRECATED** Use `autofocus` instead
   *
   * 	Puts the focus on the modal when initialized.
   */
  autoFocus: PropTypes.bool,

  /**
   * Set the size of the modal. Options sm, lg, xl for small, large or extra
   * large sized modals, or leave undefined for default size.
   */
  size: PropTypes.string,

  /**
   * The ARIA role attribute.
   */
  role: PropTypes.string,

  /**
   * The ARIA labelledby attribute
   */
  labelledby: PropTypes.string,

  /**
   * **DEPRECATED** Use `labelledby` instead
   *
   * The ARIA labelledby attribute
   */
  labelledBy: PropTypes.string,

  /**
   * Close the modal when escape key is pressed.
   */
  keyboard: PropTypes.bool,

  /**
   * Includes a modal-backdrop element. Alternatively, specify 'static' for a
   * backdrop which doesn't close the modal on click.
   */
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['static'])]),

  /**
   * CSS class to apply to the modal.
   */
  modal_class_name: PropTypes.string,

  /**
   * **DEPRECATED** Use `modal_class_name` instead
   *
   * CSS class to apply to the modal.
   */
  modalClassName: PropTypes.string,

  /**
   * CSS class to apply to the backdrop.
   */
  backdrop_class_name: PropTypes.string,

  /**
   * **DEPRECATED** Use `backdrop_class_name` instead
   *
   * CSS class to apply to the backdrop.
   */
  backdropClassName: PropTypes.string,

  /**
   * CSS class to apply to the modal content.
   */
  content_class_name: PropTypes.string,

  /**
   * **DEPRECATED** Use `content_class_name` instead
   *
   * CSS class to apply to the modal content.
   */
  contentClassName: PropTypes.string,

  /**
   * Set to false for a modal that simply appears rather than fades into view.
   */
  fade: PropTypes.bool,

  /**
   * Set the z-index of the modal. Default 1050.
   */
  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Modal;
