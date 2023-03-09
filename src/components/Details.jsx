import React from 'react';
import PropTypes from 'prop-types';
import Recomendation from './Recomendation';

function Details({
  str,
  strThumb,
  strCategory,
  strInstructions,
  youtubeId,
  ingredients,
  recomendations,
}) {
  return (
    <section>
      <h1 data-testid="recipe-title">{ str }</h1>
      <img data-testid="recipe-photo" src={ strThumb } alt="recipe" />
      <h3 data-testid="recipe-category">{ strCategory }</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={ index }>
            <span
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { ingredient }
            </span>
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ strInstructions }</p>
      {youtubeId && <iframe
        data-testid="video"
        width="853"
        height="480"
        src={ `https://www.youtube.com/embed/${youtubeId}` }
        allow="accelerometer; autoplay; clipboard-write;
        encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />}
      <Recomendation recomendations={ recomendations } />
    </section>
  );
}

Details.propTypes = {
  str: PropTypes.string.isRequired,
  strThumb: PropTypes.string.isRequired,
  strCategory: PropTypes.string.isRequired,
  strInstructions: PropTypes.string.isRequired,
  youtubeId: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  recomendations: PropTypes.arrayOf(PropTypes.shape({
    title1: PropTypes.string.isRequired,
    title2: PropTypes.string.isRequired,
    image1: PropTypes.string.isRequired,
    image2: PropTypes.string.isRequired,
    index1: PropTypes.number.isRequired,
    index2: PropTypes.number.isRequired,
  })).isRequired,
};

export default Details;
