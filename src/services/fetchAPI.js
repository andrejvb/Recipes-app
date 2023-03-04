const MEAL_API_URL_FILTER = 'https://www.themealdb.com/api/json/v1/1/filter.php?';
const MEAL_API_URL_SEARCH = 'https://www.themealdb.com/api/json/v1/1/search.php?';
const DRINK_API_URL_SEARCH = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?';
const DRINK_API_URL_FILTER = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?';

async function fetchByQuery(url, filter) {
  let data;
  try {
    const result = await fetch(url.concat(filter));
    data = await result.json();
  } catch {
    data = { meals: null, drinks: null };
  }
  return data;
}

export async function fetchMealsByFilter(filter, query) {
  const { meals } = await fetchByQuery(MEAL_API_URL_FILTER, `${filter}${query}`);
  return meals;
}

export async function fetchMealsBySearch(filter, query) {
  const { meals } = await fetchByQuery(MEAL_API_URL_SEARCH, `${filter}${query}`);
  return meals;
}

export async function fetchDrinksByFilter(filter, query) {
  const { drinks } = await fetchByQuery(DRINK_API_URL_FILTER, `${filter}${query}`);
  return drinks;
}

export async function fetchDrinksBySearch(filter, query) {
  console.log(DRINK_API_URL_SEARCH.concat(`${filter}${query}`));
  const { drinks } = await fetchByQuery(DRINK_API_URL_SEARCH, `${filter}${query}`);
  return drinks;
}
