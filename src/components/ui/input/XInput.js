//todo add styles label over border
import classNames from 'classnames';
import './XInput.scss';
export function XInput({
	outline = false,
	field = false,
	square = false,
	before = '',
	after = '',
	prepend = '',
	append = '',
	type = 'text',
	label = '',
	...props
}) {
	return (
		<div
			className={classNames('x-input', {
				'x-input--outline': outline,
				'x-input--field': field,
				'x-input--square': square,
			})}
		>
			{before && <div className="x-input-before">{before}</div>}
			<div className="x-input-container">
				{prepend && <div className="x-input-prepend">{prepend}</div>}
				<div className="x-input-control">
					<input {...props} type={type} className="x-input-native" />
					{label && (
						<label htmlFor={props.id} className="x-input-label">
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
