import { useLayoutEffect } from 'react';
import { AppContext } from './AppContext';
import { XStorage } from './hooks/useXStorage';
export const AppProvider = ({ children, config = {} }) => {
	const smKey = config.smKey;
	const smType = config.smType;
	XStorage('', '');
	useLayoutEffect(() => {}, []);
	return <AppContext.Provider value={config}>{children}</AppContext.Provider>;
};
