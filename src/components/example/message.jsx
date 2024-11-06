import { useEffect, useRef } from 'react';
import { XMessage } from '../ui/message';
import { XMessages } from '../ui/messages';
export function MessageExample() {
	const mess = [
		{
			children: 'Test 1',
			id: 1,
			color: 'info',
			outline: true,
			underline: 'left',
			icon: 'mdi-close',
		},
		{
			children: 'Test 2',
			id: 2,
			color: 'info',
			outline: true,
			icon: 'mdi-close',
		},
		{
			children: 'Test 3',
			id: 3,
			color: 'info',
			outline: true,
			icon: 'mdi-close',
		},
	];

	const mesgs = useRef(null);
	useEffect(() => {
		if (mesgs.current) {
			console.log(mesgs);
			mesgs.current.show([
				{
					children: 'Test 1',
					life: 3000,
					outline: false,
					icon: 'mdi-home',
					sticky: true,
					closable: true,
				},
				{
					children: 'Test 2',
					life: 6000,
					closable: true,
					color: 'warning',
					icon: 'mdi-home',
				},
				{
					children: 'Test 3',
					color: 'negative',
					underlined: 'top',
					outline: false,
					icon: 'mdi-home',
				},
			]);
		}
	}, [mesgs]);

	return (
		<>
			<div className="max-w-4xl m-auto p-4 relative">
				<XMessages
					color="info"
					outline={true}
					sticky={true}
					underlined="left"
					life={9000}
					ref={mesgs}
				/>
				<hr className="my-4"></hr>

				<div className="flex flex-col gap-4">
					{mess.map((item) => (
						<XMessage key={item.id} {...item} />
					))}
				</div>
			</div>
		</>
	);
}
