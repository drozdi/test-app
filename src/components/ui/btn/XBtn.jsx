import React from "react";
import classNames from "classnames";
import PropTypes from 'prop-types'
import {setBg, setText} from "../../utils/color";

import XIcon from '../icon/XIcon'

class XBtn extends React.Component {
    render () {
        const { children,
            className,
            icon,
            iconRight,
            disabled,
            flat,
            outline,
            rounded,
            block,
            square,
            tonal,
            text,
            color,
            textColor,
            ...props } = this.props

        if (disabled) {
            props.disabled = true;
            props['aria-disabled'] = 'true'
        } else if (props.href === void 0) {
            props.role = 'button'
        }

         const attrs = {
            ...props,
             className: classNames('x-btn', className || '', {
                 'x-btn--disabled': disabled,
                 'x-btn--flat': flat,
                 'x-btn--text': text,
                 'x-btn--tonal': tonal,
                 'x-btn--block': block,
                 'x-btn--square': square,
                 'x-btn--outline': outline,
                 'x-btn--rounded': rounded,
             })}

        if (color !== void 0) {
            if (flat || outline || tonal) {
                setText(textColor || color, attrs)
            } else {
                setBg(color, attrs)
                setText(textColor || 'white', attrs)
            }
        } else if (textColor) {
            setText(textColor || 'white', attrs)
        }

        return (
            <button {...attrs}>
                <XIcon>{icon}</XIcon>
                <span className="x-btn__content">{children}</span>
                <XIcon>{iconRight}</XIcon>
            </button>
        );
    }
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

export default XBtn;

/*
return React.createElement(tag, {
        ...props,
        className: classNames('x-icon', name.split('-')[0], name, color),
        'aria-hidden': true,
        role: 'presentation'
    }, '');
 */