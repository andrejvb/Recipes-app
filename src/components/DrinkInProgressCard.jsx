import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../style/checkboxStyle.css';

export default function DrinkInProgressCard({ fetchReturn/* , typeOfRecipe */ }) {
  const [checkIgredient, setCheckIgredient] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
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

  useEffect(() => {
    const doneIngredients = Object.values(checkIgredient)
      .filter((el) => el === true).length;
    if (doneIngredients === ingredients.length) {
      setIsDisabled(false);
    } else setIsDisabled(true);
  }, [checkIgredient, ingredients.length]);

  function handleToggle(index) {
    return setCheckIgredient({ ...checkIgredient, [index]: !checkIgredient[index] });
  }
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ fetchReturn.strDrinkThumb }
        alt={ `Imagem da bebida ${fetchReturn.strDrink}` }
      />
      <h3 data-testid="recipe-title">{ fetchReturn.strDrink}</h3>
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
      <p data-testid="recipe-category">
        {`${fetchReturn.strAlcoholic} Drink`}

      </p>
      <h4>Ingredients:</h4>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li
            key={ index }
          >
            <label
              htmlFor={ `${index}ingredient-checkbox` }
              data-testid={ `${index}-ingredient-step` }
              className={ checkIgredient[index] ? 'checkbox-style' : null }
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
        { fetchReturn.strInstructions}
      </p>

      <button disabled={ isDisabled } data-testid="finish-recipe-btn">Finalizar</button>
    </div>
  );
}

DrinkInProgressCard.propTypes = {
  fetchReturn: PropTypes.oneOfType([PropTypes.object]).isRequired,
  strAlcoholic: PropTypes.string.isRequired,
  strInstructions: PropTypes.string.isRequired,
  strDrink: PropTypes.string.isRequired,
  strDrinkThumb: PropTypes.string.isRequired, /*
  typeOfRecipe: PropTypes.string.isRequired, */
};
