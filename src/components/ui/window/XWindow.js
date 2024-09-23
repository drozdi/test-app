import classNames from 'classnames';
import { Resizable } from 'react-resizable';
import './XWindow.scss';
export function XWindow({ children, className, x, y, w, h, title, resizable = true }) {
	return (
		<Resizable
			width={200}
			height={200}
			handle={(handleAxis) => (
				<div className={`xWindow-res xWindow-res--${handleAxis}`} />
			)}
		>
			<div
				className={classNames('xWindow', className, {
					'xWindow--resizable': resizable,
				})}
			>
				<div className="xWindow-bar">
					{title && <div className="xWindow-title">{title}</div>}
				</div>
				<div className="xWindow-content">{children}</div>
			</div>
		</Resizable>
	);
}
