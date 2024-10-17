import { useMemo, useState } from 'react';
import { isBoolean } from '../../utils/is';
import { XInput } from '../ui';
export function InputExample() {
	const [inputProps, setInputProps] = useState({
		label: '',
		labelColor: '',
		placeholder: '',
		color: '',
		outline: false,
		field: false,
		square: false,
		underlined: false,
		dense: false,
		stackLabel: false,
		disabled: false,
	});
	const [danses, setDanses] = useState({
		default: false,
		primary: false,
		secondary: false,
		accent: false,
		positive: false,
		negative: false,
		info: false,
		warning: false,
	});
	const [disables, setDisables] = useState({
		default: false,
		primary: false,
		secondary: false,
		accent: false,
		positive: false,
		negative: false,
		info: false,
		warning: false,
	});
	//console.log(inputProps);
	const onChangeSelect = (prop, value) => {
		setInputProps((v) => ({ ...v, [prop]: value }));
	};
	const onChangeText = (prop, value) => {
		setInputProps((v) => ({ ...v, [prop]: value }));
	};
	const onChangeCheckbox = (prop) => {
		setInputProps((v) => ({ ...v, [prop]: !v[prop] }));
	};
	const exampleCode = useMemo(() => {
		let str = '<XInput';
		for (let prop in inputProps) {
			if (inputProps[prop]) {
				if (isBoolean(inputProps[prop])) {
					str += `\n ${prop}={${inputProps[prop]}}`;
				} else {
					str += `\n ${prop}="${inputProps[prop]}"`;
				}
			}
		}
		str += ' />';
		return str;
	}, [inputProps]);
	return (
		<div className="max-w-4xl m-auto py-4">
			<h2 className="text-center text-2xl mb-4 bg-bgmb1">XInput</h2>
			<table className="table-auto w-full border-collapse border-spacing-0 border border-separator">
				<thead>
					<tr className="*:text-center">
						<td className="w-32">color</td>
						<td>standart</td>
						<td>field</td>
						<td>outline</td>
						<td>underlined</td>
					</tr>
				</thead>
				<tbody>
					{'default primary secondary accent positive negative info warning'
						.split(/\s+/)
						.map((color) => (
							<tr key={color} className="*:border *:border-separator *:p-2">
								<td>
									{color}
									<label className="block">
										<input
											type="checkbox"
											name={color}
											checked={danses[color]}
											onChange={({ target }) =>
												setDanses((v) => ({
													...v,
													[target.name]: !v[target.name],
												}))
											}
										/>
										<span className="ml-3 font-medium text-slate-500">
											Dense
										</span>
									</label>
									<label className="block">
										<input
											type="checkbox"
											name={color}
											checked={disables[color]}
											onChange={({ target }) =>
												setDisables((v) => ({
													...v,
													[target.name]: !v[target.name],
												}))
											}
										/>
										<span className="ml-3 font-medium text-slate-500">
											Disabled
										</span>
									</label>
								</td>
								<td>
									<XInput
										color={color !== 'default' ? color : ''}
										dense={danses[color]}
										disabled={disables[color]}
										label="Label"
										placeholder="Placeholder"
									/>
								</td>
								<td>
									<XInput
										color={color !== 'default' ? color : ''}
										dense={danses[color]}
										disabled={disables[color]}
										field={true}
										label="Label"
										placeholder="Placeholder"
									/>
								</td>
								<td>
									<XInput
										color={color !== 'default' ? color : ''}
										dense={danses[color]}
										disabled={disables[color]}
										outline={true}
										label="Label"
										placeholder="Placeholder"
									/>
								</td>

								<td>
									<XInput
										color={color !== 'default' ? color : ''}
										dense={danses[color]}
										disabled={disables[color]}
										underlined={true}
										label="Label"
										placeholder="Placeholder"
									/>
								</td>
							</tr>
						))}
				</tbody>
			</table>
			<hr className="my-2" />
			<div className="grid grid-cols-2 *:col-span-1 *:p-4 *:border *:border-separator">
				<div>
					<XInput {...inputProps} className="text-white" />
					<pre className="bg-sky-500/50 text-white p-2 rounded-md mt-4 select-text">
						{exampleCode}
					</pre>
				</div>
				<div>
					<label className="block">
						<span className="ml-3 font-medium text-slate-500">Color</span>
						<select
							className="block bg-slate-700 border border-blue-900 p-2"
							name="color"
							value={inputProps.color}
							onChange={({ target }) =>
								onChangeSelect(target.name, target.value)
							}
						>
							<option value="">default</option>
							{[
								'primary',
								'secondary',
								'accent',
								'positive',
								'negative',
								'info',
								'warning',
							].map((color, index) => (
								<option key={index} value={color}>
									{color}
								</option>
							))}
						</select>
					</label>
					<label className="block">
						<span className="ml-3 font-medium text-slate-500">
							labelColor
						</span>
						<select
							className=" block bg-slate-700 border border-blue-900 p-2"
							name="labelColor"
							value={inputProps.labelColor}
							onChange={({ target }) =>
								onChangeSelect(target.name, target.value)
							}
						>
							<option value="">default</option>
							{[
								'primary',
								'secondary',
								'accent',
								'positive',
								'negative',
								'info',
								'warning',
							].map((color, index) => (
								<option key={index} value={color}>
									{color}
								</option>
							))}
						</select>
					</label>
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
							name="dense"
							checked={inputProps.dense}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Dense</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="stackLabel"
							checked={inputProps.stackLabel}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">
							Stack Label
						</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="disabled"
							checked={inputProps.disabled}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Disabled</span>
					</label>
				</div>
			</div>
		</div>
	);
}
