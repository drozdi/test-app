//todo add styles label over border
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import './XInput.scss';
export function XInput({
	outline = false,
	field = false,
	type = 'text',
	label = '',
	...props
}) {
	const labelRef = useRef(null);
	const [labelWidth, setLabelWidth] = useState(0);
	useEffect(() => {
		if (labelRef.current) {
			setLabelWidth(labelRef.current.getBoundingClientRect().width + 2);
		}
	}, [labelRef]);
	return (
		<div className="x-input-wrap">
			<div className="x-input-container">
				<div className="x-input-control"></div>
			</div>
			<input
				type={type}
				className={classNames('x-input', {
					'x-input--outline': outline,
					'x-input--field': field,
					//"x-input--field--outline": field && outline
				})}
				{...props}
			/>

			{label && (
				<label ref={labelRef} htmlFor={props.id} className="x-input__label">
					{label}
				</label>
			)}

			{outline && (
				<div className="x-input__outline">
					<div className="x-input__outline_start"></div>
					<div
						className="x-input__outline_notch"
						style={{ width: labelWidth }}
					></div>
					<div className="x-input__outline_end"></div>
				</div>
			)}
		</div>
	);
}
