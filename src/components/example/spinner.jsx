import {
	XSpinner,
	XSpinnerClock,
	XSpinnerComment,
	XSpinnerCube,
	XSpinnerGrid,
	XSpinnerHourglass,
	XSpinnerIos,
	XSpinnerOval,
	XSpinnerPie,
	XSpinnerRadio,
} from '../ui';
import { Form, useProps } from './utils';
export function SpinnerExample() {
	const spinExample = useProps(
		{
			size: '1em',
			thickness: 5,
			color: '',
		},
		'XSpinner',
	);
	const spinOtherExample = useProps(
		{
			size: '3em',
			color: '',
		},
		'XSpinner',
	);
	return (
		<div className="max-w-4xl m-auto py-4 relative">
			<h2 className="text-center text-2xl mb-4 bg-bgmb1">XSpinner</h2>
			<hr className="my-2" />
			<div className="grid grid-cols-2 *:col-span-1 *:p-4 *:border *:border-separator">
				<div>
					<XSpinner {...spinExample.props} />
					<pre className="bg-sky-500/50 text-white p-2 rounded-md mt-4 select-text">
						{spinExample.code}
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
							size: { type: 'text' },
							thickness: { type: 'number' },
						},
						spinExample,
					)}
				</div>
			</div>
			<hr className="my-2" />
			<div className="grid grid-cols-2 *:col-span-1 *:p-4 *:border *:border-separator">
				<div className="flex gap-3">
					<XSpinnerPie {...spinOtherExample.props} />
					<XSpinnerIos {...spinOtherExample.props} />
					<XSpinnerCube {...spinOtherExample.props} />
					<XSpinnerGrid {...spinOtherExample.props} />
					<XSpinnerOval {...spinOtherExample.props} />
					<XSpinnerRadio {...spinOtherExample.props} />
					<XSpinnerClock {...spinOtherExample.props} />
					<XSpinnerComment {...spinOtherExample.props} />
					<XSpinnerHourglass {...spinOtherExample.props} />
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
							size: { type: 'text' },
						},
						spinOtherExample,
					)}
				</div>
			</div>
		</div>
	);
}
