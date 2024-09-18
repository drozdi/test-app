import classNames from 'classnames';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useResizeObserver } from '../../../hooks/useResizeObserver';
import { XLayoutContext } from '../layout/XLayoutContext';

import './XSidebar.scss';

import { XBtn } from '../btn/XBtn';
import { XSidebarContext } from './XSidebarContext';

export function XSidebar({
	children,
	className,
	type = 'left',
	mini = false,
	miniToOverlay = false,
	open = false,
	overlay = false,
	breakpoint = null,

	mouseMini = false,
	toggleMini = false,
	resizeable = false,

	w = null,
	mW = null,

	onResize = () => {},
	onMini = () => {},
	onToggle = () => {},
	...props
}) {
	/*const props = XSidebarBase.getProps(inProps, {});
    const {children, className, type, mini, miniToOverlay, open, overlay, breakpoint, onMouseEnter, onMouseLeave, onResize, onMini, onToggle } = props;*/

	const { $layout, $update } = useContext(XLayoutContext) || {};

	const [width, setWidth] = useState(w);
	const [miniWidth, setMiniWidth] = useState(mW);
	const [isOpenBreakpoint, setOpenBreakpoint] = useState(false);

	const containerRef = useResizeObserver((target, entry) => {
		//onResize(target.offsetWidth);
		//$layout && $update(type, 'size', target.offsetWidth);
	});

	const belowBreakpoint = useMemo(
		() => (breakpoint && $layout.width < breakpoint) || false,
		[$layout, breakpoint],
	);

	useEffect(() => {
		setOpenBreakpoint(false);
	}, [belowBreakpoint]);

	useEffect(() => {
		setOpenBreakpoint((v) => !v);
	}, [open]);

	const isOpen = useMemo(
		() => (belowBreakpoint ? isOpenBreakpoint : open),
		[open, belowBreakpoint, isOpenBreakpoint],
	);

	const isMini = useMemo(() => mini && !belowBreakpoint, [mini, belowBreakpoint]);

	const isOverlay = useMemo(
		() =>
			!belowBreakpoint && open && ((mini && overlay) || miniToOverlay)
				? false
				: overlay || miniToOverlay,
		[overlay, mini, open, miniToOverlay, belowBreakpoint],
	);

	const isMiniToOverlay = useMemo(
		() => (miniToOverlay || overlay) && !belowBreakpoint,
		[miniToOverlay, overlay, belowBreakpoint],
	);

	const isMouseEvent = useMemo(() => mouseMini && !toggleMini, [toggleMini, mouseMini]);

	const isResizeable = useMemo(
		() => resizeable && !toggleMini && !isMouseEvent && !isMini && !belowBreakpoint,
		[resizeable, toggleMini, isMouseEvent, isMini, belowBreakpoint],
	);

	const onMouseEnter = () => {
		isMouseEvent && onMini(false);
	};
	const onMouseLeave = () => {
		isMouseEvent && onMini(true);
	};

	const node = useRef(null);
	const handleMouseDown = React.useCallback(
		(e) => {
			if (!node.current) {
				return;
			}
			if (!e.target.classList.contains('xSidebar-res')) {
				return;
			}

			const start = {
				x: e.clientX,
				w: parseInt(window.getComputedStyle(node.current).width || 0, 10),
			};
			document.body.style.userSelect = 'none';

			const handleMouseMove = (e) => {
				const dx = e.clientX - start.x;
				node.current.style.width = `${start.w + dx}px`;
			};

			const handleMouseUp = (e) => {
				const dx = e.clientX - start.x;
				document.removeEventListener('mousemove', handleMouseMove);
				document.removeEventListener('mouseup', handleMouseUp);
				document.body.style.removeProperty('user-select');
				setWidth(start.w + dx);
			};

			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
		},
		[node],
	);

	const containerStyle = useMemo(
		() => ({
			minWidth: isOpen ? '' : 0,
			width:
				isOpen && isMini
					? miniWidth
					: isOpen && (isResizeable || (!!width && !isMiniToOverlay))
						? width
						: '',
		}),
		[width, miniWidth, isMini, isOpen, isMiniToOverlay, isResizeable],
	);
	const style = useMemo(
		() => ({ width: isOpen && isResizeable ? width : '' }),
		[width, isOpen, isResizeable],
	);

	return (
		<XSidebarContext.Provider value={{ width, isMini, isOpen }}>
			<div
				className={classNames('xSidebar-container', {
					'xLayout-sidebar': !!$layout,
					[`xLayout-sidebar--${type}`]: !!$layout && !!type,
					[`xSidebar--${type}`]: !!type,
					'xSidebar--overlay': isOverlay,
					'xSidebar--close': !isOpen,
					'xSidebar--mini': isMini,
					'xSidebar--mini-overlay': isMiniToOverlay,
				})}
				style={containerStyle}
			>
				<div
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					onMouseDown={handleMouseDown}
					ref={node}
					className={classNames('xSidebar', {
						'xSidebar--toggle': toggleMini,
						[`xSidebar--${type}`]: !!type,
					})}
					style={style}
				>
					<div {...props} className={classNames('xSidebar-content', className)}>
						{children}
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
					{toggleMini && (
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
								onClick={() => onMini(!mini)}
								className="text-2xl py-0"
							/>
						</div>
					)}
					{isResizeable && <div className="xSidebar-res"></div>}
				</div>
			</div>
		</XSidebarContext.Provider>
	);
}

/*
// obj for inline CSS
  const [width, setWidth] = useState({ "--width": "200px" });

  const handleWindowMouseMove = useCallback((event) => {
    // console.log(event.clientX)
    setWidth({ "--width": `${event.clientX}px` });
  }, []);

  function hadnleMouseDown() {
    window.addEventListener("mousemove", handleWindowMouseMove);
  }

  function hadnleMouseUp() {
    window.removeEventListener("mousemove", handleWindowMouseMove);
  }
		*/
