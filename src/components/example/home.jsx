import { Fragment, useRef } from 'react';
import { XBtn } from '../ui';

export function HomeExample() {
	const ref = useRef();
	return (
		<div className="p-8">
			<span
				className="relative inline-flex items-center justify-center select-none cursor-pointer rounded px-6 py-2 text-base text-center font-normal uppercase box-border transition duration-200 ease-in-out focus:outline-none focus-visible:outline-none border border-current bg-bgmb3 disabled:!pointer-events-none disabled:!shadow-none disabled:!opacity-50 disabled:!cursor-not-allowed
				shadow hover:shadow-xl focus:shadow-lg active:shadow-md !shadow-black/50
			
			
			ring-1 ring-current ring-offset-2 ring-offset-background"
			>
				ring
			</span>

			<XBtn className="mt-2" as={Fragment} ref={ref}>
				{(state) => <span className="p-4">dfjsd</span>}
			</XBtn>
		</div>
	);
}
