import classNames from 'classnames';
import './style.scss';
export function XProgress({ className }) {
	const attr = useMemo(() => ({
		role: 'progressbar',
		'aria-valuemin': 0,
		'aria-valuemax': 1,
		/*'aria-valuenow': props.indeterminate === true
			? void 0
			: props.value*/
	}));
	return <div {...attr} className={classNames('x-progress', className)}></div>;
}
