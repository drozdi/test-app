import PropTypes from 'prop-types';
import InformationLayout from './InformationLayout'

function Information({ isDraw, isGameEnded, currentPlayer = 'X' }) {
    let message = `Ходит: ${currentPlayer}`;
    if (isDraw) {
        message = 'Ничья';
    } else if (isGameEnded) {
        message = `Выиграл: ${currentPlayer}`;
    }
    return <InformationLayout message={message} />;
}

Information.propTypes = {
    isDraw: PropTypes.bool,
    isGameEnded: PropTypes.bool,
    currentPlayer: PropTypes.string
};

export default Information;