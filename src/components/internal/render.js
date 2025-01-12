import { cloneElement, createElement, forwardRef, Fragment } from 'react';
import { isFunction } from '../../utils/is';

export function forwardRefWithAs(component) {
	return Object.assign(forwardRef(component), {
		displayName: component.displayName ?? component.name,
	});
}

export function render(tag, props, state) {
	let { as: Component = tag, children, ...rest } = props;
	if ('className' in rest && rest.className && isFunction(rest.className)) {
		rest.className = rest.className(state);
	}
	if ('style' in rest && rest.style && isFunction(rest.style)) {
		rest.style = rest.style(state);
	}
	if (rest['aria-labelledby'] && rest['aria-labelledby'] === rest.id) {
		rest['aria-labelledby'] = undefined;
	}

	let resolvedChildren = isFunction(children) ? children(state) : children;

	if (Component === Fragment) {
		let childProps = resolvedChildren.props;
		let childPropsClassName = childProps?.className;
		let childPropsStyle = childProps?.style;

		let newClassName = isFunction(childPropsClassName)
			? childPropsClassName(state, rest.className)
			: childPropsClassName;

		let newStyle = isFunction(childPropsStyle)
			? childPropsStyle(state, rest.style)
			: childPropsStyle;

		return cloneElement(resolvedChildren, {
			...rest,
			className: newClassName,
			style: newStyle,
		});
	}

	return createElement(Component, rest, resolvedChildren);
}
