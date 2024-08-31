import React from "react";
import styles from './XButton.module.css';
import classNames from "classnames";
import PropTypes from 'prop-types'

import XIcon from '../icon/XIcon'

// todo add icon support for iconRight
export function XBtn ({children, size, className, icon, iconRight, disabled, flat, outline, rounded, block, square, tonal, text, color, textColor, ...props}) {
    const attrs = {
        type: 'button',
        ...props,
        className: classNames(className, styles['x-btn'], {
            [styles[`x-btn--${color}`]]: !!color,
            [styles[`x-btn--${size}`]]: !!size,
            [styles['x-btn--rounded']]: !!rounded,
            [styles['x-btn--block']]: !!block,
            [styles['x-btn--disabled']]: !!disabled,
            [styles['x-btn--flat']]: !!flat,
            [styles['x-btn--text']]: !!text,
            [styles['x-btn--tonal']]: !!tonal,
            [styles['x-btn--square']]: !!square,
            [styles['x-btn--outline']]: !!outline
        })
    }

    if (disabled) {
        attrs.disabled = true;
        attrs['aria-disabled'] = 'true'
    } 
    if (props.href === void 0) {
        attrs.role = 'button'
    }

    return (
        <button {...attrs}>
            <XIcon>{icon}</XIcon>
            <span className="x-btn__content">{children}</span>
            <XIcon>{iconRight}</XIcon>
        </button>
    );
}

XBtn.defaultProps = {
    icon: null,
    iconRight: null,
    flat: false,
    tonal: false,
    text: false,
    square: false,
    outline: false,
    rounded: false,
    disabled: false,
    block: false,
    type: 'button',
    color: '',
    textColor: '',
    onClick: () => {}
};
XBtn.propTypes = {
    icon: PropTypes.string,
    iconRight: PropTypes.string,
    flat: PropTypes.bool,
    tonal: PropTypes.bool,
    text: PropTypes.bool,
    square: PropTypes.bool,
    outline: PropTypes.bool,
    rounded: PropTypes.bool,
    disabled: PropTypes.bool,
    block: PropTypes.bool,
    type: PropTypes.string,
    color: PropTypes.string,
    textColor: PropTypes.string,
    onClick: PropTypes.func
}