import { useMemo, useRef, useState } from 'react';
import { extractEventHandlers } from '../utils/extractEventHandlers';
import { isFocusVisible } from '../utils/is';
import { useForkRef } from './useForkRef';
export function useBtn({
	selected = false,
	multiple = false,
	current = undefined,
	disabled = false,
	ref: externalRef,
	type,
	href,
	to,
	tabIndex,
	value,
	...props
}) {
	const buttonRef = useRef(null);
	const handleRef = useForkRef(externalRef, buttonRef);
	const externalEventHandlers = {
		...extractEventHandlers(props),
	};
	const [focusVisible, setFocusVisible] = useState(false);
	const [active, setActive] = useState(false);

	const isSelected = useMemo(() => {
		if (!selected) {
			return false;
		}
		if (multiple && Array.isArray(current)) {
			return current.includes(value);
		}
		return current === value;
	}, [selected, current, value, multiple]);

	const isNativeButton = () => {
		const button = buttonRef.current;
		return (
			button?.tagName === 'BUTTON' ||
			(button?.tagName === 'INPUT' &&
				['button', 'submit', 'reset'].includes(button?.type)) ||
			(button?.tagName === 'A' && button?.href)
		);
	};
	const createHandleBlur = (otherHandlers) => (event) => {
		if (!isFocusVisible(event.target)) {
			setFocusVisible(false);
		}
		otherHandlers.onBlur?.(event);
	};
	const createHandleFocus = (otherHandlers) => (event) => {
		if (!buttonRef.current) {
			buttonRef.current = event.currentTarget;
		}
		if (isFocusVisible(event.target)) {
			setFocusVisible(true);
			otherHandlers.onFocusVisible?.(event);
		}
		otherHandlers.onFocus?.(event);
	};
	const createHandleClick = (otherHandlers) => (event) => {
		if (!disabled) {
			otherHandlers.onClick?.(event, value);
		}
	};
	const createHandleMouseLeave = (otherHandlers) => (event) => {
		if (focusVisible) {
			event.preventDefault();
		}

		otherHandlers.onMouseLeave?.(event);
	};
	const createHandleMouseDown = (otherHandlers) => (event) => {
		if (!disabled) {
			setActive(true);
			document.addEventListener('mouseup', () => setActive(false), { once: true });
		}
		otherHandlers.onMouseDown?.(event);
	};
	const createHandleKeyDown = (otherHandlers) => (event) => {
		otherHandlers.onKeyDown?.(event);

		if (event.defaultMuiPrevented) {
			return;
		}

		if (
			event.target === event.currentTarget &&
			!isNativeButton() &&
			event.key === ' '
		) {
			event.preventDefault();
		}

		if (event.target === event.currentTarget && event.key === ' ' && !disabled) {
			setActive(true);
		}

		if (
			event.target === event.currentTarget &&
			!isNativeButton() &&
			event.key === 'Enter' &&
			!disabled
		) {
			otherHandlers.onClick?.(event);
			event.preventDefault();
		}
	};
	const createHandleKeyUp = (otherHandlers) => (event) => {
		if (event.target === event.currentTarget) {
			setActive(false);
		}

		otherHandlers.onKeyUp?.(event);

		if (
			event.target === event.currentTarget &&
			!isNativeButton() &&
			!disabled &&
			event.key === ' ' &&
			!event.defaultMuiPrevented
		) {
			otherHandlers.onClick?.(event);
		}
	};

	const buttonProps = {
		type: type ?? 'button',
		role: !href && !to ? 'button' : undefined,
		disabled: disabled,
		'aria-disabled': disabled,
		tabIndex: !disabled ? (tabIndex ?? 0) : -1,
	};
	const attrs = {
		...externalEventHandlers,
		...buttonProps,
		ref: handleRef,
		onBlur: createHandleBlur(externalEventHandlers),
		onFocus: createHandleFocus(externalEventHandlers),
		onClick: createHandleClick(externalEventHandlers),
		onMouseDown: createHandleMouseDown(externalEventHandlers),
		onMouseLeave: createHandleMouseLeave(externalEventHandlers),
		onKeyDown: createHandleKeyDown(externalEventHandlers),
		onKeyUp: createHandleKeyUp(externalEventHandlers),
	};
	delete attrs.onFocusVisible;
	return {
		isSelected,
		focusVisible,
		active,
		buttonRef,
		attrs,
	};
}
