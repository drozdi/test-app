import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, createRef } from 'react';

import { DraggableCore } from 'react-draggable';
import { XBtn } from '../btn/XBtn';
import './XSidebar.scss';
import { XSidebarContext } from './XSidebarContext';

export class XSidebar extends Component {
	containerRef = createRef(null);
	sidebarRef = createRef(null);
	contextType = XSidebarContext;
	static propTypes = {
		children: PropTypes.any,
		className: PropTypes.string,
		type: PropTypes.string,
		mini: PropTypes.bool,
		miniToOverlay: PropTypes.bool,
		miniToggle: PropTypes.bool,
		miniMouse: PropTypes.bool,
		miniW: PropTypes.number,
		open: PropTypes.bool,
		overlay: PropTypes.bool,
		breakpoint: PropTypes.number,

		w: PropTypes.number,

		resizeable: PropTypes.bool,

		onResize: PropTypes.func,
		onMini: PropTypes.func,
		onToggle: PropTypes.func,
	};
	static defaultProps = {
		children: '',
		className: '',

		type: 'left',
		mini: false,
		miniToOverlay: false,
		miniToggle: false,
		miniMouse: false,
		miniW: 56,
		open: false,
		overlay: false,
		breakpoint: null,
		resizeable: false,
		w: 300,

		onResize: () => {},
		onMini: () => {},
		onToggle: () => {},
	};

	state = {
		width: this.props.w,
		miniWidth: this.props.miniW,
		isOpenBreakpoint: false,
	};
	constructor(props) {
		super(props);
	}

	get w() {
		return this.state.width;
	}
	set w(width) {
		this.setState((v) => ({
			...v,
			width,
		}));
	}
	get isLayout() {
		return !!this.context;
	}
	get belowBreakpoint() {
		return (
			(this.props.breakpoint &&
				this.isLayout &&
				this.context?.width < this.props.breakpoint) ||
			false
		);
	}
	get isOpen() {
		return this.belowBreakpoint ? this.isOpenBreakpoint : open;
	}
	get isMini() {
		return this.props.mini && !this.belowBreakpoint;
	}

	get isOverlayuseMemo() {
		return !this.belowBreakpoint &&
			this.props.open &&
			((this.props.mini && this.props.overlay) || this.props.miniToOverlay)
			? false
			: this.props.overlay || this.props.miniToOverlay;
	}

	get isMiniToOverlay() {
		return (this.props.miniToOverlay || this.props.overlay) && !this.belowBreakpoint;
	}

	get isMouseEvent() {
		return this.props.miniMouse && !this.props.miniToggle;
	}

	get canResized() {
		return (
			this.props.resizeable &&
			!this.props.miniToggle &&
			!this.isMouseEvent &&
			!this.isMini &&
			!this.belowBreakpoint
		);
	}

	get containerStyle() {
		return {
			minWidth: this.isOpen ? '' : 0,
			width:
				this.isOpen && this.isMini
					? this.state.miniWidth
					: this.isOpen &&
						  (this.canResized || (!!this.w && !this.isMiniToOverlay))
						? this.w
						: '',
		};
	}

	get style() {
		return { width: this.isOpen && this.canResized ? this.w : '' };
	}

	get reverse() {
		return this.props.type === 'right';
	}

	onHandleDrag = (e, ui) => {
		this.w = this.w + (this.reverse ? -ui.deltaX : ui.deltaX);
	};
	onHandleDragEnd = (e, ui) => {
		this.w = this.containerRef.current.getBoundingClientRect().width;
	};
	onMouseEnter = () => {
		this.isMouseEvent && onMini(false);
	};
	onMouseLeave = () => {
		this.isMouseEvent && onMini(true);
	};
	componentDidMount() {}

	render() {
		const {
			belowBreakpoint,
			isLayout,
			isMini,
			isOpen,
			isOverlay,
			isMiniToOverlay,
			isOpenBreakpoint,
			canResized,
			onHandleDrag = () => {},
			onHandleDragEnd = () => {},
		} = this;
		const { children, type, className, miniToggle, mini } = this.props;
		return (
			<XSidebarContext.Provider value={{ width: this.w, isMini, isOpen }}>
				<div
					className={classNames('xSidebar-container', {
						'xLayout-sidebar': isLayout,
						[`xLayout-sidebar--${type}`]: isLayout && !!type,
						[`xSidebar--${type}`]: !!type,
						'xSidebar--overlay': isOverlay,
						'xSidebar--close': !isOpen,
						'xSidebar--mini': isMini,
						'xSidebar--mini-overlay': isMiniToOverlay,
						'xSidebar--animate': !canResized,
					})}
					style={this.containerStyle}
					ref={this.containerRef}
				>
					<div
						onMouseEnter={this.onMouseEnter}
						onMouseLeave={this.onMouseLeave}
						className={classNames('xSidebar', {
							'xSidebar--toggle': miniToggle,
							[`xSidebar--${type}`]: !!type,
							'xSidebar--animate': !canResized,
						})}
						style={this.style}
					>
						<div className={classNames('xSidebar-content', className)}>
							{children}
							<br />
							isOpen: {isOpen ? 'true' : 'false'}
							<br />
							isMini: {isMini ? 'true' : 'false'}
							<br />
							isOverlay: {isOverlay ? 'true' : 'false'}
							<br />
							isMiniToOverlay: {isMiniToOverlay ? 'true' : 'false'}
							<br />
							belowBreakpoint: {belowBreakpoint ? 'true' : 'false'}
							<br />
							isOpenBreakpoint: {isOpenBreakpoint ? 'true' : 'false'}
							<br />
						</div>
						{miniToggle && (
							<div className="xSidebar-toggle">
								<XBtn
									color="dimmed"
									block={true}
									square={true}
									icon={
										isMini
											? `mdi-arrow-${type === 'left' ? 'right' : 'left'}-bold-box-outline`
											: `mdi-arrow-${type}-bold-box-outline`
									}
									onClick={() => this.props.onMini(!mini)}
									className="text-2xl py-0"
								/>
							</div>
						)}
						{canResized && (
							<DraggableCore onDrag={onHandleDrag} onStop={onHandleDragEnd}>
								<div className="xSidebar-res"></div>
							</DraggableCore>
						)}
					</div>
				</div>
			</XSidebarContext.Provider>
		);
	}
}
