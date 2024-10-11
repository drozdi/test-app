//todo add styles label over border
import classNames from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import './XInput.scss';
export function XInput({
	dense = false,
	outline = false,
	field = false,
	square = false,
	underlined = false,
	stackLabel = false,
	before = '',
	after = '',
	prepend = '',
	append = '',
	type = 'text',
	label = '',
	color = '',
	bg = '',
	...props
}) {
	const labelRef = useRef();
	const controlRef = useRef();
	const prependRef = useRef();
	const [shiftLabel, setShiftLabel] = useState(0);
	useEffect(() => {
		if (prependRef.current) {
			console.log(prependRef.current.offsetWidth);
			setShiftLabel(-1 * parseInt(prependRef.current.offsetWidth, 10));
		}
	}, [prependRef]);
	//todo add focus input
	const isShift = useMemo(
		() => stackLabel || (outline && dense),
		[outline, dense, stackLabel],
	);
	const labelStyle = useMemo(
		() => ({
			left: isShift ? shiftLabel : '',
		}),
		[isShift, shiftLabel],
	);
	return (
		<div
			className={classNames('x-input', {
				'x-input--outline': outline,
				'x-input--field': field,
				'x-input--square': square,
				'x-input--underlined': underlined,
				'x-input--dense': dense,
				'x-input--stack-label': stackLabel,
				[`x-input--${color}`]: !!color,
			})}
		>
			{before && <div className="x-input-before">{before}</div>}
			<div
				className={classNames('x-input-container', {
					rrr: !!bg,
					[`x-bg-${bg}`]: !!bg,
				})}
			>
				{prepend && (
					<div className="x-input-prepend" ref={prependRef}>
						{prepend}
					</div>
				)}
				<div className="x-input-control" ref={controlRef}>
					<input {...props} type={type} className="x-input-native" />
					{label && (
						<label
							htmlFor={props.id}
							className="x-input-label"
							ref={labelRef}
							style={labelStyle}
						>
							{label}
						</label>
					)}
				</div>
				{append && <div className="x-input-append">{append}</div>}
				{outline && (
					<div className="x-input-outline">
						<div className="x-input-outline-start"></div>
						<div className="x-input-outline-notch">
							{label && (
								<label htmlFor={props.id} className="x-input-label">
									{label}
								</label>
							)}
						</div>
						<div className="x-input-outline-end"></div>
					</div>
				)}
			</div>
			{after && <div className="x-input-after">{after}</div>}
		</div>
	);
}
