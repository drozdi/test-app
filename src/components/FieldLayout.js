import PropTypes from 'prop-types';
import style from './Game.module.css';

function FieldLayout({ field, setFieldValue }) {
    return (<div className={style.board}>
        {field.map((cell, index) => {
            return (<button key={index} className={style.cell} onClick={() => setFieldValue(index)}>
                {cell}
            </button>);
        })}
    </div>);
}
FieldLayout.propTypes = {
    field: PropTypes.arrayOf(PropTypes.string),
    setFieldValue: PropTypes.func
};

export default FieldLayout;