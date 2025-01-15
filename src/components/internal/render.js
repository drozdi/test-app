import { cloneElement, createElement, forwardRef, Fragment, useMemo } from 'react';
import { isFunction } from '../../utils/is';

export function forwardRefWithAs(component) {
	return Object.assign(forwardRef(component), {
		displayName: component.displayName ?? component.name,
	});
}

export function render(tag, { as: Component = tag, children, ...rest }, state) {
	if (rest?.if?.(state) === false) {
		return null;
	}

	const memoizedRest = useMemo(() => {
		const result = { ...rest };
		if ('className' in rest && rest.className && isFunction(rest.className)) {
			result.className = rest.className(state, rest);
		}
		if ('style' in rest && rest.style && isFunction(rest.style)) {
			result.style = rest.style(state, rest);
		}
		if (result['aria-labelledby'] && result['aria-labelledby'] === result.id) {
			result['aria-labelledby'] = undefined;
		}
		return result;
	}, [rest, state]);

	let resolvedChildren = isFunction(children) ? children(state) : children;

	if (Component === Fragment) {
		let childProps = resolvedChildren.props;
		let childPropsClassName = childProps?.className;
		let childPropsStyle = childProps?.style;

		let newClassName = isFunction(childPropsClassName)
			? childPropsClassName(state, memoizedRest.className)
			: childPropsClassName;

		let newStyle = isFunction(childPropsStyle)
			? childPropsStyle(state, memoizedRest.style)
			: childPropsStyle;

		return cloneElement(resolvedChildren, {
			...memoizedRest,
			className: newClassName,
			style: newStyle,
		});
	}

	return createElement(Component, memoizedRest, resolvedChildren);
}
