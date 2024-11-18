import { createContext, useContext } from 'react';

export const XProgressContext = createContext(null);

export function useXProgressContext() {
	return useContext(XProgressContext);
}
