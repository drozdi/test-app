import { useCallback, useMemo, useRef, useState } from 'react';
import { matchesSelectorToParentElements } from '../utils/domFns';

export function useDraggable({
	axis = 'xy',
	disabled = false,
	reverse = false,
	initial = [0, 0],
	min = [0, 0],
	max = [null, null],
	handle = '',
	cancel = '',
	onStart = () => {},
	onMove = () => {},
	onEnd = () => {},
}) {
	const runConstraints = (width, height) => {
		if (!min && !max) {
			return [width, height];
		}
		if (min) {
			width = Math.max(min[0], width);
			height = Math.max(min[1], height);
		}

		if (max) {
			width = Math.min(max[0] || width, width);
			height = Math.min(max[1] || height, height);
		}
		return [width, height];
	};

	const initialPosition = runConstraints(...initial);

	const [position, setPosition] = useState(initialPosition);
	const [endPosition, setEndPosition] = useState(initialPosition);
	const [isDragging, setDragging] = useState(false);
	const dragging = useRef(false);
	const positionRef = useRef(initialPosition);

	const canX = useMemo(() => axis.includes('x'), [axis]);
	const canY = useMemo(() => axis.includes('y'), [axis]);

	const mousePosition = { x: 0, y: 0 };

	const handleMove = useCallback(
		(event) => {
			if (!dragging.current) {
				return;
			}
			const deltaX = canX ? event.clientX - mousePosition.x : 0;
			const deltaY = canY ? event.clientY - mousePosition.y : 0;
			if (!(Math.abs(deltaX) > 0 || Math.abs(deltaY) > 0)) {
				return;
			}

			const newPosition = runConstraints(
				position[0] + reverse ? -deltaX : deltaX,
				position[1] + reverse ? -deltaY : deltaY,
			);

			onMove(event, {
				position: newPosition,
			});

			setPosition(newPosition);
			positionRef.current = newPosition;
		},
		[canX, canY, position, onMove],
	);

	const handleUp = useCallback(
		(event) => {
			document.removeEventListener('pointermove', handleMove);
			document.removeEventListener('pointerup', handleUp);
			onEnd(event, {
				position: positionRef.current,
			});
			dragging.current = false;
			setDragging(false);
			setEndPosition(positionRef.current);
		},
		[handleMove, onEnd],
	);

	const handleDown = useCallback(
		(event) => {
			if (
				disabled ||
				(handle &&
					!matchesSelectorToParentElements(event.target, handle, document)) ||
				(cancel &&
					!matchesSelectorToParentElements(event.target, cancel, document))
			) {
				return;
			}
			event.stopPropagation();
			event.preventDefault();

			if (!canX && !canY) {
				return;
			}

			dragging.current = true;
			setDragging(true);

			mousePosition.x = event.clientX;
			mousePosition.y = event.clientY;

			onStart(event, {
				position,
				deltaX: 0,
				deltaY: 0,
			});

			document.addEventListener('pointermove', handleMove);
			document.addEventListener('pointerup', handleUp);
		},
		[disabled, canX, canY, handleMove, handleUp, onStart, handle, cancel],
	);

	return {
		position,
		setPosition,
		endPosition,
		isDragging,
		events: {
			onPointerDown: handleDown,
		},
	};
}
