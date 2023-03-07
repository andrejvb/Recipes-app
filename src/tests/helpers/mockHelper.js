import {
  drinksCategories,
  drinksRandom,
  mealsRandom,
  mealsCategories,
  mealsNameSoup,
  mealsIngredientXablau,
  mealsNameArrabiata,
  drinksIngredientXablau,
  drinksNameGin,
  drinksNameAquamarine,
  drinksAquamarine,
  mealsArrabiata,
} from './mockedData';

function switchResults(param) {
  switch (param) {
  case 'https://www.themealdb.com/api/json/v1/1/search.php?s=soup':
    return mealsNameSoup;
  case 'https://www.themealdb.com/api/json/v1/1/filter.php?i=xablau':
    return mealsIngredientXablau;
  case 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata':
    return mealsNameArrabiata;
  case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=xablau':
    return drinksIngredientXablau;
  case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin':
    return drinksNameGin;
  case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine':
    return drinksNameAquamarine;
  case 'https://www.themealdb.com/api/json/v1/1/list.php?c=list':
    return mealsCategories;
  case 'https://www.themealdb.com/api/json/v1/1/search.php?s=':
    return mealsRandom;
  case 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list':
    return drinksCategories;
  case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=':
    return drinksRandom;
  case 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319':
    return drinksAquamarine;
  case 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771':
    return mealsArrabiata;
  default:
    return { meals: null, drinks: null };
  }
}

function genFetchPromisse(promisses, param) {
  const promise = Promise.resolve({
    json: () => Promise.resolve(switchResults(param)),
  });
  promisses.push(promise);
  return promise;
}

export function genFetchFunction(promisses) {
  return (url) => genFetchPromisse(promisses, url);
}
