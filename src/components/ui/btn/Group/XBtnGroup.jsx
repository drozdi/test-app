import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useCallback, useRef } from 'react';
import { forwardRefWithAs } from '../../../internal/render';
import './style.css';
import { XBtnGroupContext } from './XBtnGroupContext';

import { isArray } from '../../../../utils/is';

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
		switch (event.code) {
			case 'Enter':
			case 'Space':
				event.preventDefault();
				target.click();
				break;
			case 'ArrowLeft':
			case 'ArrowUp':
				event.preventDefault();
				if (target.previousSibling) {
					target.previousSibling.focus();
				} else {
					target.parentNode.lastChild.focus();
				}
				break;
			case 'ArrowRight':
			case 'ArrowDown':
				event.preventDefault();
				if (target.nextSibling) {
					target.nextSibling.focus();
				} else {
					target.parentNode.firstChild.focus();
				}
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
