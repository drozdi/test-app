//todo add styles label over border
import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './XInput.scss';
export function XInput({
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
	type = 'text',
	label = '',
	labelColor = '',
	color = '',
	bg = '',
	disabled = false,
	onFocus = () => {},
	onBlur = () => {},
	...props
}) {
	const prependRef = useRef();
	const [isFocus, setFocus] = useState(false);
	const [shiftLabel, setShiftLabel] = useState(0);
	useEffect(() => {
		if (prependRef.current) {
			setShiftLabel(-1 * parseInt(prependRef.current.offsetWidth, 10));
		}
	}, [prependRef]);

	const isShift = useMemo(
		() => stackLabel || (outline && dense && isFocus),
		[outline, dense, stackLabel, isFocus],
	);
	const labelStyle = useMemo(
		() => ({
			left: isShift ? shiftLabel : '',
		}),
		[isShift, shiftLabel],
	);
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
				[`border-${color}`]: !!color,
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
					<input {...attrs} />
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
				<div className="x-input-backdor"></div>
				<div className="x-input-underlined"></div>
			</div>
			{after && <div className="x-input-after">{after}</div>}
		</div>
	);
}
