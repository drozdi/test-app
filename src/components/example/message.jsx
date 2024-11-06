import { useState } from 'react';
import { XMessage } from '../ui/message';
export function MessageExample() {
	const [mess, setMess] = useState([
		{
			children: 'Test 1',
			id: 1,
			color: 'info',
			outline: true,
			underline: 'left',
			icon: 'mdi-close',
			onClose: onRemove,
		},
		{
			children: 'Test 2',
			id: 2,
			color: 'info',
			outline: true,
			icon: 'mdi-close',
			onClose: onRemove,
		},
		{
			children: 'Test 3',
			id: 3,
			color: 'info',
			outline: true,
			icon: 'mdi-close',
			onClose: onRemove,
		},
	]);
	function onRemove({ id }) {
		const n = mess.filter((item) => item.id !== id);
		setMess(n);
	}
	return (
		<div className="max-w-4xl m-auto py-4 relative">
			<div className="flex flex-col gap-4">
				{mess.map((item) => (
					<XMessage key={item.id} {...item} />
				))}
			</div>
		</div>
	);
}
