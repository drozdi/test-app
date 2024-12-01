import {
	XItem,
	XItemLabel,
	XItemSection,
	XList,
	XProgressBar,
	XProgressCircle,
} from '../ui';
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
			<XList dense>
				{[
					{
						elem: <XProgressBar value={33} className="h-2" />,
						code: '<XProgressBar value={33} className="h-2" />',
					},
					{
						elem: <XProgressBar value={33} buffer={66} className="h-2" />,
						code: '<XProgressBar value={33} buffer={66} className="h-2" />',
					},
					{
						elem: <XProgressBar indeterminate className="h-2" />,
						code: '<XProgressBar indeterminate className="h-2" />',
					},
					{
						elem: <XProgressBar stripe value={33} className="h-2" />,
						code: '<XProgressBar stripe value={33} className="h-2" />',
					},
					{
						elem: (
							<XProgressBar stripe animation value={33} className="h-2" />
						),
						code: '<XProgressBar stripe animation value={33} className="h-2" />',
					},
					{
						elem: <XProgressBar label value={33} className="h-6" />,
						code: '<XProgressBar label value={33} className="h-6" />',
					},
					{
						elem: (
							<XProgressBar value={33} className="h-6">
								label
							</XProgressBar>
						),
						code: '<XProgressBar value={33} className="h-6">label</XProgressBar>',
					},
				].map((v, i) => (
					<XItem key={i} className="gap-2" vertical>
						<XItemSection>{v.elem}</XItemSection>
						<XItemSection className="bg-sky-500/50 text-white pl-2 rounded-md">
							<XItemLabel>{v.code}</XItemLabel>
						</XItemSection>
					</XItem>
				))}
			</XList>

			<XList dense>
				{[
					{
						elem: <XProgressCircle size={128} thickness={5} value={33} />,
						code: '<XProgressCircle size={128} thickness={5} value={33} />',
					},
					{
						elem: (
							<XProgressCircle
								size={128}
								thickness={5}
								value={33}
								buffer={66}
							/>
						),
						code: '<XProgressCircle size={128} thickness={5} value={33} buffer={66} />',
					},
					{
						elem: <XProgressCircle size={128} thickness={5} indeterminate />,
						code: '<XProgressCircle size={128} thickness={5} indeterminate />',
					},
					{
						elem: (
							<XProgressCircle size={128} thickness={5} stripe value={33} />
						),
						code: '<XProgressCircle size={128} thickness={5} stripe value={33} />',
					},
					{
						elem: (
							<XProgressCircle
								size={128}
								thickness={5}
								stripe
								animation
								value={33}
							/>
						),
						code: '<XProgressCircle size={128} thickness={5} stripe animation value={33} />',
					},
					{
						elem: (
							<XProgressCircle size={128} thickness={5} label value={33} />
						),
						code: '<XProgressCircle size={128} thickness={5} label value={33} />',
					},
					{
						elem: (
							<XProgressCircle size={128} thickness={5} value={33}>
								label
							</XProgressCircle>
						),
						code: '<XProgressCircle size={128} thickness={5} value={33}>label</XProgressCircle>',
					},
				].map((v, i) => (
					<XItem key={i}>
						<XItemSection side>{v.elem}</XItemSection>
						<XItemSection className="bg-sky-500/50 text-white pl-2 rounded-md">
							<XItemLabel>{v.code}</XItemLabel>
						</XItemSection>
					</XItem>
				))}
			</XList>

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
