import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Details from '../components/Details';
import {
  fetchDrinkByLookup,
  fetchDrinksBySearch,
  fetchMealByLookup,
  fetchMealsBySearch,
} from '../services/fetchAPI';

const MAX_RECOMENDATIONS = 6;
const MAX_INGREDIENTS = 20;
const MAX_VISIBLE_RECOMENDATIONS = 2;
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

function extractRecipe(recipe, exclusiveKeys, rawRecomendations, recomendationKeys) {
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
  const recomendations = [];
  const mapedRecomendations = rawRecomendations.slice(0, MAX_RECOMENDATIONS)
    .map(({
      [recomendationKeys.get('str')]: title,
      [recomendationKeys.get('strThumb')]: image,
    }, index) => ({ title, image, index }));

  for (let i = 0; i < MAX_RECOMENDATIONS; i += MAX_VISIBLE_RECOMENDATIONS) {
    recomendations.push({
      title1: mapedRecomendations[i].title,
      title2: mapedRecomendations[i + 1].title,
      image1: mapedRecomendations[i].image,
      image2: mapedRecomendations[i + 1].image,
      index1: mapedRecomendations[i].index,
      index2: mapedRecomendations[i + 1].index,
    });
  }
  return ({
    strCategory,
    ...recipeExclusives,
    youtubeId,
    strInstructions,
    ingredients,
    recomendations,
  });
}

function RecipeDetails() {
  const { idMeal, idDrink } = useParams();
  const [recipe, setRecipe] = useState({});

  const fetchCallback = useCallback(async () => {
    let maped;
    if (idMeal !== undefined) {
      const [meal, recomendations] = await Promise.all([
        fetchMealByLookup(idMeal),
        fetchDrinksBySearch('s=', ''),
      ]);
      console.log(recomendations);
      maped = extractRecipe(
        meal,
        EXCLUSIVE_MEAL_KEYS,
        recomendations,
        EXCLUSIVE_DRINK_KEYS,
      );
    } else {
      const [drink, recomendations] = await Promise.all([
        fetchDrinkByLookup(idDrink),
        fetchMealsBySearch('s=', ''),
      ]);
      maped = extractRecipe(
        drink,
        EXCLUSIVE_DRINK_KEYS,
        recomendations,
        EXCLUSIVE_MEAL_KEYS,
      );
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
