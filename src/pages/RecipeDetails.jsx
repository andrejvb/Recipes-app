import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { fetchDrinkByLookup, fetchMealByLookup } from '../services/fetchAPI';
// import PropTypes from 'prop-types';

function RecipeDetails() {
  const { params: { idMeal, idDrink } } = useRouteMatch();
  console.log(idMeal, idDrink);
  const [recipe, setRecipe] = useState({});
  useEffect(() => {
    let fetched;
    if (idMeal !== undefined) fetched = fetchMealByLookup(idMeal);
    else fetched = fetchDrinkByLookup(idDrink);
    setRecipe(fetched);
  }, [idMeal, idDrink]);

  if (idMeal) {
    return (
      <p>{ recipe.strMeal }</p>
    );
  }
  if (idDrink) {
    return (
      <p>{ recipe.strDrink }</p>
    );
  }
}

RecipeDetails.propTypes = {};

export default RecipeDetails;
