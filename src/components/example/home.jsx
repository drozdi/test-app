import { useRef } from 'react';
import { XIcon, XLink } from '../ui';

export function HomeExample() {
	const ref = useRef();
	return (
		<div className="p-8">
			<XLink
				label="label"
				href="#1"
				leftSection={<XIcon>mdi-close</XIcon>}
				disabled
			>
				<XLink label="label" description="description" href="#1" disabled />
				<XLink label="label" description="description" href="#1" disabled />
			</XLink>
		</div>
	);
}
