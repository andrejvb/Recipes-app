import PropTypes from 'prop-types';

function Card({ index, title, thumb }) {
  return (
    <figure data-testid={ `${index}-recipe-card` }>
      <figcaption data-testid={ `${index}-card-name` }>{ title }</figcaption>
      <img data-testid={ `${index}-card-img` } src={ thumb } alt={ title } />
    </figure>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
};

export default Card;
