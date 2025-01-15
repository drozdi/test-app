import {
	cloneElement,
	createContext,
	createElement,
	forwardRef,
	Fragment,
	useContext,
	useMemo,
} from 'react';
import { isFunction } from '../../utils/is';

const RenderContext = createContext({});

export function RenderProvider({ children, ...contextValues }) {
	return (
		<RenderContext.Provider value={contextValues}>{children}</RenderContext.Provider>
	);
}

export function useRenderContext() {
	return useContext(RenderContext);
}

export function forwardRefWithAs(component) {
	return Object.assign(forwardRef(component), {
		displayName: component.displayName ?? component.name,
	});
}

export function render(tag, { as: Component = tag, children, ...rest }, state) {
	if (rest?.if?.(state) === false) {
		return null;
	}

	const contextValues = useRenderContext();

	const memoizedRest = useMemo(() => {
		const result = { ...rest, ...contextValues };
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
	}, [rest, state, contextValues]);

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
