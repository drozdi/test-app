import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { DraggableCore } from 'react-draggable';
import { Resizable } from 'react-resizable';
import './XWindow.scss';

const changeHandle = {
	e(rect, dx) {
		return {
			w: rect.w + dx,
		};
	},
	w(rect, dx) {
		return {
			x: rect.x + dx,
			w: rect.w - dx,
		};
	},
	n(rect, dx, dy) {
		return {
			y: rect.y + dy,
			h: rect.h - dy,
		};
	},
	s(rect, dx, dy) {
		return {
			h: rect.h + dy,
		};
	},
	se(rect, dx, dy) {
		return Object.assign(changeHandle.s(rect, dx, dy), changeHandle.e(rect, dx, dy));
	},
	sw(rect, dx, dy) {
		return Object.assign(changeHandle.s(rect, dx, dy), changeHandle.w(rect, dx, dy));
	},
	ne(rect, dx, dy) {
		return Object.assign(changeHandle.n(rect, dx, dy), changeHandle.e(rect, dx, dy));
	},
	nw(rect, dx, dy) {
		return Object.assign(changeHandle.n(rect, dx, dy), changeHandle.w(rect, dx, dy));
	},
};

export function XWindow({
	children = '',
	className,
	x = 0,
	y = 0,
	w = 300,
	h = 300,
	title,
	resizable = true,
	draggable = true,
}) {
	const [position, setPosition] = useState({
		top: y,
		left: x,
		width: w,
		height: h,
	});
	const [top, setTop] = useState(x);
	const [left, setLeft] = useState(y);
	const [width, setWidth] = useState(w);
	const [height, setHeight] = useState(h);

	const onDragStart = useCallback(() => {}, []);
	const onDragMove = useCallback((e, { deltaX, deltaY }) => {
		setPosition((v) => ({
			...v,
			top: v.top + deltaY,
			left: v.left + deltaX,
		}));
	}, []);
	const onDragStop = useCallback(() => {}, []);

	const onResizeStart = useCallback(() => {}, []);
	const onResizeMove = useCallback((e, d) => {
		setPosition((v) => ({
			...v,
			...d.size,
		}));
		console.log(d);
	}, []);
	const onResizeStop = useCallback(() => {}, []);

	return (
		<DraggableCore
			disabled={!draggable}
			onDragStart={onDragStart}
			onDrag={onDragMove}
			onDragStop={onDragStop}
			handle=".xWindow-bar"
			cancel=".xWindow-res, .xWindow-drag-no"
		>
			<Resizable
				draggableOpts={{
					disabled: !resizable,
				}}
				width={w}
				height={h}
				onResizeStart={onResizeStart}
				onResize={onResizeMove}
				onResizeStop={onResizeStop}
				resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
				handle={(handleAxis, ref) => (
					<div className={`xWindow-res xWindow-res--${handleAxis}`} ref={ref} />
				)}
			>
				<div
					className={classNames('xWindow', className, {
						'xWindow--resizable': resizable,
						'xWindow--draggable': draggable,
					})}
					style={position}
				>
					<div className="xWindow-bar">
						{title && <div className="xWindow-title">{title}</div>}
					</div>
					<div className="xWindow-content">{children}</div>
				</div>
			</Resizable>
		</DraggableCore>
	); //*/
}
/**/
