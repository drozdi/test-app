import classNames from 'classnames';
import PropTypes from 'prop-types';
import './styles.css';
import { useXTabsContext } from './XTabsContext';
export function XTabsPanel({ className, children, value, keepMounted }) {
	const ctx = useXTabsContext();
	const active = ctx.isActive(value);
	const content = ctx.keepMounted || keepMounted ? children : active ? children : null;
	return (
		<div className={classNames('x-tabs-panel', className)} role="tabpanel">
			{content}
		</div>
	);
}

XTabsPanel.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	value: PropTypes.any,
	keepMounted: PropTypes.bool,
};
