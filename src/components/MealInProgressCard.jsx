import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../style/checkboxStyle.css';

export default function MealInProgressCard({ fetchReturn/* , typeOfRecipe */ }) {
  const [checkIgredient, setCheckIgredient] = useState({});
  const ingredients = Object.entries(fetchReturn)
    .filter((ing) => ing[0].includes('Ingredient'))
    .filter((ing) => ing[1] !== '' && ing[1] !== null);
  const measures = Object.entries(fetchReturn)
    .filter((ing) => ing[0].includes('Measure')).slice(0, ingredients.length);

  useEffect(() => {
    const obj = {};
    for (let i = 0; i < ingredients.length; i += 1) {
      obj[i] = false;
    } setCheckIgredient(obj);
  }, [ingredients.length]);

  function handleToggle(index) {
    return setCheckIgredient({ ...checkIgredient, [index]: !checkIgredient[index] });
  }
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ fetchReturn.strMealThumb }
        alt={ `Imagem do prato ${fetchReturn.strMeal}` }
      />
      <h3 data-testid="recipe-title">{fetchReturn.strMeal}</h3>
      <button
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="Botão de compartilhar" />
      </button>

      <button
        data-testid="favorite-btn"
      >
        <img src={ blackHeartIcon } alt="Botão de favoritar" />
      </button>
      <p data-testid="recipe-category">{fetchReturn.strCategory}</p>
      <h4>Ingredients:</h4>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li
            key={ index }
          >
            <label
              className={ checkIgredient[index] ? 'checkbox-style' : null }
              htmlFor={ `${index}ingredient-checkbox` }
              data-testid={ `${index}-ingredient-step` }

            >
              {`${measures[index][1] === null ? ''
                : measures[index][1]} ${ingredient[1]}`}
              <input
                id={ `${index}ingredient-checkbox` }
                type="checkbox"
                onChange={ () => handleToggle(index) }

              />

            </label>
          </li>
        ))}
      </ul>

      <p data-testid="instructions">
        {fetchReturn.strInstructions}
      </p>

      <button data-testid="finish-recipe-btn">Finalizar</button>
    </div>
  );
}

MealInProgressCard.propTypes = {
  fetchReturn: PropTypes.oneOfType([PropTypes.object]).isRequired,
  strMeal: PropTypes.string.isRequired,
  strInstructions: PropTypes.string.isRequired,
  strCategory: PropTypes.string.isRequired,
  strMealThumb: PropTypes.string.isRequired, /*
  typeOfRecipe: PropTypes.string.isRequired, */
};
