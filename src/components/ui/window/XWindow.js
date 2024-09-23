import classNames from 'classnames';
import { Resizable, ResizableBox } from 'react-resizable';
import Draggable, { DraggableCore } from 'react-draggable';
import './XWindow.scss';
export function XWindow({ children = '', className, x, y, w=300, h=300, title, resizable = true, draggable = true }) {
	return (
		<DraggableCore
			handle='.xWindow-bar'
			cancel='.xWindow-res'>
			<Resizable
				axis='both'
				width={w}
				height={h}
				resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se','ne']}
				handle={(handleAxis, ref) => (
					<div className={`xWindow-res xWindow-res--${handleAxis}`} ref={ref} />
				)}
			>
				<div className={classNames('xWindow', className, {
					'xWindow--resizable': resizable,
					'xWindow--draggable': draggable,
				})}>
					<div className="xWindow-bar">
						{title && <div className="xWindow-title">{title}</div>}
					</div>
					<div className="xWindow-content">{children}</div>
				</div>
			</Resizable>
		</DraggableCore>
	);//*/
}
