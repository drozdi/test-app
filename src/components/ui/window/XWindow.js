import classNames from 'classnames';
import './XWindow.scss';
export function XWindow({ children, className, x, y, w, h, title }) {
	return (
		<div className={classNames('xWindow', className)}>
			<div className="xWindow-bar">
				{title && <div className="xWindow-title">{title}</div>}
			</div>
			<div className="xWindow-content">{children}</div>
		</div>
	);
}
