import classNames from 'classnames';
import { createElement, useMemo } from 'react';
import './style.scss';
export function XItem({
	tag = 'li',
	className,
	children,
	tabIndex = 0,
	dense = false,
	active = false,
	disable = false,
	role = null,
}) {
	const attrs = useMemo(
		() => ({
			className: classNames('x-item', className, {
				'x-item--dense': dense,
				'x-item--active': active,
				'x-item--disable': disable,
			}),
			tabindex: disable ? -1 : (tabIndex ?? -1),
			role: role ?? 'listitem',
			disable: disable,
		}),
		[disable, tabIndex, dense, active, className],
	);
	return createElement(
		tag,
		attrs,
		[<div className="x-item__backdor" tabIndex={-1} />].concat(children),
	);
}
