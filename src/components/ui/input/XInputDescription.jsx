import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.css';

export function XInputDescription({ className, children, ...props }) {
	if (!children) {
		return null;
	}
	return (
		<p
			{...props}
			className={classNames('x-input-message x-input-message--hint', className)}
		>
			{children === ' ' ? '&nbsp;' : children}
		</p>
	);
}

XInputDescription.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};
