import classNames from 'classnames';
import { PropTypes } from 'prop-types';
import { render } from '../../internal/render';
import './style.css';

export function XCard({ tag = 'div', className, border, flat, square, ...props }) {
	return render('div', {
		...props,
		className: classNames('x-card x-bg-surface', className, {
			'x-card--border': border,
			'x-card--flat': flat,
			'x-card--square': square,
		}),
	});
}

XCard.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
	border: PropTypes.bool,
	flat: PropTypes.bool,
	square: PropTypes.bool,
};
