import classNames from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import { DraggableCore } from 'react-draggable';
import { Resizable } from 'react-resizable';
import { XBtn } from '../btn/XBtn';
import './XWindow.scss';

const changeHandle = {
	e(rect, dx) {
		return {
			width: rect.width - dx,
		};
	},
	w(rect, dx) {
		return {
			left: rect.left + dx,
			width: rect.width - dx,
		};
	},
	n(rect, dx, dy) {
		return {
			top: rect.top + dy,
			height: rect.height - dy,
		};
	},
	s(rect, dx, dy) {
		return {
			height: rect.height - dy,
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
	icons = 'reload collapse fullscreen close',
	onReload = () => {},
	onClose = () => {},
	resizable = true,
	draggable = true,
}) {
	const [position, setPosition] = useState({
		top: y,
		left: x,
		width: w,
		height: h,
	});
	const [fullscreen, setFullscreen] = useState(false);
	const [collapse, setCollapse] = useState(false);

	const canDo = useCallback((type) => {
		return icons.includes(type)
	}, [icons]);

	const style = useMemo(()=> {
		return fullscreen || collapse? {}: position;
	}, [fullscreen, collapse, position])

	const onFullscreen = (event) => {
		if (!canDo('fullscreen')) {
			return;
		}
		if (!fullscreen) {
			setCollapse(false);
		}
		setFullscreen((v) => !v);
	};
	const onCollapse = (event) => {
		setCollapse((v) => !v);
	};

	const mixIcons = useMemo(
		() => (
			<div className="xWindow-drag-no">
				{(icons || '').split(/\s+/).map((type) => {
					if (type === 'close') {
						return (
							<XBtn
								key={type}
								className={'bg-red-700/60 hover:bg-red-700/40'}
								color="dark"
								size="sm"
								icon="mdi-close"
								flat={true}
								square={true}
								title="Закрыть"
							/>
						);
					} else if (type === 'reload') {
						return (
							<XBtn
								key={type}
								color="dark"
								size="sm"
								icon="mdi-reload"
								flat={true}
								square={true}
								title="Обновить"
							/>
						);
					} else if (type === 'fullscreen') {
						return (
							<XBtn
								onClick={onFullscreen}
								key={type}
								color="dark"
								size="sm"
								icon={
									fullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'
								}
								flat={true}
								square={true}
								title={fullscreen ? 'Свернуть в окно' : 'Развернуть'}
							/>
						);
					} else if (type === "collapse") {
						return (<XBtn
								onClick={onCollapse}
								key={type}
								color="dark"
								size="sm"
								icon="mdi-window-minimize"
								flat={true}
								square={true}
								title="Свернуть"
							/>)
					} 
					return null;
				})}
			</div>
		),
		[icons, fullscreen],
	);

	const onDragStart = useCallback(() => {}, []);
	const onDragMove = useCallback((e, { deltaX, deltaY }) => {
		!fullscreen && setPosition((v) => ({
			...v,
			top: v.top + deltaY,
			left: v.left + deltaX,
		}));
	}, [fullscreen]);
	const onDragStop = useCallback(() => {}, []);
	//
	const onResizeStart = useCallback(() => {}, []);
	const onResizeMove = useCallback((e, { handle, size }) => {
		setPosition((v) => ({
			...v,
			...changeHandle[handle](v, v.width - size.width, v.height - size.height),
		}));
	}, []);
	const onResizeStop = useCallback(() => {}, []);

	return (
		<DraggableCore
			disabled={!draggable && fullscreen}
			onDragStart={onDragStart}
			onDrag={onDragMove}
			onDragStop={onDragStop}
			handle=".xWindow-bar"
			cancel=".xWindow-res, .xWindow-drag-no"
		>
			<Resizable
				draggableOpts={{
					disabled: !resizable && (fullscreen || collapse),
				}}
				width={position.width}
				height={position.height}
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
						'xWindow--resizable': resizable && !fullscreen && !collapse,
						'xWindow--draggable': draggable && !fullscreen,
						'xWindow--fullscreen': fullscreen,
						'xWindow--collapse': collapse
					})}
					style={style}
				>
					<div className="xWindow-bar"
						onDoubleClick={onFullscreen}>
						{title && <div className="xWindow-title">{title}</div>}
						{mixIcons}
					</div>
					<div className="xWindow-content">{children}</div>
				</div>
				
			</Resizable>
		</DraggableCore>
	); //*/
}
/**/
