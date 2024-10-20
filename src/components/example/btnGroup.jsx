import { useState } from 'react';
import { XBtn, XBtnGroup, XIcon } from '../ui';
export function BtnGroupExample() {
	const [groupProps, setGroupProps] = useState({
		vertical: false,
		multiple: false,
		selected: true,
		color: undefined,
		flat: false,
		dimmed: false,
		outline: false,
		tonal: false,
		plain: false,
		text: false,
		square: false,
		rounded: false,
		round: false,
		disabled: false,
	});
	const onChangeSelect = (prop, value) => {
		setGroupProps((v) => ({ ...v, [prop]: value }));
	};
	const onChangeText = (prop, value) => {
		setGroupProps((v) => ({ ...v, [prop]: value }));
	};
	const onChangeCheckbox = (prop) => {
		setGroupProps((v) => ({ ...v, [prop]: !v[prop] }));
	};
	return (
		<div className="max-w-4xl m-auto py-4">
			<h2 className="text-center text-2xl mb-4 bg-bgmb1">XBtnGroup</h2>
			<div className="p-4">
				<XBtnGroup {...groupProps}>
					<XBtn value={1}>btn1</XBtn>
					<XBtn value={2}>btn2</XBtn>
					<XBtn value={3}>btn3</XBtn>
				</XBtnGroup>
				<br />
				<XBtnGroup {...groupProps}>
					<XBtn value={1}>
						<XIcon>mdi-close</XIcon>
					</XBtn>
					<XBtn value={2}>
						<XIcon>mdi-close</XIcon>
					</XBtn>
					<XBtn value={3}>
						<XIcon>mdi-close</XIcon>
					</XBtn>
				</XBtnGroup>
			</div>
			<hr className="my-2" />
			<div className="grid grid-cols-2 *:col-span-1 *:p-4 *:border *:border-separator">
				<div>
					<h3>XBtnGroup options</h3>
					<label className="block">
						<input
							type="checkbox"
							name="vertical"
							checked={groupProps.vertical}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Vertical</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="selected"
							checked={groupProps.selected}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Selected</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="multiple"
							checked={groupProps.multiple}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Multiple</span>
					</label>
				</div>
				<div>
					<h3>XBtn options</h3>
					<label className="block">
						<span className="ml-3 font-medium text-slate-500">Color</span>
						<select
							className="block bg-slate-700 border border-blue-900 p-2"
							name="color"
							value={groupProps.color}
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
							name="flat"
							checked={groupProps.flat}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Flat</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="dimmed"
							checked={groupProps.dimmed}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Dimmed</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="outline"
							checked={groupProps.outline}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Outline</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="tonal"
							checked={groupProps.tonal}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Tonal</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="plain"
							checked={groupProps.plain}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Plain</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="text"
							checked={groupProps.text}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Text</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="square"
							checked={groupProps.square}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Square</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="rounded"
							checked={groupProps.rounded}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Rounded</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="round"
							checked={groupProps.round}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Round</span>
					</label>
					<label className="block">
						<input
							type="checkbox"
							name="disabled"
							checked={groupProps.disabled}
							onChange={({ target }) => onChangeCheckbox(target.name)}
						/>
						<span className="ml-3 font-medium text-slate-500">Disabled</span>
					</label>
				</div>
			</div>
		</div>
	);
}
