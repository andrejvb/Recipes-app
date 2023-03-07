import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Details from '../components/Details';
import { fetchDrinkByLookup, fetchMealByLookup } from '../services/fetchAPI';

const MAX_INGREDIENTS = 20;
const EXCLUSIVE_MEAL_KEYS = new Map([
  ['strThumb', 'strMealThumb'],
  ['str', 'strMeal'],
  ['video', 'strYoutube'],
]);
const EXCLUSIVE_DRINK_KEYS = new Map([
  ['strThumb', 'strDrinkThumb'],
  ['str', 'strDrink'],
  ['video', 'strVideo'],
  ['strCategory', 'strAlcoholic'],
]);

function extractRecipe(recipe, exclusiveKeys) {
  const { strCategory, strInstructions } = recipe;
  const recipeExclusives = {};
  exclusiveKeys.forEach((value, key) => { recipeExclusives[key] = recipe[value]; });
  const regexToCaptureYTId = /^https:\/\/www.youtube.com\/watch\?v=(.+)$/;
  const matches = recipeExclusives.video?.match(regexToCaptureYTId);
  let youtubeId = '';
  if (matches) {
    const [, fuckyoulint] = matches;
    youtubeId = fuckyoulint;
  }
  delete recipeExclusives.video;
  const ingredients = [];
  for (let i = 1; i <= MAX_INGREDIENTS; i += 1) {
    const ingredientIndex = `strIngredient${i}`;
    const measureIndex = `strMeasure${i}`;
    if (recipe[ingredientIndex] && recipe[measureIndex]) {
      ingredients.push(`${recipe[measureIndex]} of ${recipe[ingredientIndex]}`);
    } else if (recipe[ingredientIndex]) ingredients.push(recipe[ingredientIndex]);
    else break;
  }
  return ({
    strCategory,
    ...recipeExclusives,
    youtubeId,
    strInstructions,
    ingredients,
  });
}

function RecipeDetails() {
  const { idMeal, idDrink } = useParams();
  const [recipe, setRecipe] = useState({});

  const fetchCallback = useCallback(async () => {
    let maped;
    if (idMeal !== undefined) {
      maped = extractRecipe(await fetchMealByLookup(idMeal), EXCLUSIVE_MEAL_KEYS);
    } else {
      maped = extractRecipe(await fetchDrinkByLookup(idDrink), EXCLUSIVE_DRINK_KEYS);
    }
    setRecipe(maped);
  }, [idMeal, idDrink]);

  useEffect(() => {
    fetchCallback();
  }, [fetchCallback]);

  return (
    'str' in recipe && <Details { ...recipe } />
  );
}

export default RecipeDetails;
