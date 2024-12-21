import classNames from 'classnames';
import { useRef, useMemo}
import './style.css';
export const XSelect = (props) => {
	const {
		className,
		dense,
		outline,
		field,
		square,
		underlined,
		stackLabel,
		before,
		after,
		prepend,
		append,
		label,
		labelColor,
		color,

		lazyRules,
		hint,
		hideHint,
		hideMessage,
		errorMessage,

		...other
	} = props;
	const controlRef = useRef();

	const shiftLabel = useMemo(
		() => controlRef.current?.offsetLeft || 0,
		[controlRef.current, prepend],
	);

	const isShift = dense && outline && (focus || stackLabel);
	const labelStyle = {
		left: isShift ? -shiftLabel : '',
	};

	const isError = false; //dirty && (error || !!errorMessage);
	const errorMes = errorMessage; // || errors[0] || '';

	const attrs = {
		type: 'text',
		...other,
		..._attrs,
		className: classNames('x-input-native', className),
	};

	const modColor = isError ? 'negative' : color;
	return (
		<div
			className={classNames('x-select', {
				'x-select--outline': outline,
				'x-select--field': field,
				'x-select--square': square,
				'x-select--underlined': underlined,
				'x-select--dense': dense,
				'x-select--stack-label': stackLabel,
				'x-select--disabled': disabled,
				[`x-select--${modColor}`]: !!modColor,
			})}
		>
			{before && <div className="x-select-before">{before}</div>}
			<div className="x-select-container">
				<div className="x-select-underlay"></div>
				<div className="x-select-outline">
					<div className="x-select-outline-start"></div>
					<div className="x-select-outline-notch">
						{label && (
							<label htmlFor={props.id} className="x-select-label">
								{label}
							</label>
						)}
					</div>
					<div className="x-select-outline-end"></div>
				</div>
				<div className="x-select-underlined"></div>
				{prepend && <div className="x-select-prepend">{prepend}</div>}
				<div className="x-select-control" ref={controlRef}>
					<input {...attrs} />
					{label && (
						<label
							htmlFor={props.id}
							className={classNames(
								'x-select-label',
								labelColor || modColor
									? 'text-' + (labelColor || modColor)
									: '',
							)}
							style={labelStyle}
						>
							{label}
						</label>
					)}
				</div>
				{append && <div className="x-select-append">{append}</div>}
			</div>
			{after && <div className="x-select-after">{after}</div>}
			{!hideMessage && (
				<div
					className={classNames('x-select-messages', {
						'x-select-messages--hint': !isError && !hideHint,
						'x-select-messages--error': isError,
					})}
					role="alert"
					aria-live="polite"
				>
					{hint === ' ' ? (
						<p className="x-select-message x-select-message--hint">&nbsp;</p>
					) : (
						hint && (
							<p className="x-select-message x-select-message--hint">
								{hint}
							</p>
						)
					)}
					{dirty && (
						<p className="x-select-message x-select-message--error">
							{errorMes}
						</p>
					)}
				</div>
			)}
		</div>
	);
};
