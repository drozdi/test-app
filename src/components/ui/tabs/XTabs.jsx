import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { useId } from '../../hooks/useId';
import './styles.css';
import { XTabsProvider } from './XTabsContext';

function getPreviousIndex(current, elements, loop) {
	for (let i = current - 1; i >= 0; i -= 1) {
		if (!elements[i].disabled) {
			return i;
		}
	}

	if (loop) {
		for (let i = elements.length - 1; i > -1; i -= 1) {
			if (!elements[i].disabled) {
				return i;
			}
		}
	}

	return current;
}
function getNextIndex(current, elements, loop) {
	for (let i = current + 1; i < elements.length; i += 1) {
		if (!elements[i].disabled) {
			return i;
		}
	}

	if (loop) {
		for (let i = 0; i < elements.length; i += 1) {
			if (!elements[i].disabled) {
				return i;
			}
		}
	}

	return current;
}

export function XTabs({
	className,
	children,
	value,
	id,
	keepMounted,
	vertical,
	pills,
	onChange,
	...props
}) {
	const [currentTab, setCurrentTab] = useState(value);
	const uid = useId(id);

	const onKeyDown = (event) => {
		const { target } = event;
		const elements = Array.from(
			target.closest('[role="tablist"]').querySelectorAll('[role="tab"]') || [],
		);
		const current = elements.findIndex((el) => target === el);
		const nextIndex = getNextIndex(current, elements, true);
		const previousIndex = getPreviousIndex(current, elements, true);

		switch (event.code) {
			case 'ArrowLeft':
			case 'ArrowUp':
				event.preventDefault();
				event.stopPropagation();
				elements[previousIndex].focus();
				elements[previousIndex].click();
				break;
			case 'ArrowRight':
			case 'ArrowDown':
				event.preventDefault();
				event.stopPropagation();
				elements[nextIndex].focus();
				elements[nextIndex].click();
				break;
		}
	};

	const context = useMemo(() => {
		const values = [];
		const appendValue = (value) => {
			if (!values.includes(value)) {
				values.push(value);
			}
		};
		return {
			value: currentTab,
			values,
			keepMounted,
			vertical,
			onKeyDown,
			getTabId: (value) => {
				appendValue(value);
				return `${uid}-tab-${value}`;
			},
			getPanelId: (value) => {
				appendValue(value);
				return `${uid}-panel-${value}`;
			},
			setActiveTab: (value) => setCurrentTab(value),
			isActive: (value) => value === currentTab,
		};
	}, [currentTab, keepMounted, vertical]);
	useEffect(() => onChange?.(currentTab), [currentTab]);
	useEffect(() => setCurrentTab(value), [value]);
	useEffect(() => {
		if (!currentTab) {
			setCurrentTab(context.values[0]);
		}
	}, []);
	return (
		<div
			id={uid}
			{...props}
			className={classNames(
				'x-tabs',
				{
					'x-tabs--vertical': vertical,
					'x-tabs--pills': pills,
				},
				className,
			)}
		>
			<XTabsProvider value={context}>{children}</XTabsProvider>
		</div>
	);
}
