import { useContext } from 'react';
import { AppContext } from '../components/app/AppContext';

export const useApp = () => {
	return useContext(AppContext);
};
