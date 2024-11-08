import { useMemo, useRef } from 'react';
import { XBtn } from '../ui/btn';
import { XBtnGroup } from '../ui/btnGroup';
import { XMessage } from '../ui/message';
import { XMessages } from '../ui/messages';
import { XToast } from '../ui/toast';
import { Form } from './utils/form';
import { useProps } from './utils/useProps';
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

	const messageExample = useProps(
		{
			underlined: false,
			closable: false,
			color: '',
			position: '',
			outline: false,
			square: false,
		},
		'XMessage',
		'Test 1',
	);
	const messageProps = useMemo(() => messageExample.props, [messageExample.props]);
	const messageCode = useMemo(() => messageExample.code, [messageExample.code]);

	const messagesExample = useProps(
		{
			underlined: false,
			closable: false,
			color: '',
			position: '',
			outline: false,
			square: false,
			life: 9000,
			row: false,
			sticky: false,
		},
		'XMessages',
	);
	const messagesProps = useMemo(() => messagesExample.props, [messagesExample.props]);
	const messagesCode = useMemo(() => messagesExample.code, [messagesExample.code]);

	const toastExample = useProps(
		{
			underlined: false,
			closable: false,
			color: '',
			position: '',
			outline: false,
			square: false,
			life: 9000,
			row: false,
			sticky: false,
		},
		'XToast',
	);
	const toastProps = useMemo(() => toastExample.props, [toastExample.props]);
	const toastCode = useMemo(() => toastExample.code, [toastExample.code]);

	return (
		<>
			<div className="max-w-4xl m-auto p-4 relative">
				<h3>XMessage</h3>
				<div className="flex flex-col gap-4">
					<XMessage {...messageProps}>Test 1</XMessage>
					<div className="grid grid-cols-2 *:col-span-1 *:p-4 *:border *:border-separator">
						<div>
							<pre className="bg-sky-500/50 text-white p-2 rounded-md mt-4 select-text">
								{messageCode}
							</pre>
						</div>
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
								underlined: {
									type: 'select',
									values: ['top', 'bottom', 'left', 'right'],
								},
								icon: { type: 'checkbox', val: 'mdi-map-marker' },
								outline: { type: 'checkbox' },
								square: { type: 'checkbox' },
							},
							messageExample,
						)}
					</div>
				</div>
				<hr className="my-4" />
				<h3>XMessages</h3>
				<XMessages {...messagesProps} ref={mesgs} />
				<br />
				<XBtnGroup>
					<XBtn onClick={onShowMessages}>Show</XBtn>
					<XBtn onClick={onReplaceMessages}>Replace</XBtn>
					<XBtn onClick={onClearMessages}>Clear</XBtn>
				</XBtnGroup>
				<div className="grid grid-cols-2 *:col-span-1 *:p-4 *:border *:border-separator">
					<div>
						<pre className="bg-sky-500/50 text-white p-2 rounded-md mt-4 select-text">
							{messagesCode}
						</pre>
					</div>
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
							underlined: {
								type: 'select',
								values: ['top', 'bottom', 'left', 'right'],
							},
							outline: { type: 'checkbox' },
							square: { type: 'checkbox' },
							row: { type: 'checkbox' },
							sticky: { type: 'checkbox' },
							closable: { type: 'checkbox' },
							sticky: { type: 'checkbox' },
							life: { type: 'number' },
						},
						messagesExample,
					)}
				</div>
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
							{toastCode}
						</pre>
					</div>
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
							position: {
								type: 'select',
								values: [
									'left-top',
									'left-center',
									'left-bottom',
									'center-top',
									'center-center',
									'center-bottom',
									'right-top',
									'right-center',
									'right-bottom',
								],
							},
							life: { type: 'number' },
							underlined: { type: 'checkbox' },
							closable: { type: 'checkbox' },
							outline: { type: 'checkbox' },
							square: { type: 'checkbox' },
						},
						toastExample,
					)}
				</div>
			</div>
		</>
	);
}
