import React, { useContext, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { RecipeContext } from '../context/recipes';
import {
  fetchDrinksByFilter,
  fetchDrinksBySearch,
  fetchMealsByFilter,
  fetchMealsBySearch,
} from '../services/fetchAPI';

const BAD_QUERY = 'Your search must have only 1 (one) character';
const NOT_FOUND = 'Sorry, we haven\'t found any recipes for these filters.';
const EXACT_ALLOWED_LENGTH = 1;
const MAX_RECIPES = 12;

function SearchBar() {
  const { pathname } = useLocation();
  const [recipeId, setRecipeId] = useState(null);
  const { setRecipes } = useContext(RecipeContext);

  function handleFetchResults(idKey, fetched) {
    const isRecipesEmpty = fetched === null;
    if (isRecipesEmpty) return global.alert(NOT_FOUND);
    const isSingleRecipe = fetched.length === EXACT_ALLOWED_LENGTH;
    if (isSingleRecipe) {
      const [recipe] = fetched;
      const { [idKey]: id } = recipe;
      setRecipeId(id);
    } else {
      const fetchedSliced = fetched.slice(0, MAX_RECIPES);
      setRecipes(fetchedSliced);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formDataObject = Object.fromEntries(new FormData(event.target));
    const { search, query } = formDataObject;
    const isFirstLetterFilter = search === 'f=';
    const isNotSingleCharacter = query.length !== EXACT_ALLOWED_LENGTH;
    if (isFirstLetterFilter && isNotSingleCharacter) return global.alert(BAD_QUERY);
    const isIngredientFilter = search === 'i=';
    if (pathname === '/meals') {
      const fetchedMeals = isIngredientFilter
        ? await fetchMealsByFilter(search, query)
        : await fetchMealsBySearch(search, query);
      handleFetchResults('idMeal', fetchedMeals);
    } else {
      const fetchedDrinks = isIngredientFilter
        ? await fetchDrinksByFilter(search, query)
        : await fetchDrinksBySearch(search, query);
      handleFetchResults('idDrink', fetchedDrinks);
    }
  }

  if (recipeId) return <Redirect to={ `${pathname}/${recipeId}` } />;

  return (

    <form onSubmit={ handleSubmit }>
      <input
        type="text"
        name="query"
        placeholder="Query"
        data-testid="search-input"
      />
      <label htmlFor="ingredient">
        Ingredient:
        <input
          type="radio"
          name="search"
          id="ingredient"
          value="i="
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name">
        Name:
        <input
          type="radio"
          name="search"
          id="name"
          value="s="
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first">
        First letter:
        <input
          type="radio"
          name="search"
          id="first"
          value="f="
          data-testid="first-letter-search-radio"
        />
      </label>
      <button type="submit" data-testid="exec-search-btn">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
