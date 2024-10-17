import { useMemo, useState } from 'react';
import { isBoolean } from '../../utils/is';
import { XBtn } from '../ui';

export function BtnExample() {
	const [label, setLabel] = useState('Example');
	const [btnProps, setBtnProps] = useState({
		color: '',
		dimmed: false,
		flat: false,
		outline: false,
		tonal: false,
		text: false,
		plain: false,
		block: false,
		square: false,
		round: false,
		rounded: false,
		disabled: false,
		icon: false,
		iconRight: false,
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
	const onChangeSelect = (prop, value) => {
		setBtnProps((v) => ({ ...v, [prop]: value }));
	};
	const onChangeText = (prop, value) => {
		setBtnProps((v) => ({ ...v, [prop]: value }));
	};
	const onChangeCheckbox = (prop) => {
		setBtnProps((v) => ({ ...v, [prop]: !v[prop] }));
	};
	const exampleCode = useMemo(() => {
		let str = '<XBtn';
		for (let prop in btnProps) {
			if (btnProps[prop]) {
				if (isBoolean(btnProps[prop])) {
					str += `\n ${prop}={${btnProps[prop]}}`;
				} else {
					str += `\n ${prop}="${btnProps[prop]}"`;
				}
			}
		}
		str += '>' + label + '</XBtn>';
		return str;
	}, [label, btnProps]);

	return (
		<div className="max-w-4xl m-auto py-4">
			<h2 className="text-center text-2xl mb-4 bg-bgmb1">XBtn</h2>
			{/*<table className="table-auto w-full border-collapse border-spacing-0 border border-separator">
				<thead>
					<tr className="*:text-center">
						<td>color</td>
						<td>standart</td>
						<td>flat</td>
						<td>outline</td>
						<td>tonal</td>
						<td>plain</td>
						<td>text</td>
					</tr>
				</thead>
				<tbody>
					{'default primary secondary accent positive negative info warning'
						.split(/\s+/)
						.map((color) => (
							<tr
								key={color}
								className="*:border *:border-separator *:p-2 *:text-center"
							>
								<td>
									{color}
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
									<XBtn disabled={disables[color]} color={color}>
										Default
									</XBtn>
								</td>
								<td>
									<XBtn
										disabled={disables[color]}
										color={color}
										flat={true}
									>
										Flat
									</XBtn>
								</td>
								<td>
									<XBtn
										disabled={disables[color]}
										color={color}
										outline={true}
									>
										Outline
									</XBtn>
								</td>
								<td>
									<XBtn
										disabled={disables[color]}
										color={color}
										tonal={true}
									>
										Tonal
									</XBtn>
								</td>
								<td>
									<XBtn
										disabled={disables[color]}
										color={color}
										plain={true}
									>
										Plain
									</XBtn>
								</td>
								<td>
									<XBtn
										disabled={disables[color]}
										color={color}
										text={true}
									>
										Text
									</XBtn>
								</td>
							</tr>
						))}
				</tbody>
			</table>*/}
			<hr className="my-2" />
			<div className="grid grid-cols-2 *:col-span-1 *:p-4 *:border *:border-separator">
				<div>
					<XBtn {...btnProps}>{label}</XBtn>
					<pre className="bg-sky-500/50 text-white p-2 rounded-md mt-4 select-text">
						{exampleCode}
					</pre>
				</div>
				<div>
					<label className="block">
						<span className="block font-medium text-slate-500">label</span>
						<input
							className="bg-slate-700 border border-blue-900 p-2"
							type="text"
							value={label}
							onChange={({ target }) => setLabel(target.value)}
						/>
					</label>
					<label className="block">
						<span className="ml-3 font-medium text-slate-500">Color</span>
						<select
							className="block bg-slate-700 border border-blue-900 p-2"
							name="color"
							value={btnProps.color}
							defaultValue={btnProps.color}
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
						<input
							type="checkbox"
							name="icon"
							value="mdi-map-marker"
							checked={btnProps.icon}
							onChange={({ target }) =>
								onChangeText(
									target.name,
									!btnProps.icon ? target.value : false,
								)
							}
						/>
						<span className="ml-3 font-medium text-slate-500">Icon</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="iconRight"
							value="mdi-close"
							checked={btnProps.iconRight}
							onChange={({ target }) =>
								onChangeText(
									target.name,
									!btnProps.iconRight ? target.value : false,
								)
							}
						/>
						<span className="ml-3 font-medium text-slate-500">IconRight</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="flat"
							checked={btnProps.flat}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Flat</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="dimmed"
							checked={btnProps.dimmed}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Dimmed</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="outline"
							checked={btnProps.outline}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Outline</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="tonal"
							checked={btnProps.tonal}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Tonal</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="plain"
							checked={btnProps.plain}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Plain</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="text"
							checked={btnProps.text}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Text</span>
					</label>

					<label className="block">
						<input
							type="checkbox"
							name="block"
							checked={btnProps.block}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Block</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="square"
							checked={btnProps.square}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Square</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="rounded"
							checked={btnProps.rounded}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Rounded</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="round"
							checked={btnProps.round}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Round</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="disabled"
							checked={btnProps.disabled}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Disabled</span>
					</label>
				</div>
			</div>
		</div>
	);
}
