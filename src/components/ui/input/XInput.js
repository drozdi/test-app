//todo add styles label over border
import { useEffect, useRef, useState } from 'react';
import './XInput.scss';
export function XInput({ type = 'text', label = '', ...props }) {
	const labelRef = useRef(null);
	const [labelWidth, setLabelWidth] = useState(0);
	useEffect(() => {
		if (labelRef.current) {
			setLabelWidth(labelRef.current.getBoundingClientRect().width + 2);
		}
	}, [labelRef]);
	return (
		<div className="x-input__wrap">
			<input type={type} className="x-input" {...props} />

			{label && (
				<label ref={labelRef} htmlFor={props.id} className="x-input__label">
					{label}
				</label>
			)}

			<div className="x-input__outline">
				<div className="x-input__outline_start"></div>
				<div
					className="x-input__outline_notch"
					style={{ width: labelWidth }}
				></div>
				<div className="x-input__outline_end"></div>
			</div>
		</div>
	);
}
