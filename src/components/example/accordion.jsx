import { XAccordion, XAccordionTab } from '../ui';
import { Form, useProps } from './utils';

export function AccordionExample() {
	const accordionExample = useProps(
		{
			border: false,
			field: false,
			square: false,
			separated: false,
		},
		'XAccordion',
		`
	<XAccordionTab header="Header I" value="acc-1">
		<p>sdghksdjf w ehrfwelfwe fklwef weer ter yeryer uy rt yuru ty uitur 54e t5 7y</p>
	</XAccordionTab>
	<XAccordionTab header="Header II" value="acc-2" disabled>
		<p>sdghksdjf w ehrfwelfwe fklwef weer ter yeryer uy rt yuru ty uitur 54e t5 7y</p>
	</XAccordionTab>
	<XAccordionTab header="Header III" value="acc-3">
		<p>sdghksdjf w ehrfwelfwe fklwef weer ter yeryer uy rt yuru ty uitur 54e t5 7y</p>
	</XAccordionTab>
`,
	);
	return (
		<div className="max-w-4xl m-auto py-4 relative">
			<h2 className="text-center text-2xl mb-4 bg-bgmb1">XAccordion</h2>
			<div className="p-4">
				<XAccordion {...accordionExample.props} value="acc-1">
					<XAccordionTab header="Header I" value="acc-1">
						<p>
							sdghksdjf w ehrfwelfwe fklwef weer ter yeryer uy rt yuru ty
							uitur 54e t5 7y
						</p>
					</XAccordionTab>
					<XAccordionTab header="Header II" value="acc-2" disabled>
						<p>
							sdghksdjf w ehrfwelfwe fklwef weer ter yeryer uy rt yuru ty
							uitur 54e t5 7y
						</p>
					</XAccordionTab>
					<XAccordionTab header="Header III" value="acc-3">
						<p>
							sdghksdjf w ehrfwelfwe fklwef weer ter yeryer uy rt yuru ty
							uitur 54e t5 7y
						</p>
					</XAccordionTab>
				</XAccordion>
				<div className="grid grid-cols-2 *:col-span-1 *:p-4 *:border *:border-separator">
					<div>
						<pre className="bg-sky-500/50 text-white p-2 rounded-md mt-4 select-text">
							{accordionExample.code}
						</pre>
					</div>
					<div>
						{Form(
							{
								border: { type: 'checkbox' },
								field: { type: 'checkbox' },
								square: { type: 'checkbox' },
								separated: { type: 'checkbox' },
							},
							accordionExample,
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
