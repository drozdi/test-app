//todo add styles label over border
import classNames from 'classnames';
import { forwardRef, memo, useMemo, useRef } from 'react';
import { isString } from '../../../utils/is';
import { XIcon } from '../icon';
import './style.css';
const XInputBaseRoot = forwardRef(function XInputBaseFn(
	{
		id,
		label,
		placeholder,
		color,
		labelColor,
		leftSection: propsLeftSection,
		rightSection: propsRightSection,
	},
	ref,
) {
	const controlRef = useRef();
	const leftSection = useMemo(
		() =>
			isString(propsLeftSection) ? (
				<XIcon>{propsLeftSection}</XIcon>
			) : (
				propsLeftSection
			),
		[propsLeftSection],
	);
	const rightSection = useMemo(
		() =>
			isString(propsRightSection) ? (
				<XIcon>{propsRightSection}</XIcon>
			) : (
				propsRightSection
			),
		[propsRightSection],
	);
	const attrs = {
		className: 'x-input-native',
	};
	const modColor = null;
	const labelStyle = {};

	return (
		<div className="x-input-container">
			{propsLeftSection && <span className="x-input-section">{leftSection}</span>}

			<div className="x-input-outline">
				<div className="x-input-outline-start"></div>
				<div className="x-input-outline-notch">
					{label && (
						<label htmlFor={id} className="x-input-label">
							{label}
						</label>
					)}
				</div>
				<div className="x-input-outline-end"></div>
			</div>

			<div className="x-input-underlined"></div>

			<div className="x-input-control" ref={controlRef}>
				<input {...attrs} />
				{label && (
					<label
						htmlFor={id}
						className={classNames(
							'x-input-label',
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

			{propsRightSection && <span className="x-input-section">{rightSection}</span>}
		</div>
	);
});

export const XInputBase = memo(XInputBaseRoot);

XInputBaseRoot.propTypes = {
	/*children: PropTypes.node,
	className: PropTypes.string,

	dense: PropTypes.bool,
	outline: PropTypes.bool,
	field: PropTypes.bool,
	square: PropTypes.bool,
	underlined: PropTypes.bool,
	stackLabel: PropTypes.bool,

	color: PropTypes.string,
	labelColor: PropTypes.string,

	label: PropTypes.string,

	rules: PropTypes.array,
	lazyRules: PropTypes.bool,

	hint: PropTypes.string,
	hideHint: PropTypes.bool,
	hideMessage: PropTypes.bool,
	errorMessage: PropTypes.string,

	before: PropTypes.node,
	after: PropTypes.node,
	prepend: PropTypes.node,
	append: PropTypes.node,*/
};
