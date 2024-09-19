import { useState } from 'react';

export default function useResizable({
	axis = 'xy',
	disabled = false,
  initial = [0, 0],
  min = [0, 0],
  max = [null, null],
	step = 10,
	onResizeStart,
  onResizeEnd,
}) {
	const initialPosition = [Math.min(Math.max(initial[0], min[0]), max[0]), Math.min(Math.max(initial[1], min[1]), max[1])];

	const [position, setPosition] = useState(initialPosition);
	const [resizable, setResizable] = useState(false);

	
	return {
		position,
		resizable
	}
}
