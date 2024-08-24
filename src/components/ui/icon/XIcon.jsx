import React from "react";
import classNames from "classnames";
const XIcon = function ({children, name, color, tag = 'i', ...props}) {
    name ||= children
    if (!name) {
        return ''
    }
    color &&= color = ' text-'+color
    color ||= ''
    return React.createElement(tag, {
        ...props,
        className: classNames('x-icon', name.split('-')[0], name, color),
        'aria-hidden': 'true',
        role: 'presentation'
    }, '');
};

export default XIcon;