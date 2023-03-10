import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../style/checkboxStyle.css';

export default function MealInProgressCard({ fetchReturn, typeOfRecipe }) {
  const [checkIgredient, setCheckIgredient] = useState(() => {
    const save = localStorage.getItem('inProgressRecipes');
    const initialValue = JSON.parse(save);
    return initialValue || {};
  });
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const ingredients = Object.entries(fetchReturn)
    .filter((ing) => ing[0].includes('Ingredient'))
    .filter((ing) => ing[1] !== '' && ing[1] !== null);
  const measures = Object.entries(fetchReturn)
    .filter((ing) => ing[0].includes('Measure')).slice(0, ingredients.length);
  const favoriteLS = localStorage.getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes'))
    : localStorage.setItem('favoriteRecipes', JSON.stringify([]));

  useEffect(() => {
    const obj = {};
    if (checkIgredient === {}) {
      for (let i = 0; i < ingredients.length; i += 1) {
        obj[i] = false;
      } setCheckIgredient(obj);
    } else setCheckIgredient(checkIgredient);
  }, [ingredients.length, checkIgredient]);

  useEffect(() => {
    const doneIngredients = Object.values(checkIgredient)
      .filter((el) => el === true).length;
    if (doneIngredients === ingredients.length) {
      setIsDisabled(false);
    } else setIsDisabled(true);
  }, [checkIgredient, ingredients.length]);

  function handleToggle(index/* , id */) {
    return setCheckIgredient({
      ...checkIgredient,
      [index]: !checkIgredient[index],
    });
  }

  function doneRecipe(obj) {
    const object = [{
      id: obj.idMeal,
      type: typeOfRecipe,
      nationality: obj.strArea,
      category: obj.strCategory,
      alcoholicOrNot: '',
      name: obj.strMeal,
      image: obj.strMealThumb,
      doneDate: new Date(),
      tags: obj.strTags.split(','),
    }];

    const newObj = {
      id: obj.idMeal,
      type: typeOfRecipe,
      nationality: obj.strArea,
      category: obj.strCategory,
      alcoholicOrNot: '',
      name: obj.strMeal,
      image: obj.strMealThumb,
      doneDate: new Date(),
      tags: obj.strTags.split(','),
    };

    const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));

    if (getLocalStorage === null) {
      localStorage.setItem('doneRecipes', JSON.stringify(object));
    } else {
      const newLocalStorage = getLocalStorage.push(newObj);
      localStorage.setItem('doneRecipes', JSON.stringify(getLocalStorage));
      console.log(newLocalStorage);
    }
  }

  function copyAndAlert(id) {
    copy(`http://localhost:3000/${typeOfRecipe}s/${id}`);
    setCopied(true);
    console.log(id);
    const oneAndAHalf = 1500;
    setTimeout(() => {
      setCopied(false);
    }, oneAndAHalf);
  }

  useEffect(() => {
    const check = favoriteLS && favoriteLS
      .some((item) => item.id === fetchReturn.idMeal);
    setFavorited(check);
  }, [favoriteLS, fetchReturn]);

  function addFavoritedToLS() {
    if (favorited === false) {
      const array = [...favoriteLS,
        {
          id: fetchReturn.idMeal,
          type: typeOfRecipe,
          nationality: fetchReturn.strArea,
          category: fetchReturn.strCategory,
          alcoholicOrNot: '',
          name: fetchReturn.strMeal,
          image: fetchReturn.strMealThumb,
        }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(array));
    } else {
      const filtering = favoriteLS.filter((element) => element.id !== fetchReturn.idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filtering));
    }
  }

  function favoriteButton() {
    setFavorited(!favorited);
    addFavoritedToLS();
  }

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ fetchReturn.strMealThumb }
        alt={ `Imagem do prato ${fetchReturn.strMeal}` }
      />
      <h3 data-testid="recipe-title">{fetchReturn.strMeal}</h3>

      {copied ? <span>Link copied!</span> : (
        <button
          data-testid="share-btn"
          onClick={ () => copyAndAlert(fetchReturn.idMeal) }
        >
          <img src={ shareIcon } alt="Botão de compartilhar" />
        </button>)}

      {favorited ? (
        <button
          data-testid="favorite-btn"
          onClick={ favoriteButton }
          src={ blackHeartIcon }
        >
          <img src={ blackHeartIcon } alt="Botão de favoritar" />
        </button>
      ) : (
        <button
          onClick={ favoriteButton }
          data-testid="favorite-btn"
          src={ whiteHeartIcon }
        >
          <img src={ whiteHeartIcon } alt="Botão de favoritar" />
        </button>
      )}
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

      <Link to="/done-recipes">
        <button
          onClick={ () => doneRecipe(fetchReturn) }
          disabled={ isDisabled }
          data-testid="finish-recipe-btn"
        >
          Finalizar

        </button>

      </Link>
    </div>
  );
}

MealInProgressCard.propTypes = {
  fetchReturn: PropTypes.oneOfType([PropTypes.object]).isRequired,
  strMeal: PropTypes.string.isRequired,
  strInstructions: PropTypes.string.isRequired,
  strCategory: PropTypes.string.isRequired,
  strMealThumb: PropTypes.string.isRequired,
  typeOfRecipe: PropTypes.string.isRequired,
};
