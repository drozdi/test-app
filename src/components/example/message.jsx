import { useRef } from 'react';
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
				<XToast ref={toast} position="left-top" />
				<XBtnGroup>
					<XBtn onClick={onShowToast}>Show</XBtn>
					<XBtn onClick={onReplaceToast}>Replace</XBtn>
					<XBtn onClick={onClearToast}>Clear</XBtn>
				</XBtnGroup>
			</div>
		</>
	);
}
