import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const MOCK_DATA_FAVORITE = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

function FavoriteRecipes() {
  const [recipesFav, setRecipesFav] = useState([]);
  console.log(recipesFav);

  useEffect(() => {
    const data = localStorage.getItem('favoriteRecipes');
    if (!data) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(MOCK_DATA_FAVORITE));
    const parseData = JSON.parse(data);
    setRecipesFav(parseData);
  }, []);

  return (
    <>
      <Header />
      <Card />
      <div>FavoriteRecipes</div>
      <button
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      { recipesFav.map((e, index) => (
        <div
          key={ e.id }
        >
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ e.image }
            alt="teste"
            width="150px"
          />
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            { `${e.nationality} - ${e.category} - ${e.alcoholicOrNot}` }
          </p>
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            { e.name }
          </p>
          <input
            type="image"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="Share Icon"
          />
          <input
            type="image"
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            alt="Black Heart Icon"
          />
        </div>
      )) }
    </>
  );
}

FavoriteRecipes.propTypes = {};

export default FavoriteRecipes;
