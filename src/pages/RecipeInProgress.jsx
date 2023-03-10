import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DrinkInProgressCard from '../components/DrinkInProgressCard';
import MealInProgressCard from '../components/MealInProgressCard';

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
        setTypeOfRecipe('meal');
        setFetchReturn(response.meals[0]);
      } else {
        const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const response = await data.json();
        setTypeOfRecipe('drink');
        setFetchReturn(response.drinks[0]);
      }
    } searchApi();
  }, [pathname, id]);

  if (typeOfRecipe === 'meal') {
    return (<MealInProgressCard
      fetchReturn={ fetchReturn }
      typeOfRecipe={ typeOfRecipe }
    />);
  }
  if (typeOfRecipe === 'drink') {
    return (<DrinkInProgressCard
      fetchReturn={ fetchReturn }
      typeOfRecipe={ typeOfRecipe }
    />);
  }
}
