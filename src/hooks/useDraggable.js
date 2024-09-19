import { useCallback, useMemo, useState } from 'react';

export function useDraggable({
	axis = 'xy',
	disabled = false,
  initial = [0, 0],
  min = [0, 0],
  max = [null, null],
	onStart = () => {},
	onMove = () => {},
	onEnd = () => {}
}) {
	const runConstraints = (width, height) => {
    if (!min && !max) {
			return [width, height]
		};
    if (min) {
      width = Math.max(min[0], width);
      height = Math.max(min[1], height);
    }
    if (max) {
      width = Math.min(max[0], width);
      height = Math.min(max[1], height);
    }
    return [width, height];
  }

	const initialPosition = runConstraints(...initial);

	const [position, setPosition] = useState(initialPosition);
	const [isDragging, setDragging] = useState(false);

	const canX = useMemo(() => axis.includes('x'), [axis]);
	const canY = useMemo(() => axis.includes('y'), [axis]);

	const startPosition = { 
		x: 0, 
		y: 0 
	};

	const handleMove = useCallback((event) => {
		const dx = canX? event.clientX-startPosition.x: 0;
		const dy = canY? event.clientY-startPosition.y: 0;
		if (!(Math.abs(dx) > 0 || Math.abs(dy) > 0)) {
			return;
		}

		const newPosition = [position[0] + dx, position[1] + dy]

		onMove(event, {
			start: startPosition,
			position: newPosition,
			deltaX: dx, 
			deltaY: dy
		})

		setPosition(newPosition)
	}, [canX, canY, position]);

	const handleUp = useCallback((event) => {
		document.removeEventListener('pointermove', handleMove);
		document.removeEventListener('pointerup', handleUp);
		onEnd(event, {
			start: startPosition,
			position: position
		})
		setDragging(false)
	}, []);

	const handleDown = useCallback((event) => {
		if (disabled) {
			return;
		}
		event.stopPropagation();
    event.preventDefault();

		if (!canX && !canY) {
			return;
		}

		setDragging(true);

		startPosition.x = event.clientX;
		startPosition.y = event.clientY;
		
		onStart(event, {
			start: startPosition,
			position,
			deltaX: 0, 
			deltaY: 0
		})

		document.addEventListener('pointermove', handleMove);
		document.addEventListener('pointerup', handleUp);
	}, [disabled, canX, canY]);

	

	
	

	return {
		position,
		setPosition,
		isDragging,
		events: {
			'onPointerDown': handleDown
		}
	}
}
