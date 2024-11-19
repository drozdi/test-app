import classNames from 'classnames';
import { useMemo } from 'react';
import './style.scss';
export function XProgressBar({ className, trackColor, color, stripe }) {
	const attr = useMemo(() => ({
		role: 'progressbar',
		'aria-valuemin': 0,
		'aria-valuemax': 100,
		/*'aria-valuenow': props.indeterminate === true
			? void 0
			: props.value*/
	}));
	return (
		<div
			{...attr}
			className={classNames('x-progress-bar', className, {
				'x-progress-bar--stripe': stripe,
			})}
		>
			<div className="x-progress-bar__track"></div>
			<div className="x-progress-bar__value"></div>
		</div>
	);
}
