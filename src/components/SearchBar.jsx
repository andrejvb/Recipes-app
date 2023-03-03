import React, { useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { fetchDrinksByFilter, fetchMealsByFilter } from '../services/fetchAPI';

const BAD_QUERY = 'Your search must have only 1 (one) character';
const NOT_FOUND = 'Sorry, we haven\'t found any recipes for these filters.';
const EXACT_ALLOWED_LENGTH = 1;

function SearchBar() {
  const { pathname } = useLocation();
  const [recipeId, setRecipeId] = useState(null);

  function handleFetchResults(idKey, recipes) {
    const isRecipesEmpty = recipes.length === 0;
    if (isRecipesEmpty) return global.alert(NOT_FOUND);
    const isSingleRecipe = recipes.length === EXACT_ALLOWED_LENGTH;
    if (isSingleRecipe) {
      const [recipe] = recipes;
      const { [idKey]: id } = recipe;
      setRecipeId(id);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formDataObject = Object.fromEntries(new FormData(event.target));
    const { search, query } = formDataObject;
    const isFirstLetterFilter = search === 'f=';
    const isNotSingleCharacter = query.length !== EXACT_ALLOWED_LENGTH;
    if (isFirstLetterFilter && isNotSingleCharacter) return global.alert(BAD_QUERY);
    if (pathname === '/meals') {
      handleFetchResults('idMeal', fetchMealsByFilter(search, query));
    } else handleFetchResults('idDrink', fetchDrinksByFilter(search, query));
  }

  if (recipeId) return <Redirect to={ `${pathname}/:${recipeId}` } />;

  return (
    <form onSubmit={ handleSubmit }>
      <input type="text" name="query" placeholder="Query" />
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
