import { useCallback, useRef, useState } from 'react';

export const useDragExpander = ({ min, max }) => {
	const [dragState, setDragState] = useState(0);
	const initialPos = useRef(0);
	const timer = useRef();

	const update = useCallback(
		(xPos) =>
			setDragState((state) => ({
				...state,
				delta: initialPos.current - xPos + state.lastDelta,
			})),
		[],
	);

	const onDragMouseDown = (e) => {
		if (e.button != 0) return; // only allow left-mouse clicks
		e.preventDefault();
		initialPos.current = e.screenX; // re-set initial position
		timer.current = setTimeout(dragStart, 0, e); // only allow dragging after N duration mouse down
		window.addEventListener('mouseup', unbind);
	};

	const dragStart = (e) => {
		setDragState((state) => ({
			...state,
			lastDelta: state.delta || 0,
			isDragging: true,
		}));
		window.addEventListener('mousemove', onDragMove);
	};

	const onDragMove = useCallback((e) => update(e.screenX), []);

	const unbind = () => {
		clearTimeout(timer.current);
		window.removeEventListener('mousemove', onDragMove);
		setDragState((state) => ({ ...state, isDragging: false }));
	};

	const limitDragRange = useCallback(
		(delta) => Math.min(max, Math.max(min, delta || 0)),
		[],
	);

	return { onDragMouseDown, onDragMove, dragState, limitDragRange };
};
