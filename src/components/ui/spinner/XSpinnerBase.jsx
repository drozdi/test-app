import classNames from 'classnames';
import './style.scss';

export function XSpinnerBase({
	children,
	className,
	size = '1em',
	color,
	viewBox = '0 0 100 100',
	...props
}) {
	return (
		<svg
			className={classNames('x-spinner', className, {
				[`text-${color}`]: color,
			})}
			width={size}
			height={size}
			viewBox={viewBox}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			{children}
		</svg>
	);
}
