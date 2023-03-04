const MEAL_API_URL_FILTER = 'https://www.themealdb.com/api/json/v1/1/filter.php?';
const MEAL_API_URL_SEARCH = 'https://www.themealdb.com/api/json/v1/1/search.php?';
const DRINK_API_URL_SEARCH = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?';
const DRINK_API_URL_FILTER = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?';
const MEAL_API_URL_LOOKUP = 'https://www.themealdb.com/api/json/v1/1/lookup.php?';
const DRINK_API_URL_LOOKUP = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?';

async function fetchByQuery(url) {
  let data;
  try {
    const result = await fetch(url);
    data = await result.json();
  } catch {
    data = { meals: null, drinks: null };
  }
  return data;
}

function buildUrl(url, filter, query) {
  return url.concat(filter).concat(query);
}

export async function fetchMealByLookup(query) {
  const { meals } = await fetchByQuery(buildUrl(MEAL_API_URL_LOOKUP, 'i=', query));
  const [meal] = meals;
  return meal;
}

export async function fetchDrinkByLookup(query) {
  const { drinks } = await fetchByQuery(buildUrl(DRINK_API_URL_LOOKUP, 'i=', query));
  const [drink] = drinks;
  return drink;
}

export async function fetchMealsByFilter(filter, query) {
  const { meals } = await fetchByQuery(buildUrl(MEAL_API_URL_FILTER, filter, query));
  return meals;
}

export async function fetchMealsBySearch(filter, query) {
  const { meals } = await fetchByQuery(buildUrl(MEAL_API_URL_SEARCH, filter, query));
  return meals;
}

export async function fetchDrinksByFilter(filter, query) {
  const { drinks } = await fetchByQuery(buildUrl(DRINK_API_URL_FILTER, filter, query));
  return drinks;
}

export async function fetchDrinksBySearch(filter, query) {
  const { drinks } = await fetchByQuery(buildUrl(DRINK_API_URL_SEARCH, filter, query));
  return drinks;
}
