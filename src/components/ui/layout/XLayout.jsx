import React, { useMemo, useState } from 'react';
import { useResizeObserver } from '../../../hooks/useResizeObserver';
import { useSlots } from '../../../hooks/useSlots';
import { XBtn } from '../btn/XBtn';
import './XLayout.scss';

import classNames from 'classnames';
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
			//mini: !belowBreakpoint && $layout.left.mini,
			//miniToOverlay: overlay || belowBreakpoint,
			//miniMouse: true,
			//miniToggle: !belowBreakpoint,

			resizeable: true,

			onMini: (mini) => $update('left', 'mini', mini),
			//onToggle: (open) => $update('left', 'open', open),
		});
	};
	const right = () => {
		return wrapSlot(slot('right', null), XSidebar, {
			type: 'right',
			open: !belowBreakpoint || $layout.right.open,
			overlay: overlay && belowBreakpoint,
			breakpoint: breakpoint,
			mini: !belowBreakpoint && $layout.right.mini,
			//miniToOverlay: overlay || belowBreakpoint,
			//miniMouse: true,
			miniToggle: !belowBreakpoint,

			resizeable: true,

			onMini: (mini) => $update('right', 'mini', mini),
			//onToggle: (open) => $update('right', 'open', open),
		});
	};
	const footer = () => {
		return <XFooter>{slot('footer', null)}</XFooter>;
	};
	const header = () => {
		return (
			<XHeader>
				{{
					prepend: (props) => {
						return (
							hasSlot('left') &&
							belowBreakpoint && (
								<XBtn
									color="primary"
									className="float-start self-center"
									icon="mdi-dock-left"
									size="sm"
									square={true}
									onClick={() =>
										$update('left', 'open', !$layout.left.open)
									}
								/>
							)
						);
					},
					append: (props) => {
						return (
							hasSlot('right') &&
							belowBreakpoint && (
								<XBtn
									color="primary"
									icon="mdi-dock-right"
									className="float-end self-center"
									size="sm"
									square={true}
									onClick={() =>
										$update('right', 'open', !$layout.right.open)
									}
								/>
							)
						);
					},
					default: (props) => {
						return slot('header', null);
					},
				}}
			</XHeader>
		);
	};
	const def = () => {
		return <XMain>{slot('', null)}</XMain>;
	};
	const isHl = useMemo(
		() => $layout.rows[0][0] === 'l' || !hasSlot('header'),
		[$layout.rows, hasSlot],
	);
	const isHr = useMemo(
		() => $layout.rows[0][2] === 'r' || !hasSlot('header'),
		[$layout.rows, hasSlot],
	);
	const isFl = useMemo(
		() => $layout.rows[2][0] === 'l' || !hasSlot('footer'),
		[$layout.rows, hasSlot],
	);
	const isFr = useMemo(
		() => $layout.rows[2][2] === 'r' || !hasSlot('footer'),
		[$layout.rows, hasSlot],
	);

	const classes = useMemo(
		() => ({
			'xLayout--hl': isHl,
			'xLayout--hr': isHr,
			'xLayout--fl': isFl,
			'xLayout--fr': isFr,
		}),
		[isHl, isHr, isFl, isFr],
	);

	let layout = (
		<div className={classNames('xLayout', classes)} ref={ref}>
			{hasSlot('left') && left()}
			{hasSlot('right') && right()}
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
	return (
		<main className="xLayout-main">
			<div className="xLayout-content">{children}</div>
		</main>
	);
}
