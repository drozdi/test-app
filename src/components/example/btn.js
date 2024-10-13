import { useMemo, useState } from 'react';
import { XBtn } from '../ui';

export function BtnExample() {
	const [btnProps, setBtnProps] = useState({
		label: '',
		color: '',
		flat: false,
		outline: false,
		tonal: false,
		text: false,
		plain: false,
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

	//console.log(btnProps);
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
		return '';
		/*let str = '<XBtn';
		for (let prop in btnProps) {
			if (btnProps[prop]) {
				if (isBoolean(btnProps[prop])) {
					str += `\n ${prop}={${btnProps[prop]}}`;
				} else {
					str += `\n ${prop}="${btnProps[prop]}"`;
				}
			}
		}
		str += '>Example</XBtn>';
		return str;*/
	}, [btnProps]);
	return (
		<div className="max-w-4xl m-auto py-4">
			<h2 className="text-center text-2xl mb-4 bg-bgmb1">XBtn</h2>
			<table className="table-auto w-full border-collapse border-spacing-0 border border-separator">
				<thead>
					<tr className="*:text-center">
						<td>color</td>
						<td>standart</td>
						<td>flat</td>
						<td>outline</td>
						<td>tonal</td>
						<td>text</td>
						<td>plain</td>
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
										text={true}
									>
										Text
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
							</tr>
						))}
				</tbody>
			</table>
			<hr className="my-2" />
			<div className="grid grid-cols-2 *:col-span-1 *:p-4 *:border *:border-separator">
				<div>
					<XBtn {...btnProps}></XBtn>
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
							value="mdi-icon"
							checked={btnProps.icon}
							onChange={({ target }) =>
								onChangeSelect(
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
							name="flat"
							checked={btnProps.flat}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Flat</span>
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
							name="text"
							checked={btnProps.text}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Text</span>
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
				</div>
			</div>
		</div>
	);
}
