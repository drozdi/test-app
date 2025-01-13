import { useRef } from 'react';
import { XLink } from '../ui';

export function HomeExample() {
	const ref = useRef();
	return (
		<div className="p-8">
			<XLink label="label" active description="description" href="#1" disabled />
			<div className="x-link-childrens">
				<XLink label="label" description="description" href="#1" disabled />
				<XLink label="label" description="description" href="#1" disabled />
			</div>
		</div>
	);
}
