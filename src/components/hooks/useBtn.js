import { useRef, useState } from 'react';
import { isFocusVisible } from '../../utils/is';
import { extractEventHandlers } from '../internal/events/extract-event-handlers';
import { useForkRef } from './useForkRef';
export function useBtn({
	type = 'button',
	role = 'button',
	disabled: isDisabled,
	active: isActive,
	ref: externalRef,
	tabIndex,
	value,
	title,
	target,
	href,
	rel,
	...rest
}) {
	const buttonRef = useRef();
	const handleRef = useForkRef(externalRef, buttonRef);
	const externalEventHandlers = {
		...extractEventHandlers(rest),
	};
	const [focusVisible, setFocusVisible] = useState(false);
	const [active, setActive] = useState(false);
	const nativeElement = () => buttonRef.current;
	const isNativeButton = () => {
		const button = buttonRef.current;
		return (
			button?.tagName === 'BUTTON' ||
			(button?.tagName === 'INPUT' &&
				['button', 'submit', 'reset'].includes(button?.type))
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
		if (!isDisabled) {
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
		if (!isDisabled) {
			setActive(true);
			document.addEventListener('mouseup', () => setActive(false), { once: true });
		}
		otherHandlers.onMouseDown?.(event);
	};
	const createHandleKeyDown = (otherHandlers) => (event) => {
		otherHandlers.onKeyDown?.(event);

		if (
			event.target === event.currentTarget &&
			!isNativeButton() &&
			event.key === ' '
		) {
			event.preventDefault();
		}

		if (event.target === event.currentTarget && event.key === ' ' && !isDisabled) {
			setActive(true);
		}

		if (
			event.target === event.currentTarget &&
			!isNativeButton() &&
			event.key === 'Enter' &&
			!isDisabled
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
			!isDisabled &&
			event.key === ' '
		) {
			otherHandlers.onClick?.(event);
		}
	};
	let additionalProps = {
		role,
		title,
		disabled: isDisabled,
		tabIndex: !isDisabled ? (tabIndex ?? 0) : -1,
		ref: handleRef,
	};
	if (isNativeButton()) {
		additionalProps = {
			...additionalProps,
			type,
		};
	} else {
		additionalProps = {
			...additionalProps,
			href: nativeElement()?.tagName === 'A' && !isDisabled ? href : undefined,
			target: nativeElement()?.tagName === 'A' ? target : undefined,
			type: nativeElement()?.tagName === 'INPUT' ? type : undefined,
			disabled: nativeElement()?.tagName === 'INPUT' ? isDisabled : undefined,
			'aria-disabled':
				!isDisabled || nativeElement()?.tagName === 'INPUT'
					? undefined
					: isDisabled,
			rel: nativeElement()?.tagName === 'A' ? rel : undefined,
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
		disabled: isDisabled,
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
