import PropTypes from 'prop-types';
import './Login.css';

function Card({ index, title, thumb }) {
  return (
    <div>
      <div
        data-testid={ `${index}-recipe-card` }
      >
        <h3 data-testid={ `${index}-card-name` }>{ title }</h3>
        <img
          data-testid={ `${index}-card-img` }
          src={ thumb }
          alt={ title }
          className="imagens-drink-e-meals"
        />
      </div>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
};

export default Card;
