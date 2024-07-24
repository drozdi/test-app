import PropTypes from 'prop-types';

function InformationLayout({ message = '' }) {
    return <h2>{message}</h2>;
}

InformationLayout.propTypes = {
    message: PropTypes.string
};

export default InformationLayout;