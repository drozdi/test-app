import { useMemo, useRef, useState } from 'react';
import { isBoolean } from '../../utils/is';
import { XBtn } from '../ui/btn';
import { XBtnGroup } from '../ui/btnGroup';
import { XMessage } from '../ui/message';
import { XMessages } from '../ui/messages';
import { XToast } from '../ui/toast';
export function MessageExample() {
	const mesgs = useRef(null);
	const mess = [
		{
			children: 'Test 1',
			life: 3000,
			outline: false,
			icon: 'mdi-home',
			sticky: true,
			closable: true,
		},
		{
			children: 'Test 2',
			life: 6000,
			closable: true,
			color: 'warning',
			icon: 'mdi-home',
		},
		{
			children: 'Test 3',
			color: 'negative',
			underlined: 'top',
			outline: false,
			icon: 'mdi-home',
		},
	];
	const onShowMessages = () => {
		mesgs.current.show([...mess]);
	};
	const onReplaceMessages = () => {
		mesgs.current.replace([...mess]);
	};
	const onClearMessages = () => {
		mesgs.current.clear();
	};

	const toast = useRef(null);
	const onShowToast = () => {
		toast.current.show([...mess]);
	};
	const onReplaceToast = () => {
		toast.current.replace([...mess]);
	};
	const onClearToast = () => {
		toast.current.clear();
	};

	const [toastProps, setToastProps] = useState({
		underlined: false,
		life: 3000,
		closable: false,
		color: '',
		position: '',
		outline: false,
	});
	const onChangeSelectToast = (prop, value) => {
		setToastProps((v) => ({ ...v, [prop]: value }));
	};
	const onChangeTextToast = (prop, value) => {
		setToastProps((v) => ({ ...v, [prop]: value }));
	};
	const onChangeCheckboxToast = (prop) => {
		setToastProps((v) => ({ ...v, [prop]: !v[prop] }));
	};
	const exampleCodeToast = useMemo(() => {
		let str = '<XToast';
		for (let prop in toastProps) {
			if (toastProps[prop]) {
				if (isBoolean(toastProps[prop])) {
					str += `\n ${prop}={${toastProps[prop]}}`;
				} else {
					str += `\n ${prop}="${toastProps[prop]}"`;
				}
			}
		}
		str += ' />';
		return str;
	}, [toastProps]);

	return (
		<>
			<div className="max-w-4xl m-auto p-4 relative">
				<h3>XMessage</h3>
				<div className="flex flex-col gap-4">
					{mess.map((item, index) => (
						<XMessage key={index} {...item} />
					))}
				</div>
				<hr className="my-4" />
				<h3>XMessages</h3>
				<XMessages
					color="info"
					outline={true}
					underlined="left"
					life={9000}
					ref={mesgs}
				/>
				<br />
				<XBtnGroup>
					<XBtn onClick={onShowMessages}>Show</XBtn>
					<XBtn onClick={onReplaceMessages}>Replace</XBtn>
					<XBtn onClick={onClearMessages}>Clear</XBtn>
				</XBtnGroup>
				<hr className="my-4" />
				<h3>XToast</h3>
				<XBtnGroup>
					<XBtn onClick={onShowToast}>Show</XBtn>
					<XBtn onClick={onReplaceToast}>Replace</XBtn>
					<XBtn onClick={onClearToast}>Clear</XBtn>
				</XBtnGroup>
				<div className="grid grid-cols-2 *:col-span-1 *:p-4 *:border *:border-separator">
					<div>
						<XToast {...toastProps} ref={toast} />
						<pre className="bg-sky-500/50 text-white p-2 rounded-md mt-4 select-text">
							{exampleCodeToast}
						</pre>
					</div>
					<div>
						<label className="block">
							<span className="ml-3 font-medium text-slate-500">Color</span>
							<select
								className="block bg-slate-700 border border-blue-900 p-2"
								name="color"
								value={toastProps.color}
								onChange={({ target }) =>
									onChangeSelectToast(target.name, target.value)
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
							<span className="ml-3 font-medium text-slate-500">Color</span>
							<select
								className="block bg-slate-700 border border-blue-900 p-2"
								name="position"
								value={toastProps.position}
								onChange={({ target }) =>
									onChangeSelectToast(target.name, target.value)
								}
							>
								<option value="">default</option>
								{[
									'left-top',
									'left-center',
									'left-bottom',
									'center-top',
									'center-center',
									'center-bottom',
									'right-top',
									'right-center',
									'right-bottom',
								].map((position, index) => (
									<option key={index} value={position}>
										{position}
									</option>
								))}
							</select>
						</label>
						<label className="block">
							<span className="block font-medium text-slate-500">Life</span>
							<input
								className="bg-slate-700 border border-blue-900 p-2"
								type="number"
								name="life"
								value={toastProps.life}
								onChange={({ target }) =>
									onChangeTextToast(target.name, target.value)
								}
							/>
						</label>
						<label className="block">
							<input
								type="checkbox"
								name="underlined"
								checked={toastProps.underlined}
								onChange={({ target }) =>
									onChangeCheckboxToast(target.name)
								}
							/>
							<span className="ml-3 font-medium text-slate-500">
								Underlined
							</span>
						</label>
						<label className="block">
							<input
								type="checkbox"
								name="closable"
								checked={toastProps.closable}
								onChange={({ target }) =>
									onChangeCheckboxToast(target.name)
								}
							/>
							<span className="ml-3 font-medium text-slate-500">
								Closable
							</span>
						</label>
						<label className="block">
							<input
								type="checkbox"
								name="outline"
								checked={toastProps.outline}
								onChange={({ target }) =>
									onChangeCheckboxToast(target.name)
								}
							/>
							<span className="ml-3 font-medium text-slate-500">
								Outline
							</span>
						</label>
					</div>
				</div>
			</div>
		</>
	);
}
