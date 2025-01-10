import { Fragment, useEffect, useRef } from 'react';
import { XBtn } from '../ui';

export function HomeExample() {
	const ref = useRef();
	useEffect(() => console.log(ref), [ref]);
	return (
		<div className="p-4">
			<XBtn as={Fragment} ref={ref}>
				{(...args) => {
					console.log(args);
					return <span className="p-4">dfjsd</span>;
				}}
			</XBtn>
		</div>
	);
}
