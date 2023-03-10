import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../style/checkboxStyle.css';

export default function DrinkInProgressCard({ fetchReturn, typeOfRecipe }) {
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

  /* useEffect(() => {
    const onlyTrue = Object.entries(checkIgredient).filter((el) => el[1] === true);
    const array = onlyTrue.map((el) => ingredients[el[0]][1]);
    return console.log(array);
  }, [checkIgredient, ingredients]); */

  /* useEffect(() => {
    const { idDrink } = fetchReturn;
    const onlyTrue = Object.entries(checkIgredient).filter((el) => el[1] === true);
    const array = onlyTrue.map((el) => ingredients[el[0]][1]);
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const obj = {
      drinks: {
        [idDrink]: [],
      },
      meals: {},
    };

    if (getLocalStorage === null) {
      return localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }
    const getLocalStorage2 = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const obj2 = {
      drinks: {
        ...getLocalStorage2.drinks,
        [idDrink]: array,
      },
      meals: {},
    };
    return localStorage.setItem('inProgressRecipes', JSON.stringify(obj2));
  }, [fetchReturn, checkIgredient, ingredients]); */

  function doneRecipe(obj) {
    const object = [{
      id: obj.idDrink,
      type: typeOfRecipe,
      nationality: '',
      category: obj.strCategory,
      alcoholicOrNot: obj.strAlcoholic,
      name: obj.strDrink,
      image: obj.strDrinkThumb,
      doneDate: new Date(),
      tags: [],
    }];

    const newObj = {
      id: obj.idDrink,
      type: typeOfRecipe,
      nationality: '',
      category: obj.strCategory,
      alcoholicOrNot: obj.strAlcoholic,
      name: obj.strDrink,
      image: obj.strDrinkThumb,
      doneDate: new Date(),
      tags: [],
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
      .some((item) => item.id === fetchReturn.idDrink);
    setFavorited(check);
  }, [favoriteLS, fetchReturn]);

  function addFavoritedToLS() {
    if (favorited === false) {
      const array = [...favoriteLS,
        {
          id: fetchReturn.idDrink,
          type: typeOfRecipe,
          nationality: '',
          category: fetchReturn.strCategory,
          alcoholicOrNot: fetchReturn.strAlcoholic,
          name: fetchReturn.strDrink,
          image: fetchReturn.strDrinkThumb,
        }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(array));
    } else {
      const filtering = favoriteLS
        .filter((element) => element.id !== fetchReturn.idDrink);
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
        src={ fetchReturn.strDrinkThumb }
        alt={ `Imagem da bebida ${fetchReturn.strDrink}` }
      />
      <h3 data-testid="recipe-title">{ fetchReturn.strDrink}</h3>

      {copied ? <span>Link copied!</span> : (
        <button
          data-testid="share-btn"
          onClick={ () => copyAndAlert(fetchReturn.idDrink) }
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

DrinkInProgressCard.propTypes = {
  fetchReturn: PropTypes.oneOfType([PropTypes.object]).isRequired,
  strAlcoholic: PropTypes.string.isRequired,
  strInstructions: PropTypes.string.isRequired,
  strDrink: PropTypes.string.isRequired,
  strDrinkThumb: PropTypes.string.isRequired,
  typeOfRecipe: PropTypes.string.isRequired,
};
