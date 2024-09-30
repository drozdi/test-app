import { useEffect, useState, createContext } from 'react';
import settingManager from '../core/setting-manager';

const XStorageContext = createContext({
	get (key, def, type = null) {
		return def;
	},
	set (key, val) {
		return val;
	}
});
export function XStorageProvider({children, type, key}) {
	return (
		<XStorageContext.Provider value={XStorage(type, key)}>
			{children}
		</XStorageContext.Provider>
	);
}

export function XStorage(type, key) {
	let smActive = false;
	let sm = {
		set(key, val) {
			return val;
		},
		get(key, def, type = null) {
			return def;
		},
		remove(key) {},
	};
	if (settingManager[type] && key) {
		sm = settingManager[type].sub(key);
	} else if (key === 'core') {
		sm = settingManager['APP'].sub(key);
	}
	return {
		active: {
			get () {
				return smActive;
			},
			set (val) {
				smActive = val	
			}
		},
		set(key, val) {
			if (smActive) {
				sm.set(key, val);
			}
			return val;
		},
		get(key, val, type = null) {
			return sm.get(key, val, type);
		},
		save(fn = () => {}, ...args) {
			let old = smActive;
			smActive = true;
			fn(...args);
			smActive = old;
		},
		noSave(fn = () => {}, ...args) {
			let old = smActive;
			smActive = false;
			fn(...args);
			smActive = old;
		},
		use (name, initial = null) {
			const [state, setState] = useState(initial);
			useEffect(() => {
				this.set(name, state);
			}, [state]);
		}
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
