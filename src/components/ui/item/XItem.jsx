import classNames from 'classnames';
import { useMemo } from 'react';
import './style.scss';
export function XItem({ tag = 'li', tabIndex = 0, className, children }) {
	const attrs = useMemo(
		() => ({
			className: classNames('x-item', className),
			tabindex: tabIndex ?? -1,
		}),
		[],
	);
	return (
		<li {...attrs}>
			<div className="x-item__backdor" tabIndex={-1}></div>
			{children}
		</li>
	);
}
