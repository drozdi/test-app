import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Component } from 'react';
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

const moveHorizontally = (val) => {
	if (val === 'center') {
		//const [pWidth] = getComputedSize(root.value.parentNode);
		const [pWidth] = getComputedSize(parent.value);
		val = (pWidth - width.value) / 2;
	} else if (val === 'right') {
		//const [pWidth] = getComputedSize(root.value.parentNode);
		const [pWidth] = getComputedSize(parent.value);
		val = pWidth - width.value;
	} else if (val === 'left') {
		val = 0;
	}
	left.value = val;
};
const moveVertically = (val) => {
	if (val === 'center') {
		//const [, pHeight] = getComputedSize(root.value.parentNode);
		const [, pHeight] = getComputedSize(parent.value);
		val = (pHeight - height.value) / 2;
	} else if (val === 'bottom') {
		//const [, pHeight] = getComputedSize(root.value.parentNode);
		const [, pHeight] = getComputedSize(parent.value);
		val = pHeight - height.value;
	} else if (val === 'top') {
		val = 0;
	}
	top.value = val;
};

const changeWidth = (val) => {
	if (!val) {
		return;
	}
	if (isString(val) && val.substr(-1) === '%') {
		val = Math.ceil((getComputedSize(parent.value)[0] * parseInt(val, 10)) / 100);
	}
	width.value = minMax(val, limits.value.minWidth, limits.value.maxWidth);
	if (props.lockAspectRatio) {
		height.value = width.value * aspectFactor.value;
	}
};
const changeHeight = (val) => {
	if (!val) {
		return;
	}
	if (isString(val) && val.substr(-1) === '%') {
		val = Math.ceil((getComputedSize(parent.value)[1] * parseInt(val, 10)) / 100);
	}
	height.value = minMax(val, limits.value.minHeight, limits.value.maxHeight);
	if (props.lockAspectRatio) {
		width.value = height.value / aspectFactor.value;
	}
};

export class XWindow extends Component {
	static propTypes = {
		parent: PropTypes.node,
		children: PropTypes.node,
		className: PropTypes.string,
		x: PropTypes.number,
		y: PropTypes.number,
		w: PropTypes.number,
		h: PropTypes.number,
		title: PropTypes.string,
		icons: PropTypes.string,
		onReload: PropTypes.func,
		onClose: PropTypes.func,
		resizable: PropTypes.bool,
		draggable: PropTypes.bool,
	};
	static defaultProps = {
		parent: document.body,
		children: '',
		className: '',
		x: 0,
		y: 0,
		w: 300,
		h: 300,
		title: '',
		icons: 'reload collapse fullscreen close',
		onReload: () => {},
		onClose: () => {},
		resizable: true,
		draggable: true,
	};
	state = {
		position: {
			top: this.props.y,
			left: this.props.x,
			width: this.props.w,
			height: this.props.h,
		},
		isFullscreen: false,
		isCollapse: false,
	};
	constructor(props) {
		super(props);
		console.log(this);
	}

	onDragStart = () => {};
	onDragMove = (e, { deltaX, deltaY }) => {
		if (!this.state.isFullscreen) {
			this.position = {
				top: this.position.top + deltaY,
				left: this.position.left + deltaX,
			};
		}
	};
	onDragStop = () => {};
	onResizeStart = () => {};
	onResizeMove = (e, { handle, size }) => {
		this.position = changeHandle[handle](
			this.state.position,
			this.state.position.width - size.width,
			this.state.position.height - size.height,
		);
	};
	onResizeStop = () => {};

	canDo = (type) => {
		return this.props.icons.includes(type);
	};
	onFullscreen = (event) => {
		if (!this.canDo('fullscreen')) {
			return;
		}
		if (!this.state.isFullscreen) {
			this.setState((v) => ({
				...v,
				isCollapse: false,
			}));
		}
		this.setState((v) => ({
			...v,
			isFullscreen: !v.isFullscreen,
		}));
	};
	onCollapse = (event) => {
		this.setState({
			...this.state,
			isCollapse: this.state.isCollapse,
		});
	};
	renderIcon = () => {
		return (
			<div className="xWindow-drag-no">
				{(this.props.icons || '').split(/\s+/).map((type) => {
					if (type === 'close') {
						return (
							<XBtn
								key={type}
								className={'bg-red-700/60 hover:bg-red-700/40'}
								color="dark"
								size="sm"
								icon="mdi-close"
								flat={true}
								tonal={true}
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
								tonal={true}
								square={true}
								title="Обновить"
							/>
						);
					} else if (type === 'fullscreen') {
						return (
							<XBtn
								onClick={this.onFullscreen}
								key={type}
								color="dark"
								size="sm"
								icon={
									this.state.isFullscreen
										? 'mdi-fullscreen-exit'
										: 'mdi-fullscreen'
								}
								flat={true}
								tonal={true}
								square={true}
								title={
									this.state.isFullscreen
										? 'Свернуть в окно'
										: 'Развернуть'
								}
							/>
						);
					} else if (type === 'collapse') {
						return (
							<XBtn
								onClick={this.onCollapse}
								key={type}
								color="dark"
								size="sm"
								icon="mdi-window-minimize"
								flat={true}
								tonal={true}
								square={true}
								title="Свернуть"
							/>
						);
					}
					return null;
				})}
			</div>
		);
	};
	get position() {
		return this.state.position;
	}
	set position(value) {
		this.setState((v) => ({
			...v,
			position: {
				...v.position,
				...value,
			},
		}));
	}
	get style() {
		return this.state.isFullscreen || this.state.isCollapse
			? {}
			: this.state.position;
	}
	render() {
		const { draggable, resizable, title, className, children } = this.props;
		const { position, isFullscreen, isCollapse } = this.state;
		return (
			<DraggableCore
				disabled={!draggable && isFullscreen}
				onDragStart={this.onDragStart}
				onDrag={this.onDragMove}
				onDragStop={this.onDragStop}
				handle=".xWindow-bar"
				cancel=".xWindow-res, .xWindow-drag-no"
			>
				<Resizable
					draggableOpts={{
						disabled: !resizable && (isFullscreen || isCollapse),
					}}
					width={position.width}
					height={position.height}
					onResizeStart={this.onResizeStart}
					onResize={this.onResizeMove}
					onResizeStop={this.onResizeStop}
					resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
					handle={(handleAxis, ref) => (
						<div
							className={`xWindow-res xWindow-res--${handleAxis}`}
							ref={ref}
						/>
					)}
				>
					<div
						className={classNames('xWindow', className, {
							'xWindow--resizable':
								resizable && !isFullscreen && !isCollapse,
							'xWindow--draggable': draggable && !isFullscreen,
							'xWindow--fullscreen': isFullscreen,
							'xWindow--collapse': isCollapse,
						})}
						style={this.style}
					>
						<div className="xWindow-bar" onDoubleClick={this.onFullscreen}>
							{title && <div className="xWindow-title">{title}</div>}
							{this.renderIcon()}
						</div>
						<div className="xWindow-content">{children}</div>
					</div>
				</Resizable>
			</DraggableCore>
		);
	}
}
