import { useState } from 'react';
import { XIcon, XInput } from '../ui';
export function InputExample() {
	const [inputProps, setInputProps] = useState({
		label: '',
		placeholder: '',
		outline: false,
		field: false,
		square: false,
		underlined: false,
		solo: false,
	});
	const onChangeText = (prop, value) => {
		setInputProps((v) => ({ ...v, [prop]: value }));
	};
	const onChangeCheckbox = (prop) => {
		setInputProps((v) => ({ ...v, [prop]: !v[prop] }));
	};
	return (
		<div className="max-w-4xl m-auto mt-2">
			<hr className="my-4" />
			<div className="x-input x-input--outline x-input--underlined1 x-input--square1 x-input--solo1 x-input--field">
				{true && (
					<div className="x-input-before">
						<XIcon>mdi-close</XIcon>
					</div>
				)}
				<div className="x-input-container">
					{true && (
						<div className="x-input-prepend">
							<XIcon>mdi-close</XIcon>
						</div>
					)}
					<div className="x-input-control">
						<input
							type="text"
							className="x-input-native"
							placeholder="Placeholder"
						/>
						<label className="x-input-label">Labelrtrty</label>
					</div>
					{true && (
						<div className="x-input-append">
							<XIcon>mdi-close</XIcon>
						</div>
					)}
					<div className="x-input-outline">
						<div className="x-input-outline-start"></div>
						<div className="x-input-outline-notch">
							<label className="x-input-label">Labelrtrty</label>
						</div>
						<div className="x-input-outline-end"></div>
					</div>
				</div>
				{true && (
					<div className="x-input-after">
						<XIcon>mdi-close</XIcon>
					</div>
				)}
			</div>
			<hr className="my-3" />
			<table className="table-auto w-full border-collapse border-spacing-0 border border-separator">
				<thead>
					<tr className="*:text-center">
						<td>color</td>
						<td>standart</td>
						<td>field</td>
						<td>outline</td>
						<td>underlined</td>
					</tr>
				</thead>
				<tbody>
					<tr className="*:border *:border-separator *:p-2">
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
							<XInput
								underlined={true}
								label="Label"
								placeholder="Placeholder"
							/>
						</td>
					</tr>
				</tbody>
			</table>
			<hr className="my-2" />
			<div className="grid grid-cols-2 *:col-span-1 *:p-4 *:border *:border-separator">
				<div>
					<XInput {...inputProps} />
				</div>
				<div>
					<label className="block">
						<span className="block font-medium text-slate-500">Label</span>
						<input
							className="bg-slate-700 border border-blue-900 p-2"
							type="text"
							name="label"
							value={inputProps.label}
							onChange={({ target }) =>
								onChangeText(target.name, target.value)
							}
						/>
					</label>
					<label className="block">
						<span className="block font-medium text-slate-500">
							Placeholder
						</span>
						<input
							className="bg-slate-700 border border-blue-900 p-2"
							type="text"
							name="placeholder"
							value={inputProps.placeholder}
							onChange={({ target }) =>
								onChangeText(target.name, target.value)
							}
						/>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="outline"
							checked={inputProps.outline}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Outline</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="field"
							checked={inputProps.field}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Field</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="square"
							checked={inputProps.square}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Square</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="underlined"
							checked={inputProps.underlined}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">
							Underlined
						</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="solo"
							checked={inputProps.solo}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Solo</span>
					</label>
				</div>
			</div>
		</div>
	);
}
