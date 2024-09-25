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

	/*function icon (type) {
		if (type === "collapse") {
			return {
				onClick: () => collapse.value = true,
				icon: 'minimize',
				title: 'Свернуть',
				//icon: collapse.value? 'mdi-arrow-collapse-up': 'mdi-arrow-collapse-down'
			}
		} else if (type === "fullscreen") {
			return {
				onClick: () => fullscreen.value = !fullscreen.value,
				icon: fullscreen.value? 'mdi-fullscreen-exit': 'mdi-fullscreen',
				title: fullscreen.value? $i18n.t('btn.unFullscreen'): $i18n.t('btn.fullscreen'),
			}
		} else if (type === "close") {
			return {
				onClick: onClose,
				color: "red",
				icon: "close",
				title: $i18n.t('btn.close'),
				//icon: "mdi-close",
			}
		} else if (type === "reload") {
			return {
				onClick: onReload,
				icon: "mdi-reload",
				title: $i18n.t('btn.reload'),
			}
		}
		return null;
	}*/

	const onFullscreen = (event) => {
		setFullscreen((v) => !v);
		setPosition((v) => ({
			...v,
			top: 0,
			left: 0,
			width: window.innerWidth,
			height: window.innerHeight,
		}));
	};

	const mixIcons = useMemo(
		() => (
			<div className="xWindow-drag-no">
				{(icons || '').split(/\s+/).map((type) => {
					if (type === 'close') {
						return (
							<XBtn
								key={type}
								color="dark"
								size="sm"
								icon="mdi-close"
								flat={true}
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
								title={fullscreen ? 'Свернуть в окно' : 'Развернуть'}
							/>
						);
					}
					return null;
				})}
			</div>
		),
		[icons, fullscreen],
	);

	const onDragStart = useCallback(() => {}, []);
	const onDragMove = useCallback((e, { deltaX, deltaY }) => {
		setPosition((v) => ({
			...v,
			top: v.top + deltaY,
			left: v.left + deltaX,
		}));
	}, []);
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
						'xWindow--resizable': resizable,
						'xWindow--draggable': draggable,
					})}
					style={position}
				>
					<div className="xWindow-bar">
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
