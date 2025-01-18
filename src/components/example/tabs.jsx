import { XTabs, XTabsList, XTabsPanel, XTabsTab } from '../ui';
export function TabsExample() {
	return (
		<div className="max-w-4xl m-auto py-4 relative">
			<h2 className="text-center text-2xl mb-4 bg-bgmb1">XTabs</h2>
			<XTabs>
				<XTabsList grow>
					<XTabsTab
						value="item-1"
						leftSection="mdi-home"
						rightSection="mdi-close"
					>
						Item 1
					</XTabsTab>
					<XTabsTab value="item-2">Item 2</XTabsTab>
					<XTabsTab value="item-3">Item 3</XTabsTab>
				</XTabsList>
				<XTabsPanel value="item-1">Tabs 1</XTabsPanel>
				<XTabsPanel value="item-2">Tabs 2</XTabsPanel>
				<XTabsPanel value="item-3">Tabs 3</XTabsPanel>
			</XTabs>
		</div>
	);
}
