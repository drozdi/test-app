import React, { useMemo, useState } from 'react';
import { useResizeObserver } from '../../../hooks/useResizeObserver';
import { useSlots } from '../../../hooks/useSlots';
import './XLayout.scss';

import { XBtn } from '../btn/XBtn';

import { XFooter } from '../footer/XFooter';
import { XHeader } from '../header/XHeader';
import { XSidebar } from '../sidebar/XSidebar';
import { XLayoutContext } from './XLayoutContext';

export function XLayout({
	children,
	container = false,
	view = 'hhh lpr fff',
	breakpoint = 600,
	overlay = false,
}) {
	const [$layout, set$layout] = useState({
		isContainer: container,
		rows: view.split(' ').map((row) => {
			return row.split('');
		}),
		header: { size: 0, offset: 0, space: false },
		footer: { size: 0, offset: 0, space: false },
		left: { size: 300, offset: 0, space: false, open: true, mini: true },
		right: { size: 300, offset: 0, space: false, open: true, mini: true },
		width: 0,
	});
	const $update = (part, prop, val) => {
		if ($layout[part][prop] !== val) {
			set$layout((v) => ({
				...v,
				[part]: {
					...v[part],
					[prop]: val,
				},
			}));
		}
	};
	const ref = useResizeObserver((target, entry) => {
		if ($layout.width !== target.offsetWidth) {
			set$layout((v) => ({ ...v, width: target.offsetWidth }));
		}
	});
	const belowBreakpoint = useMemo(
		() => (breakpoint && $layout.width < breakpoint) || false,
		[$layout, breakpoint],
	);

	const [slot, hasSlot, wrapSlot] = useSlots(children);

	const left = () => {
		return wrapSlot(slot('left', null), XSidebar, {
			type: 'left',
			open: !belowBreakpoint || $layout.left.open,
			overlay: overlay && belowBreakpoint,
			breakpoint: breakpoint,
			mini: !belowBreakpoint && $layout.left.mini,
			miniToOverlay: overlay || belowBreakpoint,
			miniMouse: true,
			miniToggle: !belowBreakpoint,

			//resizeable: true,

			onMini: (mini) => $update('left', 'mini', mini),
			onToggle: (open) => $update('left', 'open', open),
		});
	};
	const right = () => {
		return wrapSlot(slot('right', null), XSidebar, {
			type: 'right',
			open: !belowBreakpoint || $layout.right.open,
			mini: !belowBreakpoint && $layout.right.mini,
			toggle: !belowBreakpoint,
			breakpoint: breakpoint,
			overlay: overlay && belowBreakpoint,
			miniToOverlay: overlay || belowBreakpoint,
			onResize: (width) => $update('right', 'size', width),
			onMini: (mini) => $update('right', 'mini', mini),
			onToggle: (open) => $update('right', 'open', open),
		});
	};
	const footer = () => {
		return <XFooter>{slot('footer', null)}</XFooter>;
	};
	const header = () => {
		return (
			<XHeader>
				{hasSlot('left') && belowBreakpoint && (
					<XBtn
						color="primary"
						onClick={() => $update('left', 'open', !$layout.left.open)}
					>
						left
					</XBtn>
				)}
				{hasSlot('right') && belowBreakpoint && (
					<XBtn
						color="primary"
						onClick={() => $update('right', 'open', !$layout.right.open)}
					>
						right
					</XBtn>
				)}
				{slot('header', null)}
			</XHeader>
		);
	};
	const def = () => {
		return <XMain>{slot('', null)}</XMain>;
	};

	let layout = (
		<div className="xLayout" ref={ref}>
			{hasSlot('left') && left()}
			{/*hasSlot('right') && right()*/}
			{hasSlot('header') && header()}
			{hasSlot('footer') && footer()}
			{def()}
		</div>
	);
	if (container) {
		layout = <div className="xLayout-container">{layout}</div>;
	}

	return (
		<XLayoutContext.Provider value={{ $layout, $update }}>
			{layout}
		</XLayoutContext.Provider>
	);
}

export function XMain({ children }) {
	//const { $layout, $update } = useContext(XLayoutContext)
	return <main className="x-layout__main">{children}</main>;
}
