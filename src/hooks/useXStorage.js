import { useEffect, useState } from 'react';
import settingManager from '../core/setting-manager';

export function XStorage(type, key) {
	let smActive = false;
	let sm = {
		set(key, val) {
			return val;
		},
		get(key, val, type = null) {
			return val;
		},
		remove(key) {},
	};
	sm = settingManager[type].sub(key);
	return {
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
		save(fn = async () => {}) {
			let args = [].slice.call(arguments, 1);
			let old = smActive;
			smActive = true;
			fn(...args);
			smActive = old;
		},
		noSave(fn = async () => {}) {
			let args = [].slice.call(arguments, 1);
			let old = smActive;
			smActive = false;
			fn(...args);
			smActive = old;
		},
	};
}

export function useXStorage(type, key) {
	let smActive = false;
	let sm = {
		set(key, val) {
			return val;
		},
		get(key, val, type = null) {
			return val;
		},
		remove(key) {},
	};

	if (settingManager[type] && key) {
		sm = settingManager[type].sub(key);
	} else if (key === 'core') {
		sm = settingManager['APP'].sub(key);
	}
	useEffect(() => {
		smActive = true;
		return () => sm.remove();
	}, []);

	return {
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
		join(name, initial = null) {
			const [state, setState] = useState(initial);
			useEffect(() => {
				this.set(name, state);
			}, [state]);
			return [state, setState];
		},
	};
}
