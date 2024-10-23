import classNames from 'classnames';
import { useMemo } from 'react';
import './style.scss';
export function XItemSection({
	children,
	side = false,
	top = false,
	noWrap = false,
	thumbnail = false,
}) {
	const main = useMemo(() => !side, [side]);
	return (
		<div
			className={classNames('x-item__section', {
				'x-item__section--main': main,
				'x-item__section--side': side,
				'x-item__section--top': top,
				'x-item__section--nowrap': noWrap,
				'x-item__section--thumbnail': thumbnail,
			})}
		>
			{children}
		</div>
	);
}
