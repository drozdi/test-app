import { useRef, useState } from 'react';
import { isFocusVisible } from '../../utils/is';
import { extractEventHandlers } from '../internal/extractEventHandlers';
import { useForkRef } from './useForkRef';
export function useBtn({
	disabled,
	active: isActive,
	ref: externalRef,
	as: elementType = 'button',

	type = 'button',
	role = 'button',
	tabIndex,
	value,
	title,

	target = '_self',
	to,
	href,
	rel,
	...rest
}) {
	const buttonRef = useRef(null);
	const handleRef = useForkRef(externalRef, buttonRef);
	const externalEventHandlers = {
		...extractEventHandlers(rest),
	};
	const [focusVisible, setFocusVisible] = useState(false);
	const [active, setActive] = useState(false);

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

	let additionalProps = {
		title,
		disabled,
		tabIndex: !disabled ? (tabIndex ?? 0) : -1,
		ref: handleRef,
	};
	if (elementType === 'button') {
		additionalProps = {
			...additionalProps,
			type,
		};
	} else {
		additionalProps = {
			...additionalProps,
			role,
			title,
			href: elementType === 'a' && !disabled ? href : undefined,
			target: elementType === 'a' ? target : undefined,
			type: elementType === 'input' ? type : undefined,
			disabled: elementType === 'input' ? disabled : undefined,
			'aria-disabled': !disabled || elementType === 'input' ? undefined : disabled,
			rel: elementType === 'a' ? rel : undefined,
		};
	}
	let actionProps = {
		...externalEventHandlers,
		onBlur: createHandleBlur(externalEventHandlers),
		onFocus: createHandleFocus(externalEventHandlers),
		onClick: createHandleClick(externalEventHandlers),
		onMouseDown: createHandleMouseDown(externalEventHandlers),
		onMouseLeave: createHandleMouseLeave(externalEventHandlers),
		onKeyDown: createHandleKeyDown(externalEventHandlers),
		onKeyUp: createHandleKeyUp(externalEventHandlers),
	};
	delete actionProps.onFocusVisible;

	return {
		active: active || isActive,
		focusVisible,
		buttonRef,
		attrs: {
			...actionProps,
			...additionalProps,
			'aria-haspopup': rest['aria-haspopup'],
			'aria-expanded': rest['aria-expanded'],
			'aria-controls': rest['aria-controls'],
			'aria-pressed': rest['aria-pressed'],
		},
	};
}
