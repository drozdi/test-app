import { useLayoutEffect, useState } from 'react';
import { AppContext } from './AppContext';
export const AppProvider = ({ children, config = {} }) => {
	let [smActive, setSmActive] = useState(false);
	const smKey = config.smKey;
	const smType = config.smType;
	useLayoutEffect(() => {}, []);
	let sm = {
		set(key, val) {
			return val;
		},
		get(key, val, type = null) {
			return val;
		},
		remove(key) {},
	};
	return (
		<AppContext.Provider
			value={{
				$sm: {
					active(active = true) {
						smActive = active;
					},
					set(key, val) {
						smActive && sm.set(key, val);
						return val;
					},
					get(key, val, type = null) {
						return sm.get(key, val, type);
					},
					save(fn = () => {}) {
						let args = [].slice.call(arguments, 1);
						let old = smActive;
						smActive = true;
						fn(...args);
						smActive = old;
					},
					noSave(fn = () => {}) {
						let args = [].slice.call(arguments, 1);
						let old = smActive;
						smActive = false;
						fn(...args);
						smActive = old;
					},
				},
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
