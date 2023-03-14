import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';

function Recomendation({ recomendations }) {
  return (
    <Carousel as="ol">
      {recomendations.map(({
        title1,
        title2,
        image1,
        image2,
        index1,
        index2,
      }, idx) => (
        <Carousel.Item as="li" key={ idx }>
          <div className="row">
            <figure className="col-md-3" data-testid={ `${index1}-recommendation-card` }>
              <img src={ image1 } alt={ title1 } style={ { width: '210px' } } />
            </figure>
            <figure className="col-md-3" data-testid={ `${index2}-recommendation-card` }>
              <img src={ image2 } alt={ title2 } style={ { width: '210px' } } />
            </figure>
          </div>
          <Carousel.Caption>
            <div className="row">
              <h3 data-testid={ `${index1}-recommendation-title` } className="col-md">
                { title1 }
              </h3>
              <h3 data-testid={ `${index2}-recommendation-title` } className="col-md">
                { title2 }
              </h3>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

Recomendation.propTypes = {
  recomendations: PropTypes.arrayOf(PropTypes.shape({
    title1: PropTypes.string.isRequired,
    title2: PropTypes.string.isRequired,
    image1: PropTypes.string.isRequired,
    image2: PropTypes.string.isRequired,
    index1: PropTypes.number.isRequired,
    index2: PropTypes.number.isRequired,
  })).isRequired,
};

export default Recomendation;
