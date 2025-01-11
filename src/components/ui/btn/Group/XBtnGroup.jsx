import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { forwardRefWithAs } from '../../../../utils/render';
import './style.css';
import { XBtnGroupContext } from './XBtnGroupContext';

import { isArray } from '../../../../utils/is';

function XBtnGroupFn(params = {}) {
	const {
		children,
		className,
		selectable,
		switchable,
		multiple,
		vertical,
		separator,
		onClick,
		onChange,
		value,
		align,
		spread,
		name,
		...props
	} = params;
	const elementRef = useRef();
	const [current, setCurrent] = useState(value ?? (multiple ? [] : undefined));

	const handleClick = useCallback(
		(value) => {
			onClick?.(value);
			if (switchable) {
				setCurrent(value);
				return;
			}
			if (!selectable) {
				return;
			}
			if (multiple) {
				setCurrent((current) => {
					if (!current.includes(value)) return [...current, value];
					return current.filter((v) => v !== value);
				});
			} else {
				setCurrent((v) => (v === value ? undefined : value));
			}
		},
		[selectable, switchable, multiple, onClick],
	);

	useEffect(() => {
		if (isArray(current) && !multiple) {
			setCurrent(current[0] ?? undefined);
		} else if (!isArray(current) && multiple) {
			setCurrent(current ? [current] : []);
		} else {
			setCurrent(multiple ? [] : undefined);
		}
	}, [multiple]);

	useEffect(() => {
		setCurrent(value ?? (multiple ? [] : undefined));
	}, [value]);

	useEffect(() => onChange?.(current), [current]);

	const context = {
		getElement: () => elementRef.current,
		btnProps: props,
		switchable,
		selectable,
		multiple,
		current,
		onChange: handleClick,
		//isDisabled: (value) => {},
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
