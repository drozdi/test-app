import { useEffect, useRef } from 'react';
import { XBtn } from '../ui';

export function HomeExample() {
	const ref = useRef();
	useEffect(() => console.log(ref), [ref]);
	return (
		<div className="p-4">
			<XBtn as="a" ref={ref}>
				Test Test
			</XBtn>
		</div>
	);
}
