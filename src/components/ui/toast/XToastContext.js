import { createContext, useContext } from 'react';

export const XToastContext = createContext(null);

export function useXToastContext() {
	return useContext(XToastContext);
}
