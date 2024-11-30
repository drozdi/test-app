import { XProgressBar } from '../ui';
import { Form, useProps } from './utils';
export function ProgressExample() {
	const progressExample = useProps(
		{
			color: '',
			stripe: false,
			animation: false,
			indeterminate: false,
			reverse: false,
			label: false,
			value: 33,
			buffer: 66,
		},
		'XProgressBar',
	);
	return (
		<div className="max-w-4xl m-auto p-4 relative flex flex-col gap-4">
			<h3>XProgressBar</h3>
			<div className="flex flex-col gap-1">
				<div>
					<XProgressBar value={33} className="h-2" />
				</div>
				<pre className="bg-sky-500/50 text-white p-2 rounded-md select-text">
					{'<XProgressBar value={33} className="h-2" />'}
				</pre>
			</div>
			<div className="flex flex-col gap-1">
				<div>
					<XProgressBar value={33} buffer={66} className="h-2" />
				</div>
				<pre className="bg-sky-500/50 text-white p-2 rounded-md select-text">
					{'<XProgressBar value={33} buffer={66} className="h-2" />'}
				</pre>
			</div>
			<div className="flex flex-col gap-1">
				<div>
					<XProgressBar indeterminate className="h-2" />
				</div>
				<pre className="bg-sky-500/50 text-white p-2 rounded-md select-text">
					{'<XProgressBar indeterminate className="h-2" />'}
				</pre>
			</div>
			<div className="flex flex-col gap-1">
				<div>
					<XProgressBar stripe value={33} className="h-2" />
				</div>
				<pre className="bg-sky-500/50 text-white p-2 rounded-md select-text">
					{'<XProgressBar stripe value={33} className="h-2" />'}
				</pre>
			</div>
			<div className="flex flex-col gap-1">
				<div>
					<XProgressBar stripe animation value={33} className="h-2" />
				</div>
				<pre className="bg-sky-500/50 text-white p-2 rounded-md select-text">
					{'<XProgressBar stripe animation value={33} className="h-2" />'}
				</pre>
			</div>
			<div className="flex flex-col gap-1">
				<div>
					<XProgressBar label value={33} className="h-6" />
				</div>
				<pre className="bg-sky-500/50 text-white p-2 rounded-md select-text">
					{'<XProgressBar label value={33} className="h-6" />'}
				</pre>
			</div>
			<div className="flex flex-col gap-1">
				<div>
					<XProgressBar value={33} className="h-6">
						label
					</XProgressBar>
				</div>
				<pre className="bg-sky-500/50 text-white p-2 rounded-md select-text">
					{'<XProgressBar value={33} className="h-6">label</XProgressBar>'}
				</pre>
			</div>
			<h3>Generate</h3>
			<div className="flex flex-col gap-4">
				<XProgressBar {...progressExample.props} className="h-8"></XProgressBar>
				<div className="grid grid-cols-2 *:col-span-1 *:p-4 *:border *:border-separator">
					<div>
						<pre className="bg-sky-500/50 text-white p-2 rounded-md mt-4 select-text">
							{progressExample.code}
						</pre>
					</div>
					<div>
						{Form(
							{
								color: {
									type: 'select',
									values: [
										'primary',
										'secondary',
										'accent',
										'positive',
										'negative',
										'info',
										'warning',
									],
								},
								stripe: { type: 'checkbox' },
								animation: { type: 'checkbox' },
								indeterminate: { type: 'checkbox' },
								reverse: { type: 'checkbox' },
								label: { type: 'checkbox' },
								value: { type: 'number' },
								buffer: { type: 'number' },
							},
							progressExample,
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
