import PropTypes from 'prop-types';
import React from 'react';

export class InformationLayout extends React.Component {
	static propTypes = {
		message: PropTypes.string,
	};
	static defaultProps = {
		message: '',
	};
	render() {
		return <h2>{this.props.message}</h2>;
	}
}
