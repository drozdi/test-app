import { Fragment, useRef } from 'react';
import { XBtn } from '../ui';

export function HomeExample() {
	const ref = useRef();
	return (
		<div className="p-4">
			<XBtn className="mt-2" as={Fragment} ref={ref}>
				{(state) => <span className="p-4">dfjsd</span>}
			</XBtn>
		</div>
	);
}
