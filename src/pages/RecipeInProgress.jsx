import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

// import PropTypes from 'prop-types';

export default function RecipeInProgress() {
  const { pathname } = useLocation();
  const [fetchReturn, setFetchReturn] = useState({});
  const [typeOfRecipe, setTypeOfRecipe] = useState('');
  const id = pathname.match(/\d/g).join('');

  useEffect(() => {
    async function searchApi() {
      if (pathname.includes('meals')) {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const response = await data.json();
        setTypeOfRecipe('meals');
        setFetchReturn(response.meals[0]);
      } else {
        const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const response = await data.json();
        setTypeOfRecipe('drinks');
        setFetchReturn(response.drinks[0]);
      }
    } searchApi();
  }, [pathname, id]);

  if (typeOfRecipe === 'meals') {
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

        <p data-testid="instructions">
          {fetchReturn.strInstructions}
        </p>

        <button data-testid="finish-recipe-btn">Finalizar</button>
      </div>
    );
  }
  if (typeOfRecipe === 'drinks') {
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ fetchReturn.strDrinkThumb }
          alt={ `Imagem da bebida ${fetchReturn.strDrink}` }
        />
        <h3 data-testid="recipe-title">{fetchReturn.strDrink}</h3>
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
          {fetchReturn.strCategory === 'Non alcoholic' ? <span>Drink não Alcóolico</span>
            : <span>Drink Alcóolico</span>}

        </p>
        <p data-testid="instructions">
          {fetchReturn.strInstructions}
        </p>

        <button data-testid="finish-recipe-btn">Finalizar</button>
      </div>
    );
  }
}
