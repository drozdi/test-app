export * from './btn';
export * from './btnGroup';
export * from './input';

import { BtnExample } from './btn';
import { BtnGroupExample } from './btnGroup';
import { InputExample } from './input';
export default function ({ btn = false, input = false, btnGroup = false }) {
	return (
		<>
			{btnGroup && <BtnGroupExample />}
			{btn && <BtnExample />}
			{input && <InputExample />}
		</>
	);
}
