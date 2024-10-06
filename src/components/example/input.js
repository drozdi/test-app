import { XIcon, XInput } from '../ui';
export function InputExample() {
	return (
		<div className="max-w-5xl m-auto mt-2">
			<hr className="my-2" />
			<div className="p-5">
				<div className="x-input">
					<div className="x-input-before">
						<XIcon>mdi-close</XIcon>
					</div>
					<div className="x-input-container">
						<div className="x-input-prepend">
							<XIcon>mdi-close</XIcon>
						</div>
						<div className="x-input-control">
							<input
								type="text"
								className="x-input-native"
								placeholder="Placeholder"
							/>
							<label className="x-input-label">Label</label>
						</div>
						<div className="x-input-append">
							<XIcon>mdi-close</XIcon>
						</div>
						<div className="x-input-outline">
							<div className="x-input-outline-start"></div>
							<div
								className="x-input-outline-notch"
								style={{ width: 30 }}
							></div>
							<div className="x-input-outline-end"></div>
						</div>
					</div>
					<div className="x-input-after">
						<XIcon>mdi-close</XIcon>
					</div>
				</div>
			</div>
			<hr className="my-2" />

			<hr className="my-2" />
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
