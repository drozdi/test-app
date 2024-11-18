import { XProgressBar } from '../ui';
import { Form, useProps } from './utils';
export function ProgressExample() {
	const progressExample = useProps({}, 'XProgressBar');
	return (
		<div className="max-w-4xl m-auto p-4 relative">
			<h3>XProgressBar</h3>
			<div className="flex flex-col gap-4">
				<XProgressBar {...progressExample.props} className="h-2">
					Test 1
				</XProgressBar>
				<div className="grid grid-cols-2 *:col-span-1 *:p-4 *:border *:border-separator">
					<div>
						<pre className="bg-sky-500/50 text-white p-2 rounded-md mt-4 select-text">
							{progressExample.code}
						</pre>
					</div>
					<div>{Form({}, progressExample)}</div>
				</div>
			</div>
		</div>
	);
}
