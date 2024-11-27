//todo add styles label over border
import classNames from 'classnames';
import { forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react';
import './style.scss';
export const XInput = memo(
	forwardRef(function XInput(
		{
			className = '',
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
			label = '',
			labelColor = '',
			color = '',
			bg = '',
			disabled = false,
			onFocus = () => {},
			onBlur = () => {},
			...props
		},
		ref,
	) {
		const prependRef = useRef();
		const [isFocus, setFocus] = useState(false);
		const [shiftLabel, setShiftLabel] = useState(0);
		useEffect(() => {
			setShiftLabel(-1 * parseInt(prependRef.current?.offsetWidth || 0, 10));
		}, [prependRef]);

		const isShift = outline && dense && isFocus;
		const labelStyle = {
			left: isShift ? shiftLabel : '',
		};
		const handleFocus = useCallback(
			(e) => {
				setFocus(true);
				onFocus(e);
			},
			[onFocus],
		);
		const handleBlur = useCallback(
			(e) => {
				setFocus(false);
				onBlur(e);
			},
			[onBlur],
		);

		const attrs = {
			type: 'text',
			...props,
			disabled: disabled,
			className: classNames('x-input-native', className),
			onFocus: handleFocus,
			onBlur: handleBlur,
		};

		return (
			<div
				className={classNames('x-input', {
					'x-input--outline': outline,
					'x-input--field': field,
					'x-input--square': square,
					'x-input--underlined': underlined,
					'x-input--dense': dense,
					'x-input--stack-label': stackLabel,
					'x-input--disabled': disabled,
					[`x-input--${color}`]: !!color,
				})}
			>
				{before && <div className="x-input-before">{before}</div>}
				<div className="x-input-container">
					{prepend && (
						<div className="x-input-prepend" ref={prependRef}>
							{prepend}
						</div>
					)}
					<div className="x-input-control">
						<input {...attrs} ref={ref} />
						{label && (
							<label
								htmlFor={props.id}
								className={classNames(
									'x-input-label',
									labelColor || color
										? 'text-' + (labelColor || color)
										: '',
								)}
								style={labelStyle}
							>
								{label}
							</label>
						)}
					</div>
					{append && <div className="x-input-append">{append}</div>}
					<div className="x-input-underlay"></div>
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
					<div className="x-input-underlined"></div>
				</div>
				{after && <div className="x-input-after">{after}</div>}
			</div>
		);
	}),
);
