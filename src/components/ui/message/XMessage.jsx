import { forwardRef, useRef } from 'react';

export const XMessage = forwardRef(function XMessage(
	{ id, className, text, icon, type, content, children },
	ref,
) {
	const elementRef = useRef(null);
	return <div ref={elementRef}>XMessage</div>;
});
