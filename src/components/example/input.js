import { XInput } from '../ui';
export function InputExample() {
	return (
		<div className="max-w-5xl m-auto mt-2">
			<table className="table-auto w-full border-collapse border-spacing-0 border border-separator">
				<thead>
					<tr className="*:text-center">
						<td>color</td>
						<td>standart</td>
						<td>field</td>
						<td>outline</td>
						<td>flat</td>
					</tr>
				</thead>
				<tbody>
					<tr className="*:border *:border-slate-500 *:p-2">
						<td>default</td>
						<td>
							<XInput label="Label" placeholder="Placeholder" />
						</td>
						<td>
							<XInput
								field={true}
								label="Label"
								placeholder="Placeholder"
							/>
						</td>
						<td>
							<XInput
								outline={true}
								label="Label"
								placeholder="Placeholder"
							/>
						</td>

						<td>
							<XInput label="Label" placeholder="Placeholder" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
