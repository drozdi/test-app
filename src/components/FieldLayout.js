import PropTypes from 'prop-types';
import React from 'react';
import style from './Game.module.css';

export class FieldLayout extends React.Component {
	static propTypes = {
		field: PropTypes.arrayOf(PropTypes.string),
		setFieldValue: PropTypes.func,
	};
	static defaultProps = {
		field: Array(9).fill(''),
		setFieldValue: () => {},
	};
	render() {
		const { field, setFieldValue } = this.props;
		return (
			<div className={style.board}>
				{field.map((cell, index) => {
					return (
						<button
							key={index}
							className={style.cell}
							onClick={() => setFieldValue(index)}
						>
							{cell}
						</button>
					);
				})}
			</div>
		);
	}
}
