import classNames from 'classnames';
import { useMemo } from 'react';
import './style.scss';
export function XItemSection({ children, side = false, top = false, noWrap = false }) {
	const main = useMemo(() => !side, [side]);
	return (
		<div
			className={classNames('x-item__section', {
				'x-item__section--main': main,
				'x-item__section--side': side,
			})}
		>
			{children}
		</div>
	);
}
