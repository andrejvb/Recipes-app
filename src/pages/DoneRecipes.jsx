import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const MOCK_DATA = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

function DoneRecipes() {
  const [recipes, setRecipes] = useState([]);

  console.log(recipes);
  useEffect(() => {
    const data = localStorage.getItem('doneRecipes');
    if (!data) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    localStorage.setItem('doneRecipes', JSON.stringify(MOCK_DATA)); // depois retirar
    const parsedData = JSON.parse(data);

    setRecipes(parsedData);
  }, []);

  return (

    <div>
      DoneRecipes

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

      {recipes.map((recipe, index) => (

        <div
          key={ recipe.id }
        >

          <img
            src={ recipe.image }
            alt="Receita"
            data-testid={ `${index}-horizontal-image` }
            width="150px"
          />

          <h3 data-testid={ `${index}-horizontal-top-text` }>
            { `${recipe.nationality} -
            ${recipe.category}`}
          </h3>
          <h3 data-testid={ `${index}-horizontal-name` }>
            {' '}
            {recipe.name}
          </h3>

          <h3 data-testid={ `${index}-horizontal-done-date` }>
            {recipe.doneDate}
          </h3>

          <button>
            Compartilhar
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="Share icon"
            />
          </button>
          <span
            data-testid={ `${index}-${recipe
              .tags[0]}-horizontal-tag` }
          >
            {recipe.tags[0]}

          </span>
          <span
            data-testid={ `${index}-${recipe
              .tags[1]}-horizontal-tag` }
          >
            {recipe.tags[1]}

          </span>
        </div>

      ))}

    </div>

  );
}
// DoneRecipes.propTypes = {};

export default DoneRecipes;
