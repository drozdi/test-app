import PropTypes from 'prop-types';
import { XIcon } from './XIcon';
export function XChevron(props) {
	return <XIcon {...props}>mdi-chevron-right</XIcon>;

	return (
		<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className}>
			<path
				fillRule="evenodd"
				d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
				clipRule="evenodd"
			/>
		</svg>
	);
}

XChevron.propTypes = {
	className: PropTypes.string,
};
