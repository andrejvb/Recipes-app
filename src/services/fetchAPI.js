const MEAL_API_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?';
const DRINK_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?';

async function fetchByFilter(url, filter) {
  const result = await fetch(url.concat(filter));
  const data = await result.json();
  return data;
}

export function fetchMealsByFilter(filter, query) {
  const { meals } = fetchByFilter(MEAL_API_URL, `${filter}${query}`);
  return meals;
}

export function fetchDrinksByFilter(filter, query) {
  const { drinks } = fetchByFilter(DRINK_API_URL, `${filter}${query}`);
  return drinks;
}
