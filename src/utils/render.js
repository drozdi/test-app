import { createElement, forwardRef } from 'react';
import { isFunction } from './is';

export function forwardRefWithAs(component) {
	return Object.assign(forwardRef(component), {
		displayName: component.displayName ?? component.name,
	});
}

export function render(props) {
	const { as, children, ...rest } = props;
	if ('className' in rest && rest.className && isFunction(rest.className)) {
		rest.className = rest.className({ ...rest, className: undefined });
	}
	if ('style' in rest && rest.style && isFunction(rest.style)) {
		rest.style = rest.style({ ...rest, style: undefined });
	}
	if (rest['aria-labelledby'] && rest['aria-labelledby'] === rest.id) {
		rest['aria-labelledby'] = undefined;
	}

	let resolvedChildren = isFunction(children) ? children(rest) : children;

	console.log(as, rest);
	if (isFunction(children)) {
		return children(rest);
	}
	return createElement(as, rest, children);
}
