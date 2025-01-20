import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { isArray } from '../../../utils/is';
import { useId } from '../../hooks/useId';
import { scopedKeydownHandler } from '../../internal/events/scoped-keydown-handler';
import { XAccordionProvider } from './XAccordionContext';

export function XAccordion({
	id,
	children,
	className,
	multiple,
	border,
	field,
	square,
	separated,
	onChange,
	value,
}) {
	const uid = useId(id);
	const [current, setCurrent] = useState(
		multiple && isArray(value)
			? value
			: multiple && value
				? [value]
				: (value ?? (multiple ? [] : undefined)),
	);
	const context = useMemo(() => {
		return {
			value: current,
			isActive: (value) =>
				multiple ? current?.includes(value) : value === current,
			getHeaderId: (value) => {
				return `${uid}-header-${value}`;
			},
			getPanelId: (value) => {
				return `${uid}-panel-${value}`;
			},
			getTabId: (value) => {
				return `${uid}-tab-${value}`;
			},
			onChange: ({ value }) => {
				if (multiple) {
					setCurrent((current) => {
						if (!current.includes(value)) return [...current, value];
						return current?.filter((v) => v !== value);
					});
				} else {
					setCurrent((v) => (v === value ? undefined : value));
				}
			},
			onKeyDown: scopedKeydownHandler({
				parentSelector: '.x-accordion',
				siblingSelector: 'button, [role="button"]',
				loop: true,
				activateOnFocus: !multiple,
				orientation: 'xy',
			}),
		};
	}, [current, multiple]);
	useEffect(() => {
		if (isArray(current) && !multiple) {
			setCurrent(current[0] ?? undefined);
		} else if (!isArray(current) && multiple) {
			setCurrent(current ? [current] : []);
		} else {
			setCurrent(multiple ? [] : undefined);
		}
	}, [multiple]);
	useEffect(() => onChange?.({ value: current }), [current]);
	return (
		<div
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
	onChange: PropTypes.bool,
};
