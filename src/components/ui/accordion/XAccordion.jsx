import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import { isArray } from '../../../utils/is';
import { useId } from '../../hooks/useId';
import { scopedKeydownHandler } from '../../internal/events/scoped-keydown-handler';
import { XAccordionProvider } from './XAccordionContext';

export function XAccordion({
	id,
	children,
	className,
	multiple = false,
	border,
	field,
	square,
	separated,
	onChange,
	value: currentValue,
	...props
}) {
	const uid = useId(id);
	const [current, setCurrent] = useState(
		currentValue,
		/*multiple && isArray(currentValue)
			? currentValue
			: multiple && currentValue
				? [currentValue]
				: (currentValue ?? (multiple ? [] : undefined)),//*/
	);
	const handleChange = (event, value) => {
		onChange?.({
			...event,
			value,
			target: {
				...event.target,
				name: props.name,
				id: uid,
				value,
			},
			stopPropagation: () => {
				event.stopPropagation();
			},
			preventDefault: () => {
				event.preventDefault();
			},
		});
		setCurrent(() => value);
	};
	const handleSelect = useCallback(
		(event, value) => {
			let newValue;

			console.log(multiple);

			if (multiple) {
				newValue = [].concat(currentValue);
				if (!newValue.includes(value)) {
					newValue.push(value);
				} else {
					newValue = newValue.filter((v) => v !== value);
				}
			} else {
				newValue = currentValue === value ? undefined : value;
			}

			console.log('val', newValue);

			handleChange(event, newValue);
			/*if (multiple) {
			setCurrent((current) => {
				if (!current.includes(value)) return [...current, value];
				return current?.filter((v) => v !== value);
			});
		} else {
			setCurrent((v) => (v === value ? undefined : value));
		}//*/
		},
		[currentValue, multiple],
	);
	const context = useMemo(() => {
		return {
			value: currentValue,
			isActive: (value) => {
				if (multiple && isArray(currentValue)) {
					return currentValue.includes(value);
				}
				return currentValue === value;
			},
			getHeaderId: (value) => {
				return `${uid}-header-${value}`;
			},
			getPanelId: (value) => {
				return `${uid}-panel-${value}`;
			},
			getTabId: (value) => {
				return `${uid}-tab-${value}`;
			},
			onChange: handleSelect,
			onKeyDown: scopedKeydownHandler({
				parentSelector: '.x-accordion',
				siblingSelector: 'button, [role="button"]',
				loop: true,
				activateOnFocus: !multiple,
				orientation: 'xy',
			}),
		};
	}, [uid, currentValue, multiple]);
	/*useEffect(() => {
		if (isArray(current) && !multiple) {
			setCurrent(current[0] ?? undefined);
		} else if (!isArray(current) && multiple) {
			setCurrent(current ? [current] : []);
		} else {
			setCurrent(multiple ? [] : undefined);
		}
	}, [multiple]);
	useEffect(() => onChange?.({ value: current }), [current]);//*/
	return (
		<div
			{...props}
			id={uid}
			className={classNames('x-accordion', className, {
				'x-accordion--border': border,
				'x-accordion--field': field,
				'x-accordion--square': square,
				'x-accordion--separated': separated,
			})}
		>
			<XAccordionProvider value={context}>{children}</XAccordionProvider>
		</div>
	);
}

XAccordion.propTypes = {
	id: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.array, PropTypes.string]),
	multiple: PropTypes.bool,
	border: PropTypes.bool,
	field: PropTypes.bool,
	square: PropTypes.bool,
	separated: PropTypes.bool,
	onChange: PropTypes.func,
};
