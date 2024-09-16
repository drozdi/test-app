import React, { useState } from 'react';

export default function useResizable() {
	const [resizable, setResizable] = useState(false);

	const onResize = React.useCallback(({ target: { width, height } }) => {
		setResizable(true);
	}, []);

	const onResizeEnd = React.useCallback(({ target: { width, height } }) => {
		setResizable(false);
	}, []);

	return { resizable, onResize, onResizeEnd };
}
