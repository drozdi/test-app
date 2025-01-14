import { useRef, useState } from 'react';
import { XCollapse, XLink } from '../ui';

export function HomeExample() {
	const ref = useRef();
	const [active, setActive] = useState(false);
	return (
		<div className="p-8">
			<button onClick={() => setActive((v) => !v)}>tttt</button>
			<hr />
			<XLink
				label="label"
				active={active}
				description="description"
				href="#1"
				disabled
			/>
			<XCollapse active={active}>
				<div className="x-link-childrens">
					<XLink label="label" description="description" href="#1" disabled />
					<XLink label="label" description="description" href="#1" disabled />
				</div>
			</XCollapse>
		</div>
	);
}
