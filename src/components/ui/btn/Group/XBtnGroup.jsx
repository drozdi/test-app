import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useCallback, useRef } from 'react';
import { forwardRefWithAs } from '../../../internal/render';
import './style.css';
import { XBtnGroupContext } from './XBtnGroupContext';

import { isArray } from '../../../../utils/is';

function getPreviousIndex(current, elements, loop) {
	for (let i = current - 1; i >= 0; i -= 1) {
		if (!elements[i].disabled) {
			return i;
		}
	}

	if (loop) {
		for (let i = elements.length - 1; i > -1; i -= 1) {
			if (!elements[i].disabled) {
				return i;
			}
		}
	}

	return current;
}
function getNextIndex(current, elements, loop) {
	for (let i = current + 1; i < elements.length; i += 1) {
		if (!elements[i].disabled) {
			return i;
		}
	}

	if (loop) {
		for (let i = 0; i < elements.length; i += 1) {
			if (!elements[i].disabled) {
				return i;
			}
		}
	}

	return current;
}

function XBtnGroupFn(
	{
		children,
		className,
		selectable,
		switchable,
		multiple,
		vertical,
		separator,
		onClick,
		onChange,
		value: current,
		align,
		spread,
		name,
		disabled,
		...props
	},
	ref,
) {
	const elementRef = useRef();

	const handleChange = useCallback(
		(event, value) => {
			onChange?.({
				originalEvent: event.originalEvent,
				value: value,
				stopPropagation: () => {
					event.originalEvent.stopPropagation();
				},
				preventDefault: () => {
					event.originalEvent.preventDefault();
				},
				target: {
					name: props.name,
					id: props.id,
					value: value,
				},
			});
		},
		[onChange],
	);

	const handleClick = useCallback(
		(event, value) => {
			if (disabled) {
				return;
			}

			onClick?.({
				...event,
				value,
				target: {
					...event.target,
					value,
				},
			});

			if (switchable) {
				handleChange(event, value);
				return;
			}
			if (!selectable) {
				return;
			}

			let newValue;

			if (multiple) {
				newValue = current ? (isArray(current) ? [...current] : [current]) : [];
				if (!newValue.includes(value)) {
					newValue.push(value);
				} else {
					newValue = newValue.filter((v) => v !== value);
				}
			} else {
				newValue = current === value ? undefined : value;
			}

			handleChange(event, newValue);
		},
		[selectable, switchable, multiple, current, onClick],
	);

	const onKeyDown = (event) => {
		const { target } = event;

		const elements = Array.from(
			target
				.closest('[role="group"]')
				.querySelectorAll('[role="button"], button') || [],
		);
		const current = elements.findIndex((el) => target === el);
		const nextIndex = getNextIndex(current, elements, true);
		const previousIndex = getPreviousIndex(current, elements, true);

		switch (event.code) {
			case 'Enter':
			case 'Space':
				event.preventDefault();
				target.click();
				break;
			case 'ArrowLeft':
			case 'ArrowUp':
				event.preventDefault();
				event.stopPropagation();
				elements[previousIndex].focus();
				break;
			case 'ArrowRight':
			case 'ArrowDown':
				event.preventDefault();
				event.stopPropagation();
				elements[nextIndex].focus();
				break;
		}
	};

	const context = {
		getElement: () => elementRef.current,
		btnProps: { ...props, onKeyDown },
		switchable,
		selectable,
		multiple,
		current,
		onChange: handleClick,
		isDisabled: (value) => {
			return disabled;
		},
		isActive: (value) => {
			if (switchable) {
				return current === value;
			}
			if (!selectable) {
				return false;
			}
			if (multiple && isArray(current)) {
				return current.includes(value);
			}
			return current === value;
		},
	};
	return (
		<div
			className={classNames('x-btn-group', className, {
				'x-btn-group--vertical': vertical,
				'x-btn-group--separator': separator,
				'x-btn-group--spread': spread,
				'x-btn-group--round': props.round,
				[`justify-` + align]: !vertical && align,
				[`items-` + align]: vertical && align,
			})}
			role="group"
			ref={elementRef}
		>
			<XBtnGroupContext.Provider value={context}>
				{children}
			</XBtnGroupContext.Provider>
		</div>
	);
}

export const XBtnGroup = forwardRefWithAs(XBtnGroupFn);

XBtnGroup.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	vertical: PropTypes.bool,
	selectable: PropTypes.bool,
	switchable: PropTypes.bool,
	multiple: PropTypes.bool,
	separator: PropTypes.bool,
	spread: PropTypes.bool,
	onClick: PropTypes.func,
	onChange: PropTypes.func,
	value: PropTypes.any,
	name: PropTypes.string,
	align: PropTypes.oneOf(['start', 'center', 'between', 'end']),
};
