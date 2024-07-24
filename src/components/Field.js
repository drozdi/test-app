
import PropTypes from 'prop-types';
import FieldLayout from './FieldLayout';

function Field({ field, setFieldValue }) {
    return <FieldLayout field={field} setFieldValue={setFieldValue} />;
}
FieldLayout.propTypes = {
    field: PropTypes.arrayOf(PropTypes.string),
    setFieldValue: PropTypes.func
};

export default Field;