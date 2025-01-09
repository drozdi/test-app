import { createElement, forwardRef } from 'react';
import { isFunction } from './is';

export function forwardRefWithAs(component) {
	return Object.assign(forwardRef(component), {
		displayName: component.displayName ?? component.name,
	});
}

export function render({ as, children, ...props }) {
	console.log(as, props);
	if (isFunction(children)) {
		return children(props);
	}
	return createElement(as, props, children);
}
