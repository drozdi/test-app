import classNames from 'classnames';
import PropTypes from 'prop-types';
import { memo, useMemo } from 'react';
import './style.scss';
export function XProgressRoot({
	children,
	className,
	type = 'bar',
	value,
	buffer,
	color,
	label,
	stripe,
	animation,
	indeterminate,
	size,
	thickness,
	reverse,
}) {
	const attrs = useMemo(() => ({
		role: 'progressbar',
		'aria-valuemin': 0,
		'aria-valuemax': 100,
		'aria-valuenow': indeterminate === true ? void 0 : value,
	}));
	const normalizedValue = useMemo(
		() => Math.max(0, Math.min(100, parseFloat(value))),
		[value],
	);
	const normalizedBuffer = useMemo(
		() => Math.max(0, Math.min(100, parseFloat(buffer))),
		[buffer],
	);
	const trackAttrs = useMemo(
		() => ({
			style: { width: buffer && !indeterminate ? `${normalizedBuffer}%` : '' },
		}),
		[buffer, indeterminate],
	);
	const valueAttrs = useMemo(
		() => ({
			style: { width: value && !indeterminate ? `${normalizedValue}%` : '' },
		}),
		[value, indeterminate],
	);
	const style = useMemo(
		() => ({
			height: thickness,
		}),
		[thickness],
	);

	function progressBar() {
		return (
			<div
				{...attrs}
				className={classNames('x-progress-bar', className, {
					'x-progress-bar--stripe': !indeterminate && stripe,
					'x-progress-bar--animation': !indeterminate && animation,
					'x-progress-bar--indeterminate': indeterminate,
					'x-progress-bar--reverse': reverse,
					[`text-${color}`]: color,
				})}
				style={style}
			>
				<div {...trackAttrs} className="x-progress-bar__track"></div>
				<div {...valueAttrs} className="x-progress-bar__value"></div>
				{!indeterminate && children && (
					<div className="x-progress-bar__label">{children}</div>
				)}
				{!indeterminate && !children && label && (
					<div className="x-progress-bar__label">{value}%</div>
				)}
			</div>
		);
	}

	const radius = useMemo(() => size / 2 - thickness / 2, [size, thickness]);
	const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

	const strokeDashOffsetBuffer = useMemo(
		() => ((100 - normalizedBuffer) / 100) * circumference,
		[normalizedBuffer, circumference],
	);
	const strokeDashOffset = useMemo(
		() => ((100 - normalizedValue) / 100) * circumference,
		[normalizedValue, circumference],
	);

	const diameter = useMemo(
		() => (radius / (1 - thickness / size)) * 2,
		[thickness, size, radius],
	);
	const strokeWidth = useMemo(
		() => (thickness / size) * diameter,
		[thickness, size, diameter],
	);

	function progressCircle() {
		return (
			<div
				{...attrs}
				style={{
					width: diameter,
					height: diameter,
				}}
				className={classNames('x-progress-circular', className, {
					'x-progress-circular--indeterminate': indeterminate,
					'x-progress-circular--reverse': reverse,
					[`text-${color}`]: color,
				})}
			>
				<svg
					style={{
						transform: `rotate(-90deg)`,
					}}
					xmlns="http://www.w3.org/2000/svg"
					viewBox={`0 0 ${diameter} ${diameter}`}
				>
					<circle
						className="x-progress-circular__underlay"
						fill="transparent"
						cx="50%"
						cy="50%"
						r={radius}
						strokeWidth={strokeWidth}
						strokeDasharray={circumference}
						strokeDashoffset={'' + indeterminate ? strokeDashOffsetBuffer : 0}
					/>

					<circle
						className={classNames('x-progress-circular__overlay')}
						fill="transparent"
						cx="50%"
						cy="50%"
						r={radius}
						strokeWidth={strokeWidth}
						strokeDasharray={circumference}
						strokeDashoffset={'' + strokeDashOffset}
					/>
				</svg>
				{children && <div className="x-progress-circular__label">{children}</div>}
				{!indeterminate && !children && label && (
					<div className="x-progress-circular__label">{value}%</div>
				)}
			</div>
		);
	}

	return type === 'bar' ? progressBar() : progressCircle();
}

export const XProgress = memo(XProgressRoot);

XProgressRoot.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	type: PropTypes.oneOf(['bar', 'circle']),
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	buffer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	thickness: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	color: PropTypes.oneOf([
		'primary',
		'secondary',
		'success',
		'negative',
		'positive',
		'info',
		'warning',
	]),
	label: PropTypes.bool,
	stripe: PropTypes.bool,
	animation: PropTypes.bool,
	indeterminate: PropTypes.bool,
	reverse: PropTypes.bool,
};
