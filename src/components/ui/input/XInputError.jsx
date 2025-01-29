import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.css';

export function XInputError({ className, children, ...props }) {
	if (!children) {
		return null;
	}
	return (
		<p
			{...props}
			className={classNames('x-input-message x-input-message--error', className)}
		>
			{children}
		</p>
	);
}

XInputError.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};
