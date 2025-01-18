import { useEffect, useState } from 'react';
import './styles.css';
import { XTabsProvider } from './XTabsContext';
export function XTabs({ children, value }) {
	const [currentTab, setCurrentTab] = useState(value);
	const context = {
		value: currentTab,
		setActiveTab: (value) => setCurrentTab(value),
		isActive: (value) => value === currentTab,
		keepMounted: false,
	};
	useEffect(() => setCurrentTab(value), [value]);
	useEffect(() => console.log(currentTab), [currentTab]);
	return (
		<div className="x-tabs">
			<XTabsProvider value={context}>{children}</XTabsProvider>
		</div>
	);
}
