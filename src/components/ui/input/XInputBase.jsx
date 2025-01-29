//todo add styles label over border
import classNames from 'classnames';
import { forwardRef, memo, useMemo, useRef } from 'react';
import { isString } from '../../../utils/is';
import { useInput } from '../../hooks/useInput';
import { XIcon } from '../icon';
import './style.css';
import { XInputLabel } from './XInputLabel';
const XInputBaseRoot = forwardRef(function XInputBaseFn(props, ref) {
	const { value, dirty, error, errors, focus, inputRef, disabled, attrs } = useInput(
		props,
		ref,
	);

	const {
		id,
		label,
		dense,
		square,
		filled,
		outline,
		underlined,
		color,
		labelColor,
		stackLabel,
		required,
		leftSection: propsLeftSection,
		rightSection: propsRightSection,

		lazyRules,
		hint,
		hideHint,
		hideMessage,
		errorMessage,

		...other
	} = props;

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
	const isError = dirty && (error || !!errorMessage);
	const modColor = isError ? 'negative' : color;

	const shiftLabel = useMemo(
		() => controlRef.current?.offsetLeft || 0,
		[controlRef.current, leftSection],
	);

	const isShift = dense && outline && (focus || stackLabel);
	const labelStyle = {
		left: isShift ? -shiftLabel : '',
	};

	return (
		<div
			className={classNames('x-input-container', {
				'x-input--dense': dense,
				'x-input--square': square,

				'x-input--filled': filled,
				'x-input--outline': outline,
				'x-input--underlined': underlined,

				'x-input--stack-label': stackLabel,
				'x-input--disabled': disabled,
				[`x-input--${modColor}`]: !!modColor,
			})}
		>
			{propsLeftSection && <span className="x-input-section">{leftSection}</span>}
			<div className="x-input-underlay"></div>

			<div className="x-input-outline">
				<div className="x-input-outline-start"></div>
				<div className="x-input-outline-notch">
					<XInputLabel required={required}>{label}</XInputLabel>
				</div>
				<div className="x-input-outline-end"></div>
			</div>

			<div className="x-input-underlined"></div>

			<div className="x-input-control" ref={controlRef}>
				<input {...{ ...other, ...attrs }} className="x-input-native" />

				<XInputLabel
					htmlFor={id}
					color={labelColor || modColor}
					style={labelStyle}
					required={required}
				>
					{label}
				</XInputLabel>
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
